


// (_D)(\d{3})(_DE_)(\d{3})  // samo nomerata a stranicite


function saveINDDfile(currentDocPath){

    app.open(currentDocPath)
    currentDoc = app.activeDocument;

    var folderContainer = currentDoc.filePath.parent.fullName;

    var newFolder = new Folder(folderContainer + '/CD');

    if (!newFolder.exists) {
        newFolder.create();
    }
    

    // $.writeln(currentDoc.isValid)
    // var folderContainer = currentDoc.filePath.parent.fullName.match(/.*\/(\d*).*$/);
    // var originalId = folderContainer[1];
    // $.writeln(mydoc.filePath.parent.fullName);

    /* create folder */
    // var newFolder = new Folder(currentDoc.filePath.parent.fullName + '/INDD');
    // if (!newFolder.exists){
    //     newFolder.create();
    // }

    


    var clearName = '';

    if (currentDoc.name.match(/(.*?)\..*/i)) {
        var fetchNameWithoutExt = currentDoc.name.match(/(.*?)\..*/i);
        clearName = fetchNameWithoutExt[1];
    } else {
        clearName = currentDoc.name;
    }
    // var inddNameParse = clearName.match(/_D_/i);
    // var inddClearName = inddNameParse[1];
    
    var replacedName = clearName.replace(/_D_/, '_CD_');

    var replacedName1 = replacedName.replace(/_DE_/, '_CD_');
    // currentDoc.exportFile(ExportFormat.PDF_TYPE,File(newFolder.fullName+"/"+pdfClearName+".pdf"),false,preset1);
    currentDoc.save(new File(newFolder.fullName+"/"+replacedName1+".indd"));
    currentDoc.close(SaveOptions.NO);
   
    // $.writeln(clearName);
    // $.writeln(replacedName);
    // $.writeln(replacedName1);
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
        saveINDDfile(getCurrentFileForChecking);

    }
    // $.writeln(typeof getCurrentFileForChecking);
}

}

// var folderContainer = currentDoc.filePath.parent.fullName.match(/.*\/(\d*).*$/);

// var preset1 = app.pdfExportPresets.item("AGS_OMN_PDF_v02");
// if (!(preset1.isValid))
// {
//      alert("The preset does not exist. Please check spelling carefully.");

//      exit();
// }

 getDOcuemtns();
