import request from "supertest";
import server from "../../src/server";

// close the server after each test
afterEach(done => {
  server.close();
  done();
});

describe("routes/healthcheck", () => {
  it("return data", async () => {
    const response = await request(server).get("/healthcheck");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.data).toEqual("It works!");
  });
});
