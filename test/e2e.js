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
      .get(BASEPATH + '/hello')
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      })
  })

  it("should send to ifttt", done => {
    const username = process.env.USER
    request(app)
      .get(BASEPATH + `/send?text=${username} is testing&link=github.com&imgUrl=https://s2.loli.net/2022/04/20/U3QC4iA7kBpnYwb.png`)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property('event', 'event');
        expect(res.body).to.have.property('text', username + ' is testing');
        expect(res.body).to.have.property('link', 'github.com');
        expect(res.body).to.have.property('imgUrl', 'https://s2.loli.net/2022/04/20/U3QC4iA7kBpnYwb.png');
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