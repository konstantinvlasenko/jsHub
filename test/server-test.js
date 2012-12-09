var vows = require('vows');
var assert = require('assert');

vows.describe('Example').addBatch({
    'test': {
        topic: 45,

        "should work as expected": function (topic) {
            assert.equal(topic, 45);
        }
    }
});