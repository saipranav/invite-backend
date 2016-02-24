var expect = require('chai');
var supertest = require('supertest');
var config = require('../tools/config');
var api = supertest('http://localhost:3002'); 

describe('Invite API', function(){
	it('should return 200 status', function(done){
		api.get('/')
		.expect(200, done);
	});
});
