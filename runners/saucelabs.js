var webdriver = require('wd');
var assert = require('assert');
var async = require('async');

exports.run = function (config, options, callback) {
  var browser = webdriver.remote(
    "ondemand.saucelabs.com"
    , 80
    , config.user
    , config.key
  );
  
  browser.on('status', function(info){
    console.log('\x1b[36m%s\x1b[0m', info);
  });

  browser.on('command', function(meth, path){
    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
  });
  
  var waitCompletion = function(onCompleted){
    var _completed = false;
    console.log('before~~~~~~~~~~');
    async.whilst(
      function () {
        console.log(_completed);
        return _completed;
      },
      function(callback) {
        console.log('try....');
        browser.eval('jasmineEnv.currentRunner().results().totalCount === jasmineEnv.currentRunner().specs().length', function(err, completed) {
          _completed = completed;
          setTimeout(callback, 1000);
        })
      },
      onCompleted
    );
  };
  
  browser.init(options, function() {
    browser.get(config.url, function() {
      waitCompletion(function(){
        console.log('after');
        browser.eval('jasmineEnv.currentRunner().results().totalCount', function(err, totalCount) {
          assert.notEqual(totalCount, 0, 'You should have at least one test!');
          browser.eval('jasmineEnv.currentRunner().results().failedCount', function(err, failedCount) {
            assert.equal(failedCount, 0, 'Some tests are failed!')
            browser.quit();
            callback();
          });
        });
      });
    });
  })
};




