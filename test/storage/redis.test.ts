import { redisStorage } from "./../../src/storage/redis";
const listName = "test-list";
const testItem = "test-item";

afterEach(async done => {
  await redisStorage.remove(listName, testItem);
  done();
});

afterAll(async done => {
  await redisStorage.quit();
  done();
});

describe("storage/redis", () => {
  describe("get", () => {
    it("should initially return an empty list", async () => {
      expect(await redisStorage.get(listName)).toEqual([]);
    });
  });

  describe("add", () => {
    it("should allow adding an element to the list", async () => {
      expect(await redisStorage.add(listName, testItem)).toBeTruthy();
      expect(await redisStorage.get(listName)).toEqual([testItem]);
    });
  });

  describe("remove", () => {
    it("should allow removing an element to the list", async () => {
      expect(await redisStorage.add(listName, testItem)).toBeTruthy();
      expect(await redisStorage.get(listName)).toEqual([testItem]);
      expect(await redisStorage.remove(listName, testItem)).toBeTruthy();
      expect(await redisStorage.get(listName)).toEqual([]);
    });
  });
});
