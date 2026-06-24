export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "24px 0 8px",
        fontSize: "12px",
        color: "var(--text-secondary)",
        borderTop: "1px solid var(--border)",
        marginTop: "40px",
      }}
    >
      <div>
        &copy; {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--accent)" }}>keiROLE</span>
      </div>
      <div style={{ marginTop: "4px" }}>
        Built with Next.js + Tailwind CSS + framer-motion
      </div>
    </footer>
  );
}
