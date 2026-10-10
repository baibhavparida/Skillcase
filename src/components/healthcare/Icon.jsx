// Phosphor icon rendered with its final classes. site.js only hydrates
// [data-icon] placeholders once on load, so anything React re-renders after
// an interaction (tabs, rotating content) uses this component instead.
export default function Icon({ name, size = 16, weight = "bold", className = "" }) {
  return (
    <span
      className={`icon-svg icon-ph ph-${weight} ph-${name} ${className}`.trim()}
      style={{ "--icon-size": `${size < 18 ? size + 1 : size}px` }}
      aria-hidden="true"
    />
  );
}
