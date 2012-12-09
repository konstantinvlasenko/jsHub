var fs = require('fs');
var express = require('express');

var app = express();

var startServer = function(config, callback) {
  //set path to the views (template) directory
  app.set('views', __dirname + '/views');
  app.get('/', function(req, res){res.render('index.jade', {serve_files: config.serve_files});});
  app.use('/jshub', express.static(__dirname + '/../public'));
  
  fs.readdirSync('.').forEach(function (file) {
    var stat = fs.statSync("./"+file);
    if (stat.isDirectory()) {
      app.use('/'+file, express.static(file));
    }
  });
 
  app.listen(config.port);
  console.log('Listening on port', config.port);
  callback(null, config);
}

module.exports = startServer