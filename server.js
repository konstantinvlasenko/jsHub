var express = require('express');
var app = express();

//set path to the views (template) directory
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.get('/', function(req, res){res.render('index.jade', {title: 'Jasmine-Server'});});

app.listen(80);
console.log('Listening on port 80');