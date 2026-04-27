const { normalizeHex } = require("../src/colorUtils");

test("normalizes valid hex colors", () => {
  expect(normalizeHex("ff00aa")).toBe("#FF00AA");
  expect(normalizeHex("#00ff00")).toBe("#00FF00");
});

test("rejects invalid hex colors", () => {
  expect(normalizeHex("blue")).toBeNull();
});
