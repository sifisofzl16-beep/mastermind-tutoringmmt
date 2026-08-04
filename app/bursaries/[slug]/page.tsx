"use client";

import { use, useState } from "react";
import { getBursary } from "../data";
import ReviewPrompt from "../../components/ReviewPrompt";

const SHARED_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .syne { font-family: 'Syne', sans-serif; }
  .inter { font-family: 'Inter', sans-serif; }
  a { text-decoration: none; color: inherit; }
  ::selection { background: rgba(201,168,76,0.3); }
  .btn-gold {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: linear-gradient(135deg, #c9a84c, #e8c96e);
    color: #06080f; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.04em; padding: 0.95rem 2.25rem;
    border-radius: 6px; border: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s; white-space: nowrap;
  }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-2px); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: #e2e8f0; font-family: 'Inter', sans-serif;
    font-weight: 500; font-size: 0.85rem; padding: 0.7rem 1.5rem;
    border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
    transition: border-color 0.2s, transform 0.15s;
  }
  .btn-outline:hover { border-color: rgba(201,168,76,0.5); }
  .gold { color: #c9a84c; }
  .nav-a { font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 500; color: #64748b; transition: color 0.2s; }
  .nav-a:hover { color: #c9a84c; }
  .field-pill {
    font-family: 'Inter', sans-serif; font-size: 0.78rem; color: #94a3b8;
    padding: 0.35rem 0.85rem; border-radius: 100px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  }
  .sticky-wa {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    background: #25D366; color: #fff; border: none; border-radius: 50px;
    padding: 0.85rem 1.5rem; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.9rem; cursor: pointer; box-shadow: 0 8px 32px rgba(37,211,102,0.3);
    display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s;
  }
  .sticky-wa:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(37,211,102,0.4); }
  .label-tag { font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a84c; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .hero-name { font-size: 2rem !important; }
  }
`;

export default function BursaryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const bursary = getBursary(slug);
  const waLink = "https://wa.me/27693126747?text=Hi%20MMT%2C%20please%20notify%20me%20when%20new%20bursaries%20open.";

  if (!bursary) {
    return (
      <div style={{ background: "#06080f", minHeight: "100vh", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.25rem", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <style>{SHARED_STYLE}</style>
        <p className="syne" style={{ fontSize: "1.6rem", fontWeight: 800 }}>Bursary not found</p>
        <p className="inter" style={{ color: "#64748b", maxWidth: "420px" }}>
          This one may have closed or moved. See everything currently open on the bursaries page.
        </p>
        <a href="/bursaries" className="btn-gold">View All Bursaries</a>
      </div>
    );
  }

  const b = bursary;
  const [showReview, setShowReview] = useState(false);

  function handleApply() {
    window.open(b.applyUrl, "_blank", "noopener,noreferrer");
    setShowReview(true);
  }

  return (
    <div style={{ background: "#06080f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      <style>{SHARED_STYLE}</style>

      <a href={waLink} target="_blank" rel="noreferrer" className="sticky-wa">
        <span>💬</span> Get Bursary Alerts
      </a>

      {/* ── NAV ───────────────────────────── */}
      <nav style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "0.04em" }}>
            MMT<span className="gold">.</span>
          </a>
          <a href="/bursaries" className="nav-a hide-mobile">← All Bursaries</a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────── */}
      <section style={{ padding: "4rem 2rem 2.5rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}>
          <a href="/bursaries" className="nav-a" style={{ display: "inline-block", marginBottom: "2rem" }}>← Back to all bursaries</a>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>
              {b.emoji}
            </div>
            <div>
              <span className="inter" style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "100px", padding: "0.3rem 0.8rem", display: "inline-block", marginBottom: "0.5rem" }}>
                ● {b.status}
              </span>
              <h1 className="syne hero-name" style={{ fontSize: "2.5rem", fontWeight: "800", lineHeight: "1.1" }}>
                {b.company}
              </h1>
            </div>
          </div>

          <p className="inter" style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: "1.8", marginBottom: "2rem" }}>
            {b.summary}
          </p>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={handleApply} className="btn-gold">
              Apply via {b.company.split(" ")[0]} →
            </button>
            <div>
              <p className="inter" style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Closes</p>
              <p className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", color: "#f1f5f9" }}>{b.closingDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────── */}
      <section style={{ padding: "1rem 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "0.75rem" }}>About this bursary</div>
          <p className="inter" style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: "1.85" }}>
            {b.about}
          </p>
        </div>
      </section>

      {/* ── FIELDS ────────────────────────── */}
      <section style={{ padding: "0 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Fields Covered</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {b.fields.map((f) => (
              <div key={f.group} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
                <p className="syne" style={{ fontSize: "0.85rem", fontWeight: "800", color: "#c9a84c", marginBottom: "0.7rem" }}>{f.group}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {f.items.map((item) => (
                    <span key={item} className="field-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS + BENEFITS ───────── */}
      <section style={{ padding: "0 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
            <p className="syne" style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.9rem" }}>Requirements</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {b.requirements.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#c9a84c", fontSize: "0.8rem", marginTop: "0.1rem" }}>✓</span>
                  <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
            <p className="syne" style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.9rem" }}>What you get</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {b.benefits.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#4ade80", fontSize: "0.8rem", marginTop: "0.1rem" }}>★</span>
                  <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────── */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ padding: "2.5rem", background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "18px", textAlign: "center" }}>
            <h3 className="syne" style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.6rem" }}>
              Ready to apply?
            </h3>
            <p className="inter" style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              You&apos;ll be taken to {b.company.split(" ")[0]}&apos;s official application platform.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleApply} className="btn-gold">
                Apply via {b.company.split(" ")[0]} →
              </button>
              <a href="/bursaries" className="btn-outline">See other bursaries</a>
            </div>
            <p className="inter" style={{ fontSize: "0.68rem", color: "#374151", marginTop: "1.5rem" }}>
              Verified against {b.source}. Applications are processed by {b.company.split(" ")[0]} directly. MMT does not handle submissions or selection.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <a href="/" className="syne" style={{ fontWeight: "800", fontSize: "0.95rem" }}>MMT<span className="gold">.</span></a>
          <p className="inter" style={{ fontSize: "0.72rem", color: "#374151" }}>© 2026 Mastermind Tutoring · Wits University</p>
        </div>
      </footer>

      <ReviewPrompt open={showReview} onClose={() => setShowReview(false)} />
    </div>
  );
}
