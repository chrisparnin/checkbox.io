const request = require('supertest');
const express = require('express');

const study = require('../routes/study');

const app = express();

app.get('/api/study/listing', study.listing );

// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

describe('GET /api/study/listing', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/api/study/listing')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});