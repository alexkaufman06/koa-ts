import server from "../../src/server";
const request = require("supertest");

afterEach(done => {
  server.close();
  done();
});

describe("routes/spaceships", () => {
  const spaceships = ["Starship Enterprise", "Alien Mothership"];

  spaceships.forEach((spaceship: string) => {
    it(`should allow adding a ${spaceship} spaceship to the list`, async () => {
      const response = await request(server)
        .post("/spaceships")
        .send({ spaceship });

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        spaceships: [spaceship]
      });
    });
  });
});
