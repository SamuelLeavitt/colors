function normalizeHex(color) {
  if (!color) return null;
  const cleaned = color.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  return "#" + cleaned.toUpperCase();
}

module.exports = { normalizeHex };
