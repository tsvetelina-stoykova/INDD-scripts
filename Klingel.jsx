


//path = path.replace( /(D{1})(\d+)+(_DE_){1}(\d+)/i, '$1/NEWTEXT$2')

// function get_folder_files(file_type, title, param_path) {
// 	// v.0.1.2
// 	var path = "";	
// 	if(!param_path) {
// 		var tmp_file = File.openDialog(title, file_type);		
// 		if(!tmp_file) {exit(); };
// 		path = tmp_file.path;
// 	}else { path = param_path; };

// 	var my_folder = new Folder(path);
//     return my_folder.getFiles(file_type);
// };



function getDocumentsCD(){
    var filesListing = [];
    var folderPath = Folder.selectDialog("Select folder for process");
    filesListing = folderPath.getFiles();
    //     for (var m = 0; m < filesListing.length; m++) {
    //         var getCurrentFile = File(filesListing[m].name);
    //         
    // }
    $.writeln(typeof filesListing);
 };

// function getDocumentsCD(){
//     var folderPath = Folder.selectDialog("Select folder for process");
//     var filesListing = folderPath.getFiles();
//         for (var m = 0; m < filesListing.length; m++) {
//             var getCurrentFile = File(filesListing[m].name);
//             $.writeln(getCurrentFile);
//     }
//  };
 
getDocumentsCD();
// getDocumentsD();

