var http = require('http');
var Client = require('ftp');
var fs = require('fs');
var csv = require("csvtojson");


module.exports = function(app, route) {

  app.get('/ftp',function(req, res){

  });

      return function(req, res, next) {
        next();
      };

};
