function exportPdf(currentDocPath, preset1) {

    app.open(currentDocPath)
    currentDoc = app.activeDocument;

    var folderContainer = currentDoc.filePath.fullName;

    var newFolder = new Folder(folderContainer + '/PDF');

    if (!newFolder.exists) {
        newFolder.create();
    }
    var details = '';
    // preset1 = app.pdfExportPresets.item("PSO_LWC_Improved");
    // Check before export to be sure links are updated
    if (currentDoc.modified == false) {
        var allLinks = currentDoc.links;
        var skipExport = false;
        for (var myCounter = 0; myCounter < allLinks.length; myCounter++) {
            var myClass = allLinks[myCounter].name;
            myData = allLinks[myCounter].status.toString();

            if (myData !== "NORMAL" && myData !== "LINK_EMBEDDED") {
                details += myClass + " is missing in " + currentDoc.name + "\n";
                skipExport = true;
            }
        //    $.writeln(myData);
           
        }
       
        var clearName = '';

        if (currentDoc.name.match(/(.*?)\..*/i)) {
            var fetchNameWithoutExt = currentDoc.name.match(/(.*?)\..*/i);
            clearName = fetchNameWithoutExt[1];
        } else {
            clearName = currentDoc.name;
        }
        var newNames = clearName.match(/^(\w*)\_(\d{3})\_(\d{3})\_(.*?)$/i);
        var newPDFFiles = [];
        newPDFFiles.push(newNames[1] + "_" + newNames[2] + "_000_" + newNames[4]);
        newPDFFiles.push(newNames[1] + "_000_" + newNames[3] + "_" + newNames[4]);

        pdfFileName = [];
        for (var index = 0; index < newPDFFiles.length; ++index) {
            pdfFileName[index] = folderContainer + '/PDF/' + newPDFFiles[index] + ".pdf";
        }

        // $.writeln(preset1.pdfPageLayout);

        var spreadOrig = preset1.exportReaderSpreads;
        var singleOrig = preset1.exportAsSinglePages;

        preset1.exportReaderSpreads = false;
        preset1.exportAsSinglePages = false;
        // preset1.pdfPageLayout = PageLayoutOptions.SINGLE_PAGE;
        // $.writeln(preset1.pdfPageLayout);

        if (!(preset1.isValid)) {
            alert("The preset does not exist. Please check spelling carefully.");

            exit();
        }


        // if (myData !== "NORMAL" && myData !== "LINK_EMBEDDED") {
        //         alert("Missing links");
    
        //         exit();
        //     }

        for (x = 0; x < currentDoc.pages.length; x++) {
            // Get current page name 
            var myPageName = currentDoc.pages[x].name;

            

            // $.writeln(pdfFileName[x]);
            // Set the PDF export page range to the page name 
            // app.pdfExportPreferences.exportReaderSpreads = false;
            // app.pdfExportPreferences.pdfPageLayout = PageLayoutOptions.SINGLE_PAGE;    
            app.pdfExportPreferences.pageRange = myPageName;
            if(skipExport==false){
                currentDoc.exportFile(ExportFormat.PDF_TYPE, new File(pdfFileName[x]), false, preset1);
            }
        }

        preset1.exportReaderSpreads = spreadOrig;
        preset1.exportAsSinglePages = singleOrig;

        currentDoc.close(SaveOptions.NO);

        
        return details;
    } else {
        alert("save first");
    }
}

function getDocuments() {
    var folderPath = Folder.selectDialog("Select folder for process");
    var filesListing = folderPath.getFiles();

    /* BEGIN Preset options */
    var myPresets = app.pdfExportPresets.everyItem().name;
    myPresets.unshift("--- Select Preset ---");

    var myWin = new Window('dialog', 'PDF Export Presets');
    myWin.orientation = 'row';
    with(myWin) {
        myWin.sText = add('statictext', undefined, 'Select PDF Export preset:');
        myWin.myPDFExport = add('dropdownlist', undefined, undefined, {
            items: myPresets
        });
        myWin.myPDFExport.selection = 0;
        myWin.btnOK = add('button', undefined, 'OK');
    };
    myWin.center();
    var myWindow = myWin.show();
    var data = [];
    var myPreset;
    if (myWindow == true && myWin.myPDFExport.selection.index != 0) {
        myPreset = app.pdfExportPresets.item(String(myWin.myPDFExport.selection));
        data.push({
            name: "print_preset",
            value: myWin.myPDFExport.selection
        });
    } else {
        alert("No PDF Preset selected");
        return false;
    }

    writeXMLPrefs(data);

    /* END Preset options */


    for (var m = 0; m < filesListing.length; m++) {
        var getCurrentFileForChecking = File(filesListing[m].fsName);
        if (getCurrentFileForChecking instanceof Folder === true) {
            continue;
        }

        var fetchNameWithoutExt = getCurrentFileForChecking.name.match(/(.*?)\.(.*)/i);
        if (fetchNameWithoutExt[2] != "null") {
            fileExt = fetchNameWithoutExt[2];
        } else {
            fileExt = '';
        }

        if (fileExt == "indd") {
            var currentReport = exportPdf(getCurrentFileForChecking, myPreset);
            if (currentReport != '') {
                reportDetails += "\n---\n" + currentReport;
            }
        }
    }

}

var writeXMLPrefs = function (data) {
    // create some xml and write it to file
    var root = new XML("<root/>");

    for (var i = 0; i < data.length; i++) {
        var child = new XML("<child/>");
        child.@name = data[i].name;
        child.@value = data[i].value;
        root.appendChild(child);
    }
    var myScriptPath = (File($.fileName).parent.fsName).toString().replace(/\\/g, '/');

    var file = new File(myScriptPath + '/print_pref.xml');
    var xml = root.toXMLString();
    file.open("W");
    file.write(xml);
    file.close();

};

var currentPdfSettings = app.pdfExportPreferences;
//Save the current application setting.
var currentAppSettings = {
    checkLinksAtOpen: app.linkingPreferences.checkLinksAtOpen
};

//Set the value to false to prevent the dialog from showing.
app.linkingPreferences.checkLinksAtOpen = false;

var reportDetails = '';
getDocuments();
//Set the value back to its original value.
app.linkingPreferences.checkLinksAtOpen = currentAppSettings.checkLinksAtOpen;

if (reportDetails != '') {
    var date = new Date();
    var minute = date.getMinutes();
    var hour = date.getHours();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    

    var f = new File("~/Desktop/log_" + day + "_" + month + "_" + year + "_" + hour + "_" + minute + ".txt");
    f.open('w', "TEXT");
    f.writeln(reportDetails);
    f.close();

    alert("Problems with export! Check the log file on your desktop");
}