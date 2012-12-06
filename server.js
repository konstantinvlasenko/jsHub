var fs = require('fs');
var async = require('async');
var express = require('express');
var _ = require('underscore');
var runner = require('./runners/saucelabs.js');

var app = express();

fs.readFile('./js.json', function (err, data) {
  if (err) {
    throw err; 
  }
  var config = JSON.parse(data);
  
  //set path to the views (template) directory
  app.set('views', __dirname + '/views');
  app.get('/', function(req, res){res.render('index.jade', {src_files: config.src_files});});
  app.use('/jasmine-server', express.static(__dirname + '/public'));
  
  // fs.readdirSync('.').forEach(function (file) {
    // var stat = fs.statSync("./"+file);
    // if (stat.isDirectory()) {
      // app.use('/'+file, express.static(file));
    // }
  // });
 
  app.listen(80);
  console.log('Listening on port 80');
    
  async.forEach(config.browsers,
    function(browser, callback){ 
      _.extend(browser, {name: config.name + ' ( ' + browser.browserName + ':' + browser.version + ' on ' + browser.platform  + ' )'});
      runner.run(config, browser, callback); 
    },
    process.exit
  );
});


