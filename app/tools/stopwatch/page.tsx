import { StopwatchBody } from "@/components/home/StopwatchDialog";
import PageTransition from "@/components/PageTransition";

export default function StopwatchPage() {
  return (
    <PageTransition>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
        <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
          秒表
        </h1>

        <div className="magic-bento-card" style={{ padding: "24px" }}>
          <StopwatchBody />
        </div>
      </div>
    </PageTransition>
  );
}
