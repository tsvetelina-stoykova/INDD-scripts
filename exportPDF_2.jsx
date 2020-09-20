function exportPdf(currentDocPath){

    app.open(currentDocPath)
    currentDoc = app.activeDocument;
    

    // $.writeln(currentDoc.isValid)
    var folderContainer = currentDoc.filePath.parent.fullName.match(/.*\/(\d*).*$/);
    var originalId = folderContainer[1];
    // $.writeln(mydoc.filePath.parent.fullName);
    var newFolder = new Folder(currentDoc.filePath.parent.fullName + '/PDF');
    if (!newFolder.exists){
        newFolder.create();
    }

    var clearName = '';

    if (currentDoc.name.match(/(.*?)\..*/i)) {
        var fetchNameWithoutExt = currentDoc.name.match(/(.*?)\..*/i);
        clearName = fetchNameWithoutExt[1];
    } else {
        clearName = currentDoc.name;
    }
    var pdfNameParse = clearName.match(/([\D]*)(.*)/i);
    var pdfClearName = pdfNameParse[2];
    
    pdfClearName = pdfClearName.replace(/.*([0-9]{8})([^\.]+)/, originalId + '$2_Freigabe');

    /*var pagesindoc = 2;

    for (i = 0; i < Math.floor(pageNom/pagesindoc); i++) {
        startPage = (i + 1) * pagesindoc - 1;
        stopPage = startPage + (pagesindoc - 1);
        
        // $.writeln(startPage + "-" + stopPage);
        // $.writeln(pagesArray[startPage].name + "-" + pagesArray[stopPage].name);
        app.pdfExportPreferences.pageRange = startPage + "-" + stopPage;
    }*/
    currentDoc.exportFile(ExportFormat.PDF_TYPE,File(newFolder.fullName+"/"+pdfClearName+".pdf"),false,preset1);
    currentDoc.close(SaveOptions.NO);
}

function getDOcuemtns(){
// test only
var folderPath = Folder.selectDialog("Select folder for process");
 var filesListing = folderPath.getFiles();

for (var m = 0; m < filesListing.length; m++) {

    var getCurrentFileForChecking = new File(filesListing[m].fsName);
    //var newFolder;
    var fetchNameWithoutExt = getCurrentFileForChecking.name.match(/(.*?)\.(.*)/i);
    fileExt = fetchNameWithoutExt[2];
// $.writeln(fetchNameWithoutExt);

    if(fileExt == "indd"){
        exportPdf(getCurrentFileForChecking);

    }
    // $.writeln(typeof getCurrentFileForChecking);
}

}

// var folderContainer = currentDoc.filePath.parent.fullName.match(/.*\/(\d*).*$/);

var preset1 = app.pdfExportPresets.item("AGS_OMN_PDF_v02");
if (!(preset1.isValid))
{
     alert("The preset does not exist. Please check spelling carefully.");

     exit();
}

getDOcuemtns();
