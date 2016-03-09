var assert = require('chai').assert;

/* ABORT FOR NOW: NEED A TEST DATABASE TO REALLY MAKE THIS WORK, RABBIT HOLE */

/* sample test */

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

/* our tests */

// get the db connection and models

var Models = require('../app/models/models.js');

describe('Models', function() {
  describe('contents', function() {
    it('should have User, Client, WorkoutSession, SessionProductSample, Sample, and Biomarker models', function() {
      assert.typeOf(Models.User, 'object');
      assert.typeOf(Models.Client, 'object');
      assert.typeOf(Models.WorkoutSession, 'object');
      assert.typeOf(Models.SessionProductSample, 'object');
      assert.typeOf(Models.Sample, 'object');
      assert.typeOf(Models.Biomarker, 'object');
    });
  });
});

describe('User model', function() {
	it('should have one Client model relation', function(done){

	});
});
