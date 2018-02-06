var http = require('http');
var Client = require('ftp');
var fs = require('fs');
var csv = require("csvtojson");


module.exports = function(app, route) {

  app.get('/ftpSlo',function(req, res){

     var c = new Client();
     c.on('ready', function() {
    c.get('Number_of_Updates_SLOs_crosstab.csv', function(err, stream) {
        if (err) throw err;
var dataasjson = [];
        stream.once('close', function() { c.end(); });

        csv()
  .fromStream(stream,  {headers: false})
  .on("json",function(jsonObj){ //single json object will be emitted for each csv line
    dataasjson.push(jsonObj);
    this.push()
  })

            .on("end", function(){
res.send(dataasjson);


  //Now we have to post this to the database.
            });
    });
});
     // connect to localhost:21 as anonymous
     var options = {
    host: 'ftp-ngdc.saas.hp.com',
    port: 21,
    user: 'SOC_ScoreCard',
    password: 'hpsaas1234'
}
     c.connect(options);

    });


    app.get('/ftpsurvey',function(req, res){

       var c = new Client();
       c.on('ready', function() {
      c.get('sec.csv', function(err, stream) {
          if (err) throw err;
  var dataasjson = [];
          stream.once('close', function() { c.end(); });

          csv()
    .fromStream(stream,  {headers: false})
    .on("json",function(jsonObj){ //single json object will be emitted for each csv line
      dataasjson.push(jsonObj);
      this.push()
    })

              .on("end", function(){
  res.send(dataasjson);


    //Now we have to post this to the database.
              });
      });
  });
       // connect to localhost:21 as anonymous
       var options = {
      host: 'ftp-ngdc.saas.hp.com',
      port: 21,
      user: 'SOC_ScoreCard',
      password: 'hpsaas1234'
  }
       c.connect(options);

      });

      app.get('/getclosedtickets',function(req, res){

         var c = new Client();
         c.on('ready', function() {
        c.get('DWH_SOC_TICKETS_SLO_DETAILS.csv', function(err, stream) {
            if (err) throw err;
            var dataasjson = [];


            stream.once('close', function() { c.end(); });

            csv()
      .fromStream(stream,  {headers: false})
      .on("json",function(jsonObj){ //single json object will be emitted for each csv line
        dataasjson.push(jsonObj);

      })

                .on("end", function(){
    res.send(dataasjson);

           // process.exit(1);

      //Now we have to post this to the database.
                });
        });
    });
         // connect to localhost:21 as anonymous
         var options = {
        host: 'ftp-ngdc.saas.hp.com',
        port: 21,
        user: 'SOC_ScoreCard',
        password: 'hpsaas1234'
    }
         c.connect(options);

        });
        app.get('/getSecurity',function(req, res){

           var c = new Client();
           c.on('ready', function() {
          c.get('sec.csv', function(err, stream) {
              if (err) throw err;
              var dataasjson = [];


              stream.once('close', function() { c.end(); });

              csv()
        .fromStream(stream,  {headers: false})
        .on("json",function(jsonObj){ //single json object will be emitted for each csv line
          dataasjson.push(jsonObj);

        })

                  .on("end", function(){
      res.send(dataasjson);

             // process.exit(1);

        //Now we have to post this to the database.
                  });
          });
      });
           // connect to localhost:21 as anonymous
           var options = {
          host: 'ftp-ngdc.saas.hp.com',
          port: 21,
          user: 'SOC_ScoreCard',
          password: 'hpsaas1234'
      }
           c.connect(options);

          });

      return function(req, res, next) {
        next();
      };

};
