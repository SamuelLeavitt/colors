const { spawn } = require("child_process");

let server;

beforeAll((done) => {
  server = spawn("php", ["-S", "127.0.0.1:8000", "-t", "."]);
  setTimeout(done, 1000);
});

afterAll(() => {
  if (server) server.kill();
});

async function postJson(path, body) {
  const response = await fetch(`http://127.0.0.1:8000/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  expect(response.status).toBe(200);
  return response.json();
}

describe("COLORS MySQL API integration tests", () => {
  test("Login.php returns seeded user from MySQL", async () => {
    const data = await postJson("LAMPAPI/Login.php", {
      login: "testuser",
      password: "testpass",
    });

    expect(data.error).toBe("");
    expect(data.firstName).toBe("Test");
    expect(data.lastName).toBe("User");
    expect(data.id).toBeGreaterThan(0);
  });

  test("AddColor.php inserts a color and SearchColors.php finds it", async () => {
    const login = await postJson("LAMPAPI/Login.php", {
      login: "testuser",
      password: "testpass",
    });

    const colorName = `JestBlue${Date.now()}`;

    const add = await postJson("LAMPAPI/AddColor.php", {
      color: colorName,
      userId: login.id,
    });

    expect(add.error).toBe("");

    const search = await postJson("LAMPAPI/SearchColors.php", {
      search: colorName,
      userId: login.id,
    });

    expect(search.error).toBe("");
    expect(search.results).toContain(colorName);
  });
});
