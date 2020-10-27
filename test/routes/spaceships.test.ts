import * as storage from "../../src/storage/redis";

import server from "../../src/server";

const request = require("supertest");

jest.mock("./../../src/storage/redis");

afterEach(done => {
  server.close();
  done();
});

describe("routes/spaceships", () => {
  const spaceships = ["Starship Enterprise", "Alien Mothership"];

  spaceships.forEach((spaceship: string) => {
    it(`should allow adding a ${spaceship} spaceship to the list`, async () => {
      const mockGet = jest.fn((list: string) => Promise.resolve([spaceship]));
      storage.redisStorage = jest.fn(() => {
        return {
          get: mockGet,
          add: (list: string) => Promise.resolve(false),
          remove: (list: string) => Promise.resolve(false)
        };
      });

      const response = await request(server)
        .post("/spaceships")
        .send({ name: spaceship });

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        spaceships: [spaceship]
      });
    });
  });

  it("should return a validation failure if the spaceship data is incorrect", async () => {
    const response = await request(server)
      .post("/spaceships")
      .send({ name: "" });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      status: "error",
      data: [
        {
          target: {
            name: ""
          },
          value: "",
          property: "name",
          children: [],
          constraints: {
            length: "name must be longer than or equal to 1 characters"
          }
        }
      ]
    });
  });
});
