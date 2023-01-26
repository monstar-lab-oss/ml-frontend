import { http } from "@/utils/http";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";

describe("http", () => {
  const EMPLOYEE = {
    id: "1",
    name: "employee example",
  };

  let windowFetchSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, "example_token");
    windowFetchSpy = jest.spyOn(window, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  });

  test("return data when getting successfully", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => EMPLOYEE,
    });

    const data = await http.get("/employee/1");

    expect(windowFetchSpy).toBeCalledWith("/api/v1/employee/1", {
      body: undefined,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer example_token",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    expect(data).toEqual(EMPLOYEE);
  });

  test("return data when posting successfully", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => EMPLOYEE,
    });

    const data = await http.post("/employee/1", {
      name: "employee example",
    });

    expect(windowFetchSpy).toBeCalledWith("/api/v1/employee/1", {
      body: '{"name":"employee example"}',
      headers: {
        Accept: "application/json",
        Authorization: "Bearer example_token",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    expect(data).toEqual(EMPLOYEE);
  });

  test("return data when putting successfully", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => EMPLOYEE,
    });

    const data = await http.put("/employee/1", EMPLOYEE);

    expect(windowFetchSpy).toBeCalledWith("/api/v1/employee/1", {
      body: JSON.stringify(EMPLOYEE),
      headers: {
        Accept: "application/json",
        Authorization: "Bearer example_token",
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    expect(data).toEqual(EMPLOYEE);
  });

  test("return data when deleting successfully", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => EMPLOYEE,
    });

    const data = await http.delete("/employee/1");

    expect(windowFetchSpy).toBeCalledWith("/api/v1/employee/1", {
      body: undefined,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer example_token",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    expect(data).toEqual(EMPLOYEE);
  });

  test("throws error when calling fetch not successfully", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: false,
    });

    await expect(http.get("/employee/1")).rejects.toThrowError("Server error");
  });

  test("passes direct url to fetch when url is absolute", async () => {
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => EMPLOYEE,
    });

    await http.get("https://localhost/employee/1");

    expect(windowFetchSpy).toBeCalledWith("https://localhost/employee/1", {
      body: undefined,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer example_token",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  });
});
