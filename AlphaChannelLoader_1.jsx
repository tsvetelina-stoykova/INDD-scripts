//AlphaKanalWahl_502d.js
//� 15.02.15 / Hans Haesler, Ch�telard 52, CH-1018 Lausanne / <hsa@ringier.ch>
//DESCRIPTION:Einen Alpha-Kanal zuweisen

// vorbeugenderweise das Anzeigen von Dialogen aktivieren
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

// testen, ob ein Dokument ge�ffnet ist
if (app.documents.length == 0) {
	alert("No document opened.", "Warning", true);
	exit();
}

// die Auswahl speichern ...
var curSel = app.selection;
var nItems = curSel.length;
// ... und pr�fen
if (nItems == 0) {
	alert("There is nothing selected.", "Stop", true);
	exit();
}
// testen, ob ein Bildrahmen oder ein Bild ausgew�hlt ist 
// und den Pfad zur Bilddatei speichern
var objType = curSel[0].constructor.name;
if (objType == "Rectangle" || objType == "Polygon" || objType == "Oval") {
	var curObj = curSel[0].graphics[0];
	try {
		var curLink = curObj.itemLink;
		var curPath = curLink.filePath;
	} catch (e) {
		alert("The frame is empty.", "Stop", true);
		exit();
	}
	if (("" + curObj) != "[object Image]") {
		alert("No vector files, please.", "Stop", true);
		exit();
	}
} else if (objType == "Image") {
	var curObj = curSel[0];
	var curLink = curObj.itemLink;
	var curPath = curLink.filePath;
} else {
	alert("Only image file (no vector).", "Warning", true);
	exit();
}
// den Status der Verkn�pfung feststellen ...
var curStatus = curLink.status * 1;
// ... und pr�fen
if (curStatus == 1819109747) {
	alert("The image file does not exist.", "Stop", true);
	exit();
} else if (curStatus == 1819242340) {
	alert("First update the link.", "Warning", true);
	exit();
}
// die Alpha-Kan�le auflisten
var alphaNames = curObj.clippingPath.alphaChannelPathNames;
// die Anzahl Alpha-Kan�le pr�fen
if (alphaNames.length == 0) {
	alert("The image does not contain an alpha channel.", "Stop", true);
	exit();
} else {
	var dialogNames = alphaNames.concat(["No alpha"]);
}
// eventuell im Speicher vorhandene Dialoge entfernen
try {
	app.dialogs.everyItem().destroy();
} catch (e) {}
// den Dialog vorbereiten ...
var aDialog = app.dialogs.add({
	name: "Select the alpha channel:"
});
with(aDialog) {
	with(dialogColumns.add()) {
		var alphaDrop = dropdowns.add({
			stringList: dialogNames,
			selectedIndex: 0
		});
	}
}
// ... und anzeigen
if (aDialog.show() == true) {
	// den gew�hlten Artikel feststellen
	var curAlpha = dialogNames[alphaDrop.selectedIndex];
	// den Dialog aus dem Speicher entfernen
	aDialog.destroy();
} else {
	aDialog.destroy();
	exit();
}

var dlgRef = app.dialogs.add({name:dlgName, canCancel:cancelIt, label:dlgLabel});
  //add a column
  var dlgColumn = dlgRef.dialogColumns.add();
     //add a row
     var dlgRow = dlgColumn.dialogRows.add();
     //add radio elements to row
     var rGroup = dlgRow.radiobuttonGroups.add();
     rGroup.radiobuttonControls.add({staticLabel:"Hi-res_PDF", checkedState:true});
     rGroup.radiobuttonControls.add({staticLabel:"Low-res_PDF"});
     rGroup.radiobuttonControls.add({staticLabel:"PRINTER"});
    if (dlgRef.show() == true) {
        userCancelled = false;
           var radioValue = rGroup.selectedButton;
    }

 

// die Vorgaben einstellen
app.imageIOPreferences.alphaChannelName = curAlpha;
// das Bild erneut importieren
curSel[0].place(File(curPath));