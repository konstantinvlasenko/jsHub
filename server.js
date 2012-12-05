var express = require('express');
var app = express();

//set path to the views (template) directory
app.set('views', __dirname + '/views');

app.get('/', function(req, res){res.render('index.jade', {title: 'Franz Enzenhofer'});});

app.listen(80);
console.log('Listening on port 80');