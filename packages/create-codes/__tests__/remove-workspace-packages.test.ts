import { test, expect, describe } from "vitest";
import { removeWorkspacePackages } from "../src/helpers/remove-workspace-packages";

describe("removeWorkspacePackages", () => {
  test("removes workspace packages", () => {
    const dependencies = {
      "package-name-0": "workspace:*",
      react: "17.0.2",
      "package-name-1": "workspace:~",
      "package-name-2": "workspace:^",
      axios: "0.21.1",
      "package-name-3": "workspace:^1.5.0",
    };

    const result = removeWorkspacePackages(dependencies);

    expect(result).toEqual({
      react: "17.0.2",
      axios: "0.21.1",
    });
  });

  test("does nothing with non-workspace packages", () => {
    const dependencies = {
      react: "17.0.2",
      lodash: "4.17.21",
      axios: "0.21.1",
    };

    const result = removeWorkspacePackages(dependencies);

    expect(result).toEqual({
      react: "17.0.2",
      lodash: "4.17.21",
      axios: "0.21.1",
    });
  });
});
