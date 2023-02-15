import { test, expect, describe } from "vitest";
import { deepMergeObjects } from "../src/helpers";

describe("deepMergeObjects", () => {
  test("should append", () => {
    const result = deepMergeObjects(
      { a: { b: { c: { d: 1 } } } },
      { a: { b: { c: { e: 1, f: "f" } } } }
    );
    expect(result).toStrictEqual({ a: { b: { c: { d: 1, e: 1, f: "f" } } } });
  });

  test("should overwrite", () => {
    const result = deepMergeObjects(
      { a: { b: { c: { e: 1 } } } },
      { a: { b: { c: { e: 2 } } } }
    );
    console.log(JSON.stringify(result, null, 2));
    expect(result).toStrictEqual({ a: { b: { c: { e: 2 } } } });
  });

  test("should not removed", () => {
    const result = deepMergeObjects(
      { a: { b: { c: { e: 1 } } } },
      { a: { b: {} } }
    );
    console.log(JSON.stringify(result, null, 2));
    expect(result).toStrictEqual({ a: { b: { c: { e: 1 } } } });
  });
});
