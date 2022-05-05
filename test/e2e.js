import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import config from "./../swagger/apiconfig.js";
import logger from "../middleware/logger.js";
const { BASEPATH } = config;

describe("E2E Test", () => {
  before((done) => {
    logger.info("set up...");
    done();
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

  it("should send to ifttt", (done) => {
    const username = process.env.USER;
    request(app)
      .get(BASEPATH + `/send?text=${username} is testing&link=github.com`)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property("event", "event");
        expect(res.body).to.have.property("text", username + " is testing");
        expect(res.body).to.have.property("link", "github.com");
        expect(res.body).to.have.property("imgUrl");
        expect(res.body).to.have.property("responseStatus", 200);
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
