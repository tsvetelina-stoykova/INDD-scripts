            /* BEGIN Preset options */
            var myPresets = app.pdfExportPresets.everyItem().name;
            myPresets.unshift("- Select Preset -");

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

            if (myWindow == true && myWin.myPDFExport.selection.index != 0) {
                var myPreset = app.pdfExportPresets.item(String(myWin.myPDFExport.selection));
                myFile = File(File.saveDialog("Save file with preset: " + myPreset.name, "PDF files: *.pdf"));
                if (myFile != null) {
                    app.activeDocument.exportFile(ExportFormat.PDF_TYPE, myFile, false, myPreset);
                } else {
                    alert("No File selected");
                }
            } else {
                alert("No PDF Preset selected");
            }

            /* END Preset options */