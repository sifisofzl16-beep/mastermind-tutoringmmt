"use client";

import { useState, useEffect } from "react";

type Bursary = {
  company: string;
  emoji: string;
  status: "Open" | "Closing Soon" | "Closed";
  year: string;
  summary: string;
  fields: { group: string; items: string[] }[];
  requirements: string[];
  closingDate: string;
  applyUrl: string;
  source: string;
};

const BURSARIES: Bursary[] = [
  {
    company: "Toyota South Africa Motors",
    emoji: "🚗",
    status: "Open",
    year: "2027",
    summary:
      "Toyota SA is funding full-time South African students across Engineering, Commerce and Science fields, with vacation work and a path into their graduate programme.",
    fields: [
      { group: "Engineering", items: ["Chemical", "Electrical", "Civil", "Industrial", "Mechanical", "Mechatronics"] },
      { group: "Commerce", items: ["Accounting (Non-CA)", "Analytics", "Economics", "Environmental Science", "Financial Management", "Human Resource Management", "Law (LLB)", "Marketing Management"] },
      { group: "Science", items: ["Business Science Analytics", "Computer Science", "Information Technology"] },
    ],
    requirements: [
      "South African citizens only",
      "Minimum 65% for Mathematics and English in Matric",
      "Minimum 65% overall average at tertiary level",
      "Studying full-time at an accredited SA institution",
    ],
    closingDate: "30 September 2026",
    applyUrl: "http://studytrust.org.za/toyota",
    source: "jobs.toyota.co.za",
  },
];

export default function BursariesPage() {
  const waLink =
    "https://wa.me/27660397779?text=Hi%20MMT%2C%20please%20notify%20me%20when%20new%20bursaries%20open.";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#06080f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .syne { font-family: 'Syne', sans-serif; }
        .inter { font-family: 'Inter', sans-serif; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(201,168,76,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06080f; }
        ::-webkit-scrollbar-thumb { background: #1a1f2e; border-radius: 2px; }
        .btn-gold {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: linear-gradient(135deg, #c9a84c, #e8c96e);
          color: #06080f; font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 0.9rem; letter-spacing: 0.04em; padding: 0.85rem 2rem;
          border-radius: 6px; border: none; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s; white-space: nowrap;
        }
        .btn-gold:hover { opacity: 0.9; transform: translateY(-2px); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: #e2e8f0; font-family: 'Inter', sans-serif;
          font-weight: 500; font-size: 0.9rem; padding: 0.85rem 2rem;
          border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
        }
        .btn-outline:hover { border-color: rgba(201,168,76,0.5); transform: translateY(-2px); }
        .gold { color: #c9a84c; }
        .card-dark {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .card-dark:hover { border-color: rgba(201,168,76,0.2); transform: translateY(-4px); }
        .nav-a { font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 500; color: #64748b; transition: color 0.2s; letter-spacing: 0.02em; }
        .nav-a:hover { color: #c9a84c; }
        .field-pill {
          font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #94a3b8;
          padding: 0.3rem 0.75rem; border-radius: 100px;
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
        .divider-gold { width: 40px; height: 3px; background: linear-gradient(90deg, #c9a84c, transparent); border-radius: 2px; margin: 1rem 0 1.5rem; }
        .label-tag { font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a84c; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <a href={waLink} target="_blank" rel="noreferrer" className="sticky-wa">
        <span>💬</span> Get Bursary Alerts
      </a>

      {/* ── NAV ───────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s", background: scrolled ? "rgba(6,8,15,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "0.04em" }}>
            MMT<span className="gold">.</span>
          </a>
          <div className="hide-mobile" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <a href="/" className="nav-a">← Back to mastermindtutoring.co.za</a>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold" style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}>
            Get Alerts
          </a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────── */}
      <section style={{ padding: "9rem 2rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>MMT Bursary Watch</div>
          <h1 className="syne" style={{ fontSize: "3rem", fontWeight: "800", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "1.25rem", maxWidth: "680px" }}>
            We track the bursaries.<br />You focus on the application.
          </h1>
          <p className="inter" style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: "1.8", maxWidth: "620px" }}>
            Every bursary below is checked against the company&apos;s official page before it goes up here — fields, requirements, and closing dates included. New opportunities get added as they open. WhatsApp us to get notified the moment a new one drops.
          </p>
        </div>
      </section>

      {/* ── BURSARY CARDS ─────────────────── */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {BURSARIES.map((b) => (
            <div key={b.company} className="card-dark" style={{ padding: "2.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "52px", height: "52px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                    {b.emoji}
                  </div>
                  <div>
                    <h2 className="syne" style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f1f5f9" }}>{b.company}</h2>
                    <p className="inter" style={{ fontSize: "0.8rem", color: "#475569" }}>Bursary {b.year}</p>
                  </div>
                </div>
                <span className="inter" style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "100px", padding: "0.4rem 0.9rem" }}>
                  ● {b.status}
                </span>
              </div>

              <p className="inter" style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: "1.75", marginBottom: "1.5rem", maxWidth: "760px" }}>
                {b.summary}
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                {b.fields.map((f) => (
                  <div key={f.group} style={{ marginBottom: "0.85rem" }}>
                    <p className="inter" style={{ fontSize: "0.68rem", fontWeight: "700", color: "#c9a84c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{f.group}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {f.items.map((item) => (
                        <span key={item} className="field-pill">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "1.1rem 1.25rem", marginBottom: "1.5rem" }}>
                <p className="inter" style={{ fontSize: "0.7rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>Requirements</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {b.requirements.map((r) => (
                    <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ color: "#c9a84c", fontSize: "0.75rem", marginTop: "0.15rem" }}>✓</span>
                      <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p className="inter" style={{ fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>Closing Date</p>
                  <p className="syne" style={{ fontSize: "1.2rem", fontWeight: "800", color: "#f1f5f9" }}>{b.closingDate}</p>
                </div>
                <a href={b.applyUrl} target="_blank" rel="noreferrer" className="btn-gold">
                  Apply via {b.company.split(" ")[0]} →
                </a>
              </div>
              <p className="inter" style={{ fontSize: "0.7rem", color: "#374151", marginTop: "1rem" }}>
                Verified against {b.source}. Applications are processed by the company directly — MMT does not handle submissions or selection.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MORE COMING ───────────────────── */}
      <section style={{ padding: "0 2rem 7rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ padding: "3rem", background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", textAlign: "center" }}>
            <h3 className="syne" style={{ fontSize: "1.6rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.85rem" }}>
              More bursaries get added as they open.
            </h3>
            <p className="inter" style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 2rem" }}>
              NSFAS, Sasol, Eskom, Anglo American and others open at different points in the year. WhatsApp us and we&apos;ll message you the day a new one goes live on this page.
            </p>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold" style={{ fontSize: "0.95rem", padding: "0.95rem 2.25rem" }}>
              📲 Get Notified — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <a href="/" className="syne" style={{ fontWeight: "800", fontSize: "1rem" }}>MMT<span className="gold">.</span></a>
          <p className="inter" style={{ fontSize: "0.75rem", color: "#374151" }}>© 2026 Mastermind Tutoring · Wits University · Johannesburg</p>
          <a href="/" className="inter" style={{ fontSize: "0.75rem", color: "#374151" }}>mastermindtutoring.co.za</a>
        </div>
      </footer>
    </div>
  );
}
