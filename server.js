var fs = require('fs');
var express = require('express');
var app = express();

var specs = [];
fs.readdir('./spec/', function(err, files) {
  files.forEach( function (file) {
    specs.push('/spec/'+file);
  });
  //set path to the views (template) directory
  app.set('views', __dirname + '/views');
  app.get('/', function(req, res){res.render('index.jade', {specs: specs});});
  
  app.use('/jasmine-server', express.static(__dirname + '/public'));
  app.use('/spec', express.static('./spec'));
  app.use(express.static('public'))

  app.listen(80);
  console.log('Listening on port 80');
});

