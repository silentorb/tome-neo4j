import { describe, expect, test } from "bun:test";
import { createNeo4jModule } from "../src/index";

describe("createNeo4jModule", () => {
  test("returns a module with id tome-neo4j", () => {
    const mod = createNeo4jModule();
    expect(mod.id).toBe("tome-neo4j");
  });

  test("open rejects until the store is implemented", async () => {
    const mod = createNeo4jModule();
    await expect(mod.open()).rejects.toThrow(/not implemented/);
  });
});
