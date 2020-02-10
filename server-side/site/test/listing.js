const request = require('supertest');
const express = require('express');

const study = require('../routes/study');

const DB = require('../db');

const app = express();

app.get('/api/study/listing', study.listing );



describe('GET /api/study/listing', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/api/study/listing')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    after('Closing down database connection...', function(done)
    {
      console.log('after handler');
      DB.close('site')
        .then( () => {console.log('done'); done(); })
        .catch( (e) => {console.log(e); done(); });
      
    });
});