import { config } from "./../src/config";

describe("config", () => {
  it("port returns a string", async () => {
    expect(typeof config.port).toEqual("string");
  });
});
