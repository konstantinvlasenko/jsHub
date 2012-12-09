var tap = require('tap');
var async = require('async');
var _ = require('underscore');

var runTests = function(runner, config, callback) {
  _.defaults(config, { concurrency : 2 } );

  var _tapProducer = new tap.Producer(true);
  _tapProducer.pipe(process.stdout);
  var _results = [];
    
  var _queue = async.queue(function (b, callback) {
    runner(config, b, callback); 
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

module.exports = runTests