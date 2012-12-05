var fs = require('fs');
var express = require('express');
var app = express();

fs.readFile('./testem.json', function (err, data) {
  if (err) {
    throw err; 
  }
  var config = JSON.parse(data);
  console.log(config);

  //set path to the views (template) directory
  app.set('views', __dirname + '/views');
  app.get('/', function(req, res){res.render('index.jade', {src_files: config.src_files});});
  app.use('/jasmine-server', express.static(__dirname + '/public'));
  
  fs.readdirSync('.').forEach(function (file) {
    var stat = fs.statSync("./"+file);
    if (stat.isDirectory()) {
      app.use('/'+file, express.static(file));
    }
  });
 
  app.listen(80);
  console.log('Listening on port 80');
});


