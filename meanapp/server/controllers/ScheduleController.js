var http = require('http');
var async = require("async");
var request = require('request');
var Resource = require('resourcejs');

module.exports = function(app, route) {

  app.post('/GetLiveHours',function(req, res){
    var AllEngineersHours = [];

    var SCounter  = 0 ;
    var DCounter = 0;
    var DotCounter = 0;
    var FCounter  = 0 ;
    var UCounter = 0;
    var PCounter = 0;
    var SupportCounter = 0;
    var Ecounter = 0;


     async.eachSeries(req.body.EngineerList, function(engineer, done) {

   var propertiesObject = { month:req.body.Month , year:req.body.Year, ID:engineer};

     request({url:"http://15.224.196.121/CM2/api/contact/", qs:propertiesObject}, function(err, response, body) {
     if(err) { console.log(err); return; }
       // do stuff, then call done
     for (var i = 0 ; i < body.length ; i++)
   {
     if(body[i] == "."){
       DotCounter++;
     }
     else if(body[i] == "S"){
       SCounter++;
   SupportCounter ++;
     }
     else if(body[i] == "W"){
       SCounter++;
     }
     else if(body[i] == "D"){
       DCounter++;
     }
      else if(body[i] == "U"){
       UCounter++;
     }
      else if(body[i] == "P"){
       PCounter++;
     } else if(body[i] == "F"){
       FCounter++;
     }
     else if(body[i] == "E"){
       SCounter = SCounter + 0.5;
     }

   }
   AllEngineersHours.push({   "Engineer" : engineer,
      "Month" : req.body.Month,
      "MonthlyDays" : [{"Support":(SCounter/2)},{"Dispatcher": DCounter/2},{"IIF":FCounter/2},{"Planned":PCounter/2},{"UnPlanned":UCounter/2}]});


          SCounter  = 0 ;
          DCounter = 0;
          DotCounter = 0;
          FCounter  = 0 ;
          UCounter = 0;
          PCounter = 0;
          SupportCounter = 0;
          ECounter = 0;
        done();
   });


   }, function(err) {
     if (err) {
       throw err;
     }

       res.json(AllEngineersHours);

    });
   });


  Resource(app, '', route, app.models.Schedule).rest();
      return function(req, res, next) {
        next();
      };

};
