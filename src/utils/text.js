const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
export const formatInline = (value) =>
  escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
