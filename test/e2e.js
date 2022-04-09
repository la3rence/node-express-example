import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';

describe('E2E Test', () => {
  let server;

  before(done => {
    server = app.listen(3000, err => {
      if (err) {
        return done(err);
      }
      done();
    });
  })

  it("should send a hello", (done) => {
    request(app)
      .get('/hello')
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      })
  })

  it("should send to ifttt", done => {
    request(app)
      .get('/send?text=CI Test&link=github.com')
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property('event', 'event');
        expect(res.body).to.have.property('text', 'CI Test');
        expect(res.body).to.have.property('link', 'github.com');
        expect(res.body).to.have.property('imgUrl', 'https://s3.bmp.ovh/imgs/2022/04/09/5da9d13f02880f41.png');
        expect(res.body).to.have.property('responseStatus', 200);
        done();
      });
  })

  after(() => {
    server.close();
  })
})