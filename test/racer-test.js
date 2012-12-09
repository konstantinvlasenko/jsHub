var assert = require("assert");
var racer = require('../lib/racer.js');
var _ = require('underscore');

describe('racer', function(){
  var config;
  var options;
  
  beforeEach(function(){
    options = [];
    config = {
      name: "jsHub",
      browsers: [
        { browserName: "internet explorer", version: "8", platform: "Windows 2003" },
        { browserName: "internet explorer", version: "9", platform: "Windows 2008" },
        { browserName: "internet explorer", version: "10", platform: "Windows 2012" }
      ]
    };
  })
  
  run = function(config, desire, callback) {
    options.push(desire);
    callback(true);
  };
  
  it('should extend the browser object with the name property', function(done){
    racer(run, config, function() {
      assert.equal("jsHub ( internet explorer:8 on Windows 2003 )", options[0].name);
      assert.equal("jsHub ( internet explorer:9 on Windows 2008 )", options[1].name);
      assert.equal("jsHub ( internet explorer:10 on Windows 2012 )", options[2].name);
      done();
    });
  })
  
  it('should use default concurrency equals to 2', function(done){
    racer(run, config, function() {
      assert.equal(2, config.concurrency);
      done();
    });
  })
  
  it('should use concurrency if specified', function(done){
    _.extend(config, { concurrency : 5 } );
    racer(run, config, function() {
      assert.equal(5, config.concurrency);
      done();
    });
  })
})