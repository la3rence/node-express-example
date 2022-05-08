import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import config from "./../swagger/apiconfig.js";
import logger from "../middleware/logger.js";
const { BASEPATH } = config;

describe("test: end to end testing", () => {
  before((done) => {
    logger.info("set up...");
    done();
  });

  it("should respond 200 with CORS preflight request", (done) => {
    request(app)
      .options(BASEPATH)
      .set("Origin", "http://localhost:3000")
      .set("Access-Control-Request-Method", "GET")
      .set("Access-Control-Request-Headers", "X-PINGOTHER, Content-Type")
      .expect(200)
      .expect("Access-Control-Allow-Origin", "*")
      .end((err, res) => {
        if (err) {
          logger.error(err);
          done(err);
        }
        done();
      });
  });

  it("should post a hello world", (done) => {
    request(app)
      .post(BASEPATH + "/hello")
      .send({ name: "world" })
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property("hello");
        done();
      });
  });

  it("should timeout when get SSE", function (done) {
    const EXPECTED_TIMEOUT = 200;
    this.timeout(EXPECTED_TIMEOUT + 100);
    const timeout = setTimeout(done, EXPECTED_TIMEOUT);
    request(app)
      .get(BASEPATH + "/sse")
      .expect(200, (err, res) => {
        clearTimeout(timeout);
        done(new Error("Unexpected Call"));
      });
  });

  it("should return 408 due to timeout", (done) => {
    request(app)
      .get(BASEPATH + "/slow")
      .expect(408, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("should get swagger ui page", (done) => {
    request(app)
      .get(BASEPATH + "/docs/")
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  after(() => {
    logger.info("tear down...");
  });
});
