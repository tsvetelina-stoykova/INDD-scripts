//DESCRIPTION: Test making log file
myDoc = app.activeDocument;
log1 = makeLogFile("test",myDoc,true);
log(log1, "Text for log1 file");
log2 = makeLogFile("test",myDoc,false);
log(log2, "Text for log2 file");
log1.execute();
log2.execute();
function makeLogFile(aName, aDoc, deleteIt) {
  var logLoc; // path to folder that will hold log file
  try {
    logLoc = aDoc.filePath;
  } catch (e) {
    logLoc = getScriptPath().parent.fsName
  }
  var aFile = File(logLoc + "/" + aName + ".txt");
  if (deleteIt) {
    aFile.remove();
    return aFile;
  }
  var n = 1;
  while (aFile.exists) {
    aFile = File(logLoc + "/" + aName + String(n) + ".txt");
    n++
  }
  return aFile
}
function getScriptPath() {
  // This function returns the path to the active script, even when running ESTK
  try { 
    return app.activeScript; 
  } catch(e) { 
    return File(e.fileName); 
  }
}
function log(aFile, message) {
  var today = new Date();
  if (!aFile.exists) {
    // make new log file
    aFile.open("w");
    aFile.write(String(today) + "\nThe following messages were logged:\n");
    aFile.close();
  }
  aFile.open("e");
  aFile.seek(0,2);
  aFile.write("\n" + message);
  aFile.close();
}