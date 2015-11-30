const app = require('../app/app.js')
const request = require('supertest')
const expect = require('chai').expect

describe('My Tests', () => {
  describe('GET /scores', () => {
    it('should respond with a list of all players', (done) => {
      request(app)
        .get('/scores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done)
    })
  })
  describe('GET /scores/:id', () => {
    it('should respond with specified player', (done) => {
      request(app)
        .get('/scores/3')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.player).to.be.equal('Molly')
        })
        .end(done)
    })
  })
  describe('POST /scores', () => {
    it('should add new player', (done) => {
      request(app)
        .post('/scores')
        .set('Content-Type', 'application/json')
        .send({"player": "Jesstern", "score": 88})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.player).to.be.equal('Jesstern')
          expect(res.body.score).to.be.equal(88)
        })
        .end(done)
    })
  })
  describe('PUT /scores/:id', () => {
    it('should update player', (done) => {
      request(app)
        .put('/scores/4')
        .set('Content-Type', 'application/json')
        .send({ "player": "Nero", "score": 77 })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.player).to.be.equal('Nero')
          expect(res.body.score).to.be.equal(77)
        })
        .end(done)
    })
  })
  describe('DELETE /delete/player', () => {
    it('should delete player', (done) => {
      request(app)
        .delete('/scores/0')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body[0]).to.be.null
        })
        .end(done)
    })
  })
})
