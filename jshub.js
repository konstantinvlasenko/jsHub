var server = require('./lib/server');
var runner = require('./lib/runner')
var fs = require('fs');
var async = require('async');
var _ = require('underscore');
var glob = require('glob');

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
  server,
  runner
  ], function (err, result) {
    process.exit();
  }
);