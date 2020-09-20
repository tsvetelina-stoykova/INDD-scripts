
var myPDFExportPreset = app.pdfExportPresets.item("AGS_OMN_PDF_v02");

function myexport(){


    var openDocument= app.open(File("/Users/coco/Desktop/test/inddpage.indd"));
    openDocument.ExportFile(
    ExportFormat.pdfType,
    File("/Users/coco/Desktop/test/exp/firstfile-print.pdf"),
    false, 
    myPDFExportPreset,
    $.writeln(typeof (myPDFExportPreset))
    );
};

myexport();