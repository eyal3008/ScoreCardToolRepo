var http = require('http');


module.exports = function(app, route) {


      app.get('/restartserver',function(req, res){
        setTimeout( function () {
            console.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
          }, 2*1000);
        });
      return function(req, res, next) {
        next();
      };

};
