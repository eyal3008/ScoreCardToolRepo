// angular.module('uploadFileService', []).
// service('uploadFile', function($http) {
//
//   this.upload = function(file) {
//     var fd = new FormData(); // a way that formData is introduced is as <key>:<value>. example:  "name": "David"
//     fd.append('myfile', file.upload);   //the <key> here is "myfile" that is passed here and it comes from index.html
//                                         // the <value> here is file.upload
//                                         //file.upload comes from index.html
//                                         //the "file" is the object and the "upload" is the actual file that is attached to the object
//     return $http.post('/upload', fd, { //http post request to the server, so now we could save that file
//                                         // the /upload route will be created in the server
//       transformRequest: angular.identity, //to remove the serialised data that had been done by angular
//       headers: { 'Content-Type': undefined }
//     });
//   };
// });
