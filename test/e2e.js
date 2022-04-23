import request from 'supertest';
import app, { BASEPATH } from '../app.js';
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
      .post(BASEPATH + '/hello')
      .send({ name: 'world' })
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property("hello");
        done();
      })
  })

  it("should send to ifttt", done => {
    const username = process.env.USER
    request(app)
      .get(BASEPATH + `/send?text=${username} is testing&link=github.com`)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property('event', 'event');
        expect(res.body).to.have.property('text', username + ' is testing');
        expect(res.body).to.have.property('link', 'github.com');
        expect(res.body).to.have.property('imgUrl');
        expect(res.body).to.have.property('responseStatus', 200);
        done();
      });
  })

  it("should timeout when get SSE", function (done) {
    const EXPECTED_TIMEOUT = 200;
    this.timeout(EXPECTED_TIMEOUT + 100);
    const timeout = setTimeout(done, EXPECTED_TIMEOUT);
    request(app).get(BASEPATH + '/sse').expect(200, (err, res) => {
      clearTimeout(timeout);
      done(new Error('Unexpected Call'));
    });
  })

  it("should return 408 due to slow", done => {
    request(app).get(BASEPATH + "/slow").expect(408, (err, res) => {
      if (err) {
        return done(err);
      }
      done();
    });
  })

  after(() => {
    server.close();
  })
})