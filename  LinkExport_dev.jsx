var myDoc = app.documents[0];
if (myDoc.saved == false) {
    alert("Error.\rDocument is not saved.");
    exit();
}
var myDocName = myDoc.name.split(".indd")[0];
var myTXT_File = myDocName + '.txt';
var myPath = myDoc.filePath + "/";
var myType = "TEXT";
var myData = "link\r";

// $.writeln(allLinks);
