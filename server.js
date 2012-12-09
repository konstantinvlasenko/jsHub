var fs = require('fs');
var async = require('async');
var tap = require('tap');
var express = require('express');
var _ = require('underscore');
var glob = require('glob');
var runner = require('./runners/saucelabs.js');

var app = express();

var startServer = function(config, callback) {
  console.log(config);
  //set path to the views (template) directory
  app.set('views', __dirname + '/views');
  app.get('/', function(req, res){res.render('index.jade', {serve_files: config.serve_files});});
  app.use('/jasmine-server', express.static(__dirname + '/public'));
  
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

var runTests = function(config, callback) {
  var _tapProducer = new tap.Producer(true);
  _tapProducer.pipe(process.stdout);
  var _results = [];
    
  var _queue = async.queue(function (b, callback) {
    runner.run(config, b, callback); 
  }, config.concurrency);
  _queue.drain = function() {
    _.each(_results, function(r) { _tapProducer.write(r); } );
    _tapProducer.end();
    callback(null);
  };
  
  _.each(config.browsers, function(b, index) { 
    _.extend(b, {name: config.name + ' ( ' + b.browserName + ':' + b.version + ' on ' + b.platform  + ' )'});
    _queue.push( b, function(passed) { 
      _results.push({
        id: index,
        ok: passed,
        name: b.name
      });
    });
  });
}

var resolveServeFiles = function(config, callback) {
  async.reduce(config.serve_files, [], function(curr, pattern, next){
    glob(pattern, function(err, files){
      if (err) next(null, curr)
      else next(null, curr.concat(files))
    })
  }, function(err, files) {
    config.serve_files = files;
    callback(null, config);
  });
};

var getConfig = function(callback) {
  fs.readFile('./js.json', function (err, data) {
    if(err) { callback(err) };
    var config = JSON.parse(data);
    _.defaults(config, { concurrency : 2, port: 8000 } );
    callback(null, config);
  });
};

async.waterfall([
  getConfig,
  resolveServeFiles,
  startServer,
  runTests
  ], function (err, result) {
    process.exit();
  }
);