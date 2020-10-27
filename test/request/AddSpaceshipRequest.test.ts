import { AddSpaceshipRequest } from "../../src/request/AddSpaceshipRequest";
import { validate } from "class-validator";

describe("request/AddSpaceshipRequest", () => {
  let addSpaceshipRequest: AddSpaceshipRequest;
  const validatorOptions = {};

  beforeAll(() => {
    addSpaceshipRequest = new AddSpaceshipRequest();
  });

  it(`has the expected class properties'`, async () => {
    addSpaceshipRequest.name = "a game name here";
    expect(addSpaceshipRequest.name).toBeDefined();
  });

  describe(`'name' validation`, () => {
    it("is valid", async () => {
      for (let i = 1; i <= 25; ++i) {
        addSpaceshipRequest.name = "x".repeat(i);
        expect(
          await validate(addSpaceshipRequest, validatorOptions)
        ).toHaveLength(0);
      }
    });

    it("must have length of 1 character or greater", async () => {
      addSpaceshipRequest.name = "";
      expect(
        await validate(addSpaceshipRequest, validatorOptions)
      ).toHaveLength(1);
    });

    it("must have a length of 25 characters or fewer", async () => {
      addSpaceshipRequest.name = "y".repeat(26);
      expect(
        await validate(addSpaceshipRequest, validatorOptions)
      ).toHaveLength(1);
    });
  });
});
