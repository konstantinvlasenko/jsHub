var webdriver = require('wd');
var assert = require('assert');
var async = require('async');
var _ = require('underscore');

exports.run = function (config, options, callback) {
  // Performance Improvements and Data Collection (https://saucelabs.com/docs/additional-config)
  // 1. DISABLE VIDEO RECORDING
  // 2. DISABLE STEP BY STEP SCREENSHOTS
  // 3. DISABLE SAUCE ADVISOR
  _.defaults(options,
      { 
        "record-video": false,
        "record-screenshots": false,
        "sauce-advisor": false
      }
    );

  var browser = webdriver.remote( "ondemand.saucelabs.com", 80 );
  
  browser.on('status', function(info){
    console.log('\x1b[36m%s\x1b[0m', info);
  });

  browser.on('command', function(meth, path){
    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
  });
  
  var waitCompletion = function(onCompleted){
    var _completed = false;
    async.whilst(
      function () {
        return _completed === false;
      },
      function(callback) {
        console.log('wait for completion...');
        browser.eval('jasmineEnv.currentRunner().queue.running === false', function(err, completed) {
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
        console.log('completed!');
        browser.eval('jasmineEnv.currentRunner().results().totalCount', function(err, totalCount) {
          assert.notEqual(totalCount, 0, 'You should have at least one test!');
          browser.eval('jasmineEnv.currentRunner().results().failedCount', function(err, failedCount) {
            //assert.equal(failedCount, 0, 'Some tests are failed!');
            browser.quit(callback);
          });
        });
      });
    });
  })
};




