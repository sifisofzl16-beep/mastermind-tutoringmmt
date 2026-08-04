"use client";

const REVIEW_LINK = "https://g.page/r/CbdZCEZW3YHKEAE/review";

export default function ReviewPrompt({
  open,
  applyUrl,
  onClose,
}: {
  open: boolean;
  applyUrl: string;
  onClose: () => void;
}) {
  if (!open) return null;

  function goToApplication() {
    onClose();
    window.location.href = applyUrl;
  }

  function rateAndContinue() {
    window.open(REVIEW_LINK, "_blank", "noopener,noreferrer");
    goToApplication();
  }

  return (
    <div
      onClick={goToApplication}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,8,15,0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "reviewFadeIn 0.25s ease-out",
      }}
    >
      <style>{`
        @keyframes reviewFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes reviewPopIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#0d1117",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "18px",
          padding: "2.25rem",
          maxWidth: "380px",
          width: "100%",
          textAlign: "center",
          animation: "reviewPopIn 0.3s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "0.25rem" }}>
          MMT<span style={{ color: "#c9a84c" }}>.</span>
        </p>

        <p style={{ fontSize: "1.7rem", letterSpacing: "0.15em", margin: "1rem 0 0.75rem", color: "#c9a84c" }}>
          ★★★★★
        </p>

        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.15rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "0.6rem", lineHeight: 1.3 }}>
          Quick favour before you apply?
        </h3>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "1.75rem" }}>
          If MMT&apos;s bursary and opportunity hub has helped you, a Google review helps other Wits students find us. Totally optional, your application comes first either way.
        </p>

        <button
          onClick={rateAndContinue}
          style={{
            display: "block",
            width: "100%",
            background: "linear-gradient(135deg, #c9a84c, #e8c96e)",
            color: "#06080f",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            padding: "0.85rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginBottom: "0.85rem",
          }}
        >
          ⭐ Rate MMT & Continue
        </button>

        <button
          onClick={goToApplication}
          style={{
            display: "block",
            width: "100%",
            background: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            color: "#94a3b8",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "0.85rem",
            padding: "0.75rem",
            cursor: "pointer",
          }}
        >
          Skip → Continue to Application
        </button>
      </div>
    </div>
  );
}
