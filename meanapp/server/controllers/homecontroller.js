var http = require('http');
var multer = require('multer');
var xlstojson = require('xls-to-json-lc');


  var storage = multer.diskStorage({ //setting up the multer's storage settings, for the storage destination, uploaded file name and also the storage type as disk storage
  destination: function (req, file, cb) {
  cb(null, './uploads/images/'); //tells us where do we want to save the file
  },
  filename: function (req, file, cb) {  //the "file" object has several properties. we can see datasheet on this in multer datasheets

  if (!file.originalname.match(/\.(doc|docx|xls|mdb|accdb|xlsx|csv|ppt|pptx|png|jpg|jpeg)$/)) { //Regex for allowed uploaded file types
    var err = new Error();
    err.code = 'filetype';
    return cb(err);
  } else {
    cb(null, Date.now() + '_' + file.originalname);
  }
  }
  });

  var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } //limit of 10MB
  }).single('myfile');

module.exports = function(app, route) {


  var Parser = function (array, string){ //this function is implemented below, by "return" inide the "upload" section
    var TicketArray = [];
    // JSON.parse();

    for(var i = 0; i < array.length; i++) {
      if((array[i]["email"]).charAt(0) == string){
        TicketArray.push(array[i]["password"]);
      }
    }
    return TicketArray;
  }

app.get('/home',function(req, res){


});


app.post('/upload', function (req, res) {

  var exceltojson; //parsing xls
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
      } else if (err.code === 'filetype') {
        res.json({ success: false, message: 'File type is invalid. Must be .png/.jpeg/.jpg' });
      } else {
        console.log(err);
        res.json({ success: false, message: 'File was not able to be uploaded' });
      }
    } else {
      if (!req.file) { //multer gives us file info in req.file object
        res.json({ success: false, message: 'No file was selected' });
      } else {   //parsing xls

        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xls') {
          exceltojson = xlstojson;
          try {
            exceltojson({ input: req.file.path, output: null, lowerCaseHeaders: true },
              //req.file.path is the same path where we uploaded our file
              //null - since we dont need output.json
            function(err, result) { //we will get our converted data in "result"
              if(err) {
                console.log('error');
              }


                res.json({ success: true, message: result });
              // extracting catalog items end

            }
          )
          } catch (e){
            console.log('error');
          } //parsing xls end
        } else {
          res.json({ success: true, message: 'File was uploaded!' });
        }
      }
    }
  });
});


  return function(req, res, next) {
    next();
  };
};
