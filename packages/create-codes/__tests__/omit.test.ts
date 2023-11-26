import { test, expect, describe } from "vitest";
import { omit } from "../src/helpers/omit";

describe("omit", () => {
  test("omits specified key from dependencies", () => {
    const dependencies = {
      react: "17.0.2",
      lodash: "4.17.21",
      axios: "0.21.1",
    };

    const options = {
      key: "lodash",
    };

    const result = omit(dependencies, options);

    expect(result).toEqual({
      react: "17.0.2",
      axios: "0.21.1",
    });
  });

  test("omits specified value from dependencies", () => {
    const dependencies = {
      react: "17.0.2",
      lodash: "4.17.21",
      axios: "0.21.1",
    };

    const options = {
      value: "4.17.21",
    };

    const result = omit(dependencies, options);

    expect(result).toEqual({
      react: "17.0.2",
      axios: "0.21.1",
    });
  });

  test("omits specified key and value from dependencies", () => {
    const dependencies = {
      react: "17.0.2",
      lodash: "4.17.21",
      axios: "0.21.1",
    };

    const options = {
      key: "lodash",
      value: "4.17.21",
    };

    const result = omit(dependencies, options);

    expect(result).toEqual({
      react: "17.0.2",
      axios: "0.21.1",
    });
  });

  test("returns the same dependencies if no key or value is specified", () => {
    const dependencies = {
      react: "^17.0.2",
      lodash: "^4.17.21",
      axios: "^0.21.1",
    };

    const options = {
      key: undefined,
      value: undefined,
    };

    const result = omit(dependencies, options);

    expect(result).toEqual(dependencies);
  });
});
