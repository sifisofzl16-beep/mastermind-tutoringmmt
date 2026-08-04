"use client";

import { use, useState } from "react";
import { getOpportunity } from "../data";
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
    .hero-name { font-size: 1.9rem !important; }
    .two-col { grid-template-columns: 1fr !important; }
  }
`;

export default function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const opp = getOpportunity(slug);
  const waLink = "https://wa.me/27693126747?text=Hi%20MMT%2C%20please%20notify%20me%20when%20new%20opportunities%20open.";

  if (!opp) {
    return (
      <div style={{ background: "#06080f", minHeight: "100vh", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.25rem", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <style>{SHARED_STYLE}</style>
        <p className="syne" style={{ fontSize: "1.6rem", fontWeight: 800 }}>Opportunity not found</p>
        <p className="inter" style={{ color: "#64748b", maxWidth: "420px" }}>
          This one may have closed or moved. See everything currently open.
        </p>
        <a href="/opportunities" className="btn-gold">View All Opportunities</a>
      </div>
    );
  }

  const o = opp;
  const [reviewDestination, setReviewDestination] = useState<string | null>(null);
  const [reviewLabel, setReviewLabel] = useState("Continue");

  function handleApply() {
    setReviewLabel("Continue to Application");
    setReviewDestination(o.applyUrl);
  }

  function handleGetAlerts() {
    setReviewLabel("Continue to WhatsApp");
    setReviewDestination(waLink);
  }

  return (
    <div style={{ background: "#06080f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      <style>{SHARED_STYLE}</style>

      <button onClick={handleGetAlerts} className="sticky-wa">
        <span>💬</span> Get Alerts
      </button>

      {/* ── NAV ───────────────────────────── */}
      <nav style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "0.04em" }}>
            MMT<span className="gold">.</span>
          </a>
          <a href="/opportunities" className="nav-a hide-mobile">← All Opportunities</a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────── */}
      <section style={{ padding: "4rem 2rem 2.5rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}>
          <a href="/opportunities" className="nav-a" style={{ display: "inline-block", marginBottom: "2rem" }}>← Back to all opportunities</a>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>
              {o.emoji}
            </div>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span className="inter" style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "100px", padding: "0.3rem 0.8rem" }}>
                  ● {o.status}
                </span>
                <span className="inter" style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#c9a84c", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "100px", padding: "0.3rem 0.8rem" }}>
                  {o.type}
                </span>
              </div>
              <h1 className="syne hero-name" style={{ fontSize: "2.3rem", fontWeight: "800", lineHeight: "1.1" }}>
                {o.org}
              </h1>
            </div>
          </div>

          <p className="inter" style={{ fontSize: "1.02rem", color: "#94a3b8", lineHeight: "1.8", marginBottom: "2rem" }}>
            {o.summary}
          </p>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={handleApply} className="btn-gold">
              Apply via {o.org.split(" ")[0]} →
            </button>
            <div>
              <p className="inter" style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>Closes</p>
              <p className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", color: "#f1f5f9" }}>{o.closingDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────── */}
      <section style={{ padding: "1rem 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "0.75rem" }}>About this opportunity</div>
          <p className="inter" style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: "1.85" }}>
            {o.about}
          </p>
        </div>
      </section>

      {/* ── POSITIONS ─────────────────────── */}
      <section style={{ padding: "0 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Positions Available</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {o.positions.map((p) => (
              <div key={p.group} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="inter" style={{ fontSize: "0.9rem", color: "#f1f5f9", fontWeight: "600" }}>{p.group}</span>
                <span className="syne" style={{ fontSize: "0.9rem", fontWeight: "800", color: "#c9a84c" }}>{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS + DUTIES ─────────── */}
      <section style={{ padding: "0 2rem 3rem" }}>
        <div className="two-col" style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
            <p className="syne" style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.9rem" }}>Requirements</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {o.requirements.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#c9a84c", fontSize: "0.8rem", marginTop: "0.1rem" }}>✓</span>
                  <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
            <p className="syne" style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.9rem" }}>What the role involves</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {o.duties.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#3b82f6", fontSize: "0.8rem", marginTop: "0.1rem" }}>▸</span>
                  <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY DATES ─────────────────────── */}
      <section style={{ padding: "0 2rem 3rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Key Dates</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {o.keyDates.map((d) => (
              <div key={d.label} style={{ flex: "1 1 200px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.1rem 1.25rem" }}>
                <p className="inter" style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{d.label}</p>
                <p className="syne" style={{ fontSize: "1rem", fontWeight: "800", color: "#f1f5f9" }}>{d.date}</p>
              </div>
            ))}
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
              You&apos;ll be taken to {o.org}&apos;s official application form.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleApply} className="btn-gold">
                Apply via {o.org.split(" ")[0]} →
              </button>
              <a href="/opportunities" className="btn-outline">See other opportunities</a>
            </div>
            <p className="inter" style={{ fontSize: "0.68rem", color: "#374151", marginTop: "1.5rem" }}>
              Verified against {o.source}. Applications are processed by {o.org.split(" ")[0]} directly. MMT does not handle submissions or selection.
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

      <ReviewPrompt open={reviewDestination !== null} destinationUrl={reviewDestination || ""} continueLabel={reviewLabel} onClose={() => setReviewDestination(null)} />
    </div>
  );
}
