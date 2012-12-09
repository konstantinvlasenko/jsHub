var vows = require('vows');
var assert = require('assert');

vows.describe('Example').addBatch({
    'test': {
        'should know the answer to the ultimate question of life': function () {
            assert.equal (42, 42);
        }
    }
});