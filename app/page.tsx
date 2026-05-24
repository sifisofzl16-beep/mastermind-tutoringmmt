"use client";
 
import { useState, useEffect } from "react";
 
export default function MastermindTutoringWebsite() {
  const bookingFormLink = "https://wa.me/27660397779?text=Hi%20MMT%2C%20I%27d%20like%20to%20book%20a%20tutoring%20session.";
  const tutorApplicationLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";
  const whatsappLink = "https://wa.me/27660397779";
 
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const packages = [
    {
      name: "Single Session",
      tier: "Pay as you go",
      inPerson: "R250",
      online: "R200",
      monthly: null,
      ideal: "Perfect for students who need targeted help before a test or exam.",
      features: [
        "1-hour focused session",
        "Any module we cover",
        "Online or in-person",
        "WhatsApp support after session",
      ],
    },
    {
      name: "Monthly Package",
      tier: "Most Popular",
      inPerson: "R1,760",
      online: "R1,440",
      monthly: "8 sessions / month",
      ideal: "Best value for students who want consistent, structured support throughout the semester.",
      features: [
        "8 sessions per month",
        "Dedicated tutor assigned",
        "Progress tracking",
        "Priority WhatsApp support",
      ],
    },
  ];
 
  const tutors = [
    {
      name: "Kagiso Mokoena",
      subject: "Linear Algebra · Business Statistics",
      year: "3rd Year — BSc Mathematics",
      bio: "Breaks down complex mathematical concepts into clear, structured frameworks. Specialises in first and second year quantitative modules across Engineering and Commerce.",
    },
    {
      name: "Zanele Moyo",
      subject: "Physics · APPM1014",
      year: "4th Year — BSc Physics",
      bio: "One of MMT\'s highest-rated tutors. Combines deep theoretical understanding with an exam-focused approach that has helped dozens of Wits students pass Phys1000A.",
    },
    {
      name: "Luyanda Ntuli",
      subject: "Corporate Finance · Taxation",
      year: "Honours — BCom Accounting",
      bio: "Specialist in Commerce and Accounting modules. Brings Honours-level insight to students tackling Corporate Finance II, Taxation 3 and advanced BCom modules.",
    },
  ];
 
  const reviews = [
    {
      name: "Aiden van der Merwe",
      programme: "Mechanical Engineering",
      quote: "MMT helped me finally understand the module I was struggling with. The tutor was sharp and explained things clearly.",
      rating: 5,
    },
    {
      name: "Priya Naidoo",
      programme: "BSc Science",
      quote: "Structured sessions, professional tutors, and real improvement before tests. Worth every rand.",
      rating: 5,
    },
    {
      name: "Sibusiso Mthembu",
      programme: "Chemical Engineering",
      quote: "Professional, focused, and effective. Exactly what I needed going into exams.",
      rating: 5,
    },
  ];
 
  const stats = [
    { value: "200+", label: "Students Supported" },
    { value: "15+", label: "Modules Covered" },
    { value: "90%", label: "Report Improved Marks" },
    { value: "Wits", label: "University Focus" },
  ];
 
  return (
    <div className="min-h-screen text-white" style={{ background: "#060d1a", fontFamily: "'Georgia', serif" }}>
 
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .nav-link {
          position: relative; font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
          letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: #22d3ee; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #22d3ee; color: #060d1a; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.875rem; letter-spacing: 0.05em;
          padding: 0.75rem 1.75rem; border-radius: 4px; text-decoration: none;
          transition: background 0.2s, transform 0.1s; cursor: pointer; border: none;
        }
        .btn-primary:hover { background: #67e8f9; transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: #e2e8f0; font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 0.875rem; letter-spacing: 0.05em;
          padding: 0.75rem 1.75rem; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.15); text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.1s; cursor: pointer;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; transform: translateY(-1px); }
        .card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; transition: border-color 0.3s, transform 0.3s;
        }
        .card:hover { border-color: rgba(34,211,238,0.3); transform: translateY(-3px); }
        .card-featured {
          background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.25);
          border-radius: 12px; position: relative; transition: border-color 0.3s, transform 0.3s;
        }
        .card-featured:hover { border-color: rgba(34,211,238,0.5); transform: translateY(-3px); }
        .badge {
          display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.3);
        }
        .badge-muted {
          display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.2);
        }
        .divider { width: 48px; height: 2px; background: #22d3ee; margin: 1.25rem 0; }
        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; color: #22d3ee; margin-bottom: 1rem;
        }
        .star { color: #22d3ee; font-size: 0.85rem; }
        .price-table { background: rgba(0,0,0,0.25); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 1.5rem; }
        .price-row { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .price-row:last-child { border-bottom: none; }
        .price-row-highlight { background: rgba(34,211,238,0.06); }
        .price-label { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
        .price-value { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem; }
        .price-unit { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; color: #475569; margin-left: 0.25rem; }
        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 9999;
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
          top: -100px; right: -100px; pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
          bottom: 0; left: -100px; pointer-events: none;
        }
        .contact-item {
          display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .contact-item:hover { border-color: rgba(34,211,238,0.3); }
        .contact-icon {
          width: 40px; height: 40px; background: rgba(34,211,238,0.1);
          border: 1px solid rgba(34,211,238,0.2); border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
 
      <div className="noise-overlay" />
 
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        background: scrolled ? "rgba(6,13,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease", padding: "0 1.5rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "34px", height: "34px", background: "linear-gradient(135deg, #22d3ee, #0891b2)",
              borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem", fontWeight: "700", color: "#060d1a", fontFamily: "'DM Sans', sans-serif",
            }}>M</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700", fontSize: "1.1rem", color: "#f1f5f9", letterSpacing: "0.01em" }}>
              Mastermind Tutoring
            </span>
          </div>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <a href="#modules" className="nav-link">Modules</a>
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#packages" className="nav-link">Packages</a>
            <a href="#tutors" className="nav-link">Tutors</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8rem" }}>
            Book a Session
          </a>
        </div>
      </nav>
 
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "68px" }}>
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
          <div className="section-label">Wits University — Johannesburg</div>
          <h1 className="hero-title font-display" style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: "900", lineHeight: "1.05",
            color: "#f8fafc", maxWidth: "800px", marginBottom: "1.5rem",
          }}>
            Excellence made{" "}
            <span style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              understandable.
            </span>
          </h1>
          <p className="font-body" style={{ fontSize: "1.125rem", color: "#94a3b8", maxWidth: "540px", lineHeight: "1.75", marginBottom: "2.5rem" }}>
            Mastermind Tutoring connects Wits students with high-performing peer tutors across the most demanding academic modules. Professional. Structured. Results-driven.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary">Book a Session →</a>
            <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="btn-ghost">Apply as a Tutor</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "5rem", maxWidth: "600px" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: "1.75rem", fontWeight: "700", color: "#22d3ee" }}>{s.value}</div>
                <div className="font-body" style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 

      {/* MODULES */}
      <section id="modules" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">What We Cover</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Modules We Tutor
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
          We cover modules across all major faculties at Wits. If your module isn&apos;t listed, WhatsApp us — we&apos;ll find you a tutor.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>

          {/* Common First Year Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚙️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#818cf8", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · All Engineering Degrees</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Common First Year Engineering</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Engineering Chemistry",
                "Intro to Engineering Profession",
                "Engineering Analysis & Design IA & IB",
                "Engineering Mathematics IA & IB",
                "Engineering Physics IA & IB",
                "Applied Physics I",
                "Computing for Process Engineering (2nd yr)",
                "Engineering Chemistry IIA & IIB",
                "Process Engineering Fundamentals A & B",
                "Electrical Engineering",
                "Mathematics II",
                "Solid Mechanics (CIVN2008A)",
                "Thermodynamics · Fluid Mechanics",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#818cf8", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Computational & Applied Mathematics */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📐</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Science · FEBE</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Computational & Applied Maths</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Mathematical Methods & Modelling I (APPM1026A)",
                "Mechanics I (APPM1028A)",
                "Scientific Computing I (APPM1030A)",
                "Algebra I (MATH1034A)",
                "Calculus I (MATH1036A)",
                "Basic Analysis II (MATH2001A)",
                "Multivariable Calculus II (MATH2007A)",
                "Linear Algebra II (MATH2019A)",
                "Abstract Mathematics II (MATH2015A)",
                "Advanced Analysis II (MATH2016A)",
                "Intro to Mathematical Statistics II (STAT2012A)",
                "Mathematical Methods & Modelling II (APPM2021A)",
                "Mechanics II (APPM2023A)",
                "Scientific Computing II (APPM2025A)",
                "Basic Computer Organisation I (COMS1015A)",
                "Intro to Algorithms & Programming I (COMS1018A)",
                "Intro to Data Structures & Algorithms I (COMS1017A)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Accounting Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📊</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Accounting Science</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Accounting Information Systems",
                "Financial Accounting I, II, III",
                "Management Accounting & Finance II, III",
                "Taxation II, III",
                "Auditing II, III",
                "Business Enterprise Law",
                "Mercantile Law",
                "Information Systems Data Analytics II",
                "Economics IA (Microeconomics)",
                "Economics IB (Macroeconomics)",
                "Commercial Law I",
                "Computational Mathematics I",
                "Business Statistics I",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* BCom Accounting */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💼</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>BCom Accounting</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Accounting I & II",
                "Management Accounting & Finance II",
                "Taxation II",
                "Auditing II",
                "Business Enterprise Law",
                "Mercantile Law",
                "Information Systems Data Analytics II",
                "Fundamentals of Information Systems",
                "Information Systems IA",
                "Economics IA & IB",
                "Commercial Law I",
                "Computational Mathematics I",
                "Business Statistics I",
                "Human Resources IIA",
                "Principles of Marketing",
                "Consumer Behaviour",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Information Systems */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💻</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#c084fc", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Information Systems</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Information Systems IA & IB",
                "Information Systems IIA & IIB",
                "Accounting I",
                "Computational Mathematics I",
                "Business Statistics I",
                "Economics IA (Microeconomics)",
                "Economics IB (Macroeconomics)",
                "Corporate Finance II",
                "Investment II",
                "Economics IIA & IIB",
                "Consumer Behaviour",
                "Principles of Marketing",
                "Insurance & Risk Management IIA & IIB",
                "Human Resources IIA & IIB (Labour Relations)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#c084fc", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🔬</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#4ade80", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Faculty of Science</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Science</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Physics I (PHYS1000A)",
                "Chemistry I",
                "Biology (BIOL1035A)",
                "Introductory Life Sciences I",
                "Molecular & Cell Biology II",
                "Biochemistry & Cell Biology III",
                "Genetics & Developmental Biology III",
                "Microbiology & Biotechnology III",
                "Mathematics I & II",
                "Statistics I (STAT2012A)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#4ade80", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

        </div>
        <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Don&apos;t see your module? WhatsApp us and we&apos;ll find the right tutor for you.
          </p>
          <a href="https://wa.me/27660397779?text=Hi%20MMT%2C%20I%20need%20help%20with%20a%20specific%20module." target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            WhatsApp Us →
          </a>
        </div>
      </section>


      {/* COURSES */}
      <section id="courses" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Degree Curricula</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Courses We Cover
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "560px" }}>
          A detailed breakdown of modules per degree and year. Find your exact course and book a tutor who specialises in it.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Actuarial Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📈</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · Science</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Actuarial Science</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>First Year</p>
                {["Actuarial Science I","Mathematical Statistics I","Algebra I","Calculus I","Economic Theory IA (Microeconomics)","Economic Theory IB (Macroeconomics)","Business Accounting I"].map(m=>(
                  <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Second Year</p>
                {["Actuarial Science II","Mathematical Statistics II","Abstract Mathematics","Differential Equations","Basic Analysis","Linear Algebra","Multivariable Calculus","Advanced Analysis"].map(m=>(
                  <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mechanical Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚙️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#818cf8", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Mechanical Engineering</h3>
              </div>
            </div>
            <p className="font-body" style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1rem" }}>First year: Common First Year Engineering (see Engineering tab). Second year onwards:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Electrical Engineering","Mathematics II","Mechanical Engineering Laboratory I","Introduction to Materials Science and Engineering","Applied Mechanics A & B","Computing Skills and Software Development","Engineering Design","Engineering Investigation","Engineering Tools I","Machine Elements","Fluid Mechanics I","Engineering Thermodynamics I","Mechatronics I"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#818cf8", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Electrical Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚡</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Electrical Engineering</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Data Structures and Algorithms","Electrical and Magnetic Systems","Software Development I","Signals and Systems I","Microprocessors","Electronics I","Electric Circuits","Mathematics II","Physics II (Electrical)","Vacation Work I (Electrical)"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Civil Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🏗️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#4ade80", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Civil Engineering</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Materials and Structures I & II","Numerical Methods","Probability Theory and Mathematical Statistics for Engineers","Introduction to Environmental Engineering","Engineering Computing","Engineering Economics and Infrastructure Planning","Geology for Civil Engineers","Mathematics II","Vacation Work (Civil)","Engineering Surveying"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#4ade80", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Construction Studies */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🏢</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#c084fc", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Construction Studies</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Introduction to Structures","Building Science I","Construction Technology II","Quantities and Specifications II","Site Management","Accounting Principles in Construction","Civil Engineering Theory I","Economics IA & IB","Engineering Surveying","Practical Experience II"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#c084fc", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

        </div>
        <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Don&apos;t see your degree or module? WhatsApp us — we&apos;ll find the right tutor.
          </p>
          <a href="https://wa.me/27660397779?text=Hi%20MMT%2C%20I%20need%20help%20with%20a%20specific%20module." target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            WhatsApp Us →
          </a>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Pricing</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Tutoring Packages
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
          Choose between per-session or monthly pricing. Monthly packages offer better value for consistent support throughout the semester.
        </p>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {packages.map((pkg, i) => (
            <div key={pkg.name} className={i === 1 ? "card-featured" : "card"} style={{ padding: "2rem" }}>
              {i === 1 && (
                <div style={{ position: "absolute", top: "-14px", left: "2rem" }}>
                  <span className="badge">Most Popular</span>
                </div>
              )}
              {i !== 1 && <span className="badge-muted">{pkg.tier}</span>}
 
              <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f1f5f9", marginTop: "1rem", marginBottom: "0.5rem" }}>
                {pkg.name}
              </h3>
              <p className="font-body" style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: "1.65", marginBottom: "1.25rem" }}>
                {pkg.ideal}
              </p>
 
              {/* Pricing table */}
              <div className="price-table">
                <div className="price-row">
                  <span className="price-label">In-person</span>
                  <span>
                    <span className="price-value" style={{ color: i === 1 ? "#22d3ee" : "#94a3b8" }}>{pkg.inPerson}</span>
                    <span className="price-unit">/ session</span>
                  </span>
                </div>
                <div className="price-row">
                  <span className="price-label">Online</span>
                  <span>
                    <span className="price-value" style={{ color: i === 1 ? "#22d3ee" : "#94a3b8" }}>{pkg.online}</span>
                    <span className="price-unit">/ session</span>
                  </span>
                </div>
                {pkg.monthly && (
                <div className="price-row price-row-highlight">
                  <span className="price-label" style={{ color: "#22d3ee" }}>Sessions</span>
                  <span>
                    <span className="price-value" style={{ color: "#22d3ee" }}>{pkg.monthly}</span>
                  </span>
                </div>
                )}
              </div>
 
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {pkg.features.map((f) => (
                  <li key={f} className="font-body" style={{ fontSize: "0.875rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ color: "#22d3ee", fontSize: "0.65rem" }}>◆</span> {f}
                  </li>
                ))}
              </ul>
 
              <a href={bookingFormLink} target="_blank" rel="noreferrer"
                className={i === 1 ? "btn-primary" : "btn-ghost"}
                style={{ marginTop: "2rem", width: "100%", justifyContent: "center" }}>
                Book Now
              </a>
            </div>
          ))}
        </div>
      </section>
 
      {/* TUTORS */}
      <section id="tutors" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-label">Our Team</div>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
            Meet the Tutors
          </h2>
          <div className="divider" />
          <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
            Every MMT tutor is a current or recent Wits student who has excelled in the exact modules they teach.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {tutors.map((t) => (
              <div key={t.name} className="card" style={{ padding: "2rem" }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(34,211,238,0.2)", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem", fontWeight: "700", fontFamily: "'Playfair Display', serif",
                  color: "#22d3ee", marginBottom: "1.25rem",
                }}>
                  {t.name[0]}
                </div>
                <span className="badge-muted" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{t.year}</span>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.25rem" }}>{t.name}</h3>
                <p className="font-body" style={{ fontSize: "0.8rem", color: "#22d3ee", marginBottom: "0.75rem", fontWeight: "500" }}>{t.subject}</p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: "1.65" }}>{t.bio}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Are you a high-achieving Wits student? Join the MMT tutor team.
            </p>
            <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
              Apply Now →
            </a>
          </div>
        </div>
      </section>
 
      {/* REVIEWS */}
      <section id="reviews" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Testimonials</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          What Students Say
        </h2>
        <div className="divider" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {reviews.map((r) => (
            <div key={r.name} className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="font-body" style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: "1.7", marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{r.quote}"
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <p className="font-body" style={{ fontSize: "0.875rem", fontWeight: "600", color: "#f1f5f9" }}>{r.name}</p>
                <p className="font-body" style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.15rem" }}>{r.programme} — Wits</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* CONTACT */}
      <section id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-label">Get in Touch</div>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
            Contact Us
          </h2>
          <div className="divider" />
          <p className="font-body" style={{ color: "#64748b", marginBottom: "2.5rem", maxWidth: "480px" }}>
            Reach out to book a session, ask about a specific module, or apply as a tutor. We respond within 24 hours.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", maxWidth: "800px" }}>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Fezile Nkosi (CEO)</p>
                <a href="tel:0660397779" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>066 039 7779</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Thandeka (COO)</p>
                <a href="tel:0655112416" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>065 511 2416</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Email</p>
                <a href="mailto:mastermindtutoringmmt@gmail.com" className="font-body" style={{ fontSize: "0.875rem", color: "#22d3ee", textDecoration: "none", fontWeight: "500" }}>
                  mastermindtutoringmmt@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>WhatsApp</p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>
                  Message Us
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary">Book a Session →</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
          </div>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "30px", height: "30px", background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: "700", color: "#060d1a", fontFamily: "'DM Sans', sans-serif",
              }}>M</div>
              <span className="font-display" style={{ fontWeight: "700", fontSize: "1rem", color: "#f1f5f9" }}>Mastermind Tutoring</span>
            </div>
            <p className="font-body" style={{ fontSize: "0.8rem", color: "#475569", maxWidth: "260px", lineHeight: "1.6" }}>
              Excellence made understandable. Serving Wits University students.
            </p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Leadership</p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "#64748b" }}>Fezile Nkosi — CEO</p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>Thandeka Valelo — COO</p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Quick Links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <a href="#packages" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Packages</a>
              <a href="#tutors" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Tutors</a>
              <a href={bookingFormLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Book a Session</a>
              <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Tutor Application</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.75rem", color: "#334155" }}>
            © {new Date().getFullYear()} Mastermind Tutoring (MMT). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
  const testimonials = [
    {
      quote: "I was failing Physics and genuinely considering dropping the module. After four sessions with my MMT tutor I passed my test with 68%. The way they explain things actually makes sense.",
      name: "K. Dlamini",
      detail: "BSc Physics · Wits",
    },
    {
      quote: "The tutors don\'t just give you answers — they make sure you actually understand. My Corporate Finance mark went from 44% to 71% in one semester.",
      name: "T. Mokoena",
      detail: "BCom Finance · Wits",
    },
    {
      quote: "I booked a session two days before my Linear Algebra test. Walked in confident and came out with a distinction. Highly recommend MMT to anyone struggling.",
      name: "L. Sithole",
      detail: "BSc Engineering · Wits",
    },
    {
      quote: "As a parent I was skeptical about online tutoring. But my son\'s accounting marks improved dramatically and he actually enjoys studying now. Worth every rand.",
      name: "Mrs. Nkosi",
      detail: "Parent · Grade 12 · St John\'s College",
    },
    {
      quote: "MMT helped me understand Actuarial Statistics when I thought I had no hope. The tutors are patient, professional and genuinely care about your results.",
      name: "A. Patel",
      detail: "BSc Actuarial Science · Wits",
    },
    {
      quote: "I used MMT for my daughter in Grade 11 Maths. Her teacher noticed the improvement immediately. We\'ve been booking sessions every week since.",
      name: "Mr. van der Berg",
      detail: "Parent · Grade 11 · Parktown Boys",
    },
  ];use client";
 
import { useState, useEffect } from "react";
 
export default function MastermindTutoringWebsite() {
  const bookingFormLink = "https://wa.me/27660397779?text=Hi%20MMT%2C%20I%27d%20like%20to%20book%20a%20tutoring%20session.";
  const tutorApplicationLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";
  const whatsappLink = "https://wa.me/27660397779";
 
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const packages = [
    {
      name: "Single Session",
      tier: "Pay as you go",
      inPerson: "R250",
      online: "R200",
      monthly: null,
      ideal: "Perfect for students who need targeted help before a test or exam.",
      features: [
        "1-hour focused session",
        "Any module we cover",
        "Online or in-person",
        "WhatsApp support after session",
      ],
    },
    {
      name: "Monthly Package",
      tier: "Most Popular",
      inPerson: "R1,760",
      online: "R1,440",
      monthly: "8 sessions / month",
      ideal: "Best value for students who want consistent, structured support throughout the semester.",
      features: [
        "8 sessions per month",
        "Dedicated tutor assigned",
        "Progress tracking",
        "Priority WhatsApp support",
      ],
    },
  ];
 
  const tutors = [
    {
      name: "Kagiso Mokoena",
      subject: "Linear Algebra · Business Statistics",
      year: "3rd Year — BSc Mathematics",
      bio: "Breaks down complex mathematical concepts into clear, structured frameworks. Specialises in first and second year quantitative modules across Engineering and Commerce.",
    },
    {
      name: "Zanele Moyo",
      subject: "Physics · APPM1014",
      year: "4th Year — BSc Physics",
      bio: "One of MMT\'s highest-rated tutors. Combines deep theoretical understanding with an exam-focused approach that has helped dozens of Wits students pass Phys1000A.",
    },
    {
      name: "Luyanda Ntuli",
      subject: "Corporate Finance · Taxation",
      year: "Honours — BCom Accounting",
      bio: "Specialist in Commerce and Accounting modules. Brings Honours-level insight to students tackling Corporate Finance II, Taxation 3 and advanced BCom modules.",
    },
  ];
 
  const reviews = [
    {
      name: "Aiden van der Merwe",
      programme: "Mechanical Engineering",
      quote: "MMT helped me finally understand the module I was struggling with. The tutor was sharp and explained things clearly.",
      rating: 5,
    },
    {
      name: "Priya Naidoo",
      programme: "BSc Science",
      quote: "Structured sessions, professional tutors, and real improvement before tests. Worth every rand.",
      rating: 5,
    },
    {
      name: "Sibusiso Mthembu",
      programme: "Chemical Engineering",
      quote: "Professional, focused, and effective. Exactly what I needed going into exams.",
      rating: 5,
    },
  ];
 
  const stats = [
    { value: "200+", label: "Students Supported" },
    { value: "15+", label: "Modules Covered" },
    { value: "90%", label: "Report Improved Marks" },
    { value: "Wits", label: "University Focus" },
  ];
 
  return (
    <div className="min-h-screen text-white" style={{ background: "#060d1a", fontFamily: "'Georgia', serif" }}>
 
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .nav-link {
          position: relative; font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
          letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: #22d3ee; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #22d3ee; color: #060d1a; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.875rem; letter-spacing: 0.05em;
          padding: 0.75rem 1.75rem; border-radius: 4px; text-decoration: none;
          transition: background 0.2s, transform 0.1s; cursor: pointer; border: none;
        }
        .btn-primary:hover { background: #67e8f9; transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: #e2e8f0; font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 0.875rem; letter-spacing: 0.05em;
          padding: 0.75rem 1.75rem; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.15); text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.1s; cursor: pointer;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; transform: translateY(-1px); }
        .card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; transition: border-color 0.3s, transform 0.3s;
        }
        .card:hover { border-color: rgba(34,211,238,0.3); transform: translateY(-3px); }
        .card-featured {
          background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.25);
          border-radius: 12px; position: relative; transition: border-color 0.3s, transform 0.3s;
        }
        .card-featured:hover { border-color: rgba(34,211,238,0.5); transform: translateY(-3px); }
        .badge {
          display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.3);
        }
        .badge-muted {
          display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.2);
        }
        .divider { width: 48px; height: 2px; background: #22d3ee; margin: 1.25rem 0; }
        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; color: #22d3ee; margin-bottom: 1rem;
        }
        .star { color: #22d3ee; font-size: 0.85rem; }
        .price-table { background: rgba(0,0,0,0.25); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 1.5rem; }
        .price-row { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .price-row:last-child { border-bottom: none; }
        .price-row-highlight { background: rgba(34,211,238,0.06); }
        .price-label { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
        .price-value { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem; }
        .price-unit { font-family: 'DM Sans', sans-serif; font-size: 0.68rem; color: #475569; margin-left: 0.25rem; }
        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 9999;
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
          top: -100px; right: -100px; pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
          bottom: 0; left: -100px; pointer-events: none;
        }
        .contact-item {
          display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .contact-item:hover { border-color: rgba(34,211,238,0.3); }
        .contact-icon {
          width: 40px; height: 40px; background: rgba(34,211,238,0.1);
          border: 1px solid rgba(34,211,238,0.2); border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
 
      <div className="noise-overlay" />
 
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        background: scrolled ? "rgba(6,13,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease", padding: "0 1.5rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "34px", height: "34px", background: "linear-gradient(135deg, #22d3ee, #0891b2)",
              borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem", fontWeight: "700", color: "#060d1a", fontFamily: "'DM Sans', sans-serif",
            }}>M</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700", fontSize: "1.1rem", color: "#f1f5f9", letterSpacing: "0.01em" }}>
              Mastermind Tutoring
            </span>
          </div>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <a href="#modules" className="nav-link">Modules</a>
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#packages" className="nav-link">Packages</a>
            <a href="#tutors" className="nav-link">Tutors</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8rem" }}>
            Book a Session
          </a>
        </div>
      </nav>
 
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "68px" }}>
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
          <div className="section-label">Wits University — Johannesburg</div>
          <h1 className="hero-title font-display" style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: "900", lineHeight: "1.05",
            color: "#f8fafc", maxWidth: "800px", marginBottom: "1.5rem",
          }}>
            Excellence made{" "}
            <span style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              understandable.
            </span>
          </h1>
          <p className="font-body" style={{ fontSize: "1.125rem", color: "#94a3b8", maxWidth: "540px", lineHeight: "1.75", marginBottom: "2.5rem" }}>
            Mastermind Tutoring connects Wits students with high-performing peer tutors across the most demanding academic modules. Professional. Structured. Results-driven.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary">Book a Session →</a>
            <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="btn-ghost">Apply as a Tutor</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "5rem", maxWidth: "600px" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: "1.75rem", fontWeight: "700", color: "#22d3ee" }}>{s.value}</div>
                <div className="font-body" style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 

      {/* MODULES */}
      <section id="modules" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">What We Cover</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Modules We Tutor
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
          We cover modules across all major faculties at Wits. If your module isn&apos;t listed, WhatsApp us — we&apos;ll find you a tutor.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>

          {/* Common First Year Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚙️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#818cf8", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · All Engineering Degrees</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Common First Year Engineering</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Engineering Chemistry",
                "Intro to Engineering Profession",
                "Engineering Analysis & Design IA & IB",
                "Engineering Mathematics IA & IB",
                "Engineering Physics IA & IB",
                "Applied Physics I",
                "Computing for Process Engineering (2nd yr)",
                "Engineering Chemistry IIA & IIB",
                "Process Engineering Fundamentals A & B",
                "Electrical Engineering",
                "Mathematics II",
                "Solid Mechanics (CIVN2008A)",
                "Thermodynamics · Fluid Mechanics",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#818cf8", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Computational & Applied Mathematics */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📐</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Science · FEBE</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Computational & Applied Maths</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Mathematical Methods & Modelling I (APPM1026A)",
                "Mechanics I (APPM1028A)",
                "Scientific Computing I (APPM1030A)",
                "Algebra I (MATH1034A)",
                "Calculus I (MATH1036A)",
                "Basic Analysis II (MATH2001A)",
                "Multivariable Calculus II (MATH2007A)",
                "Linear Algebra II (MATH2019A)",
                "Abstract Mathematics II (MATH2015A)",
                "Advanced Analysis II (MATH2016A)",
                "Intro to Mathematical Statistics II (STAT2012A)",
                "Mathematical Methods & Modelling II (APPM2021A)",
                "Mechanics II (APPM2023A)",
                "Scientific Computing II (APPM2025A)",
                "Basic Computer Organisation I (COMS1015A)",
                "Intro to Algorithms & Programming I (COMS1018A)",
                "Intro to Data Structures & Algorithms I (COMS1017A)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Accounting Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📊</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Accounting Science</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Accounting Information Systems",
                "Financial Accounting I, II, III",
                "Management Accounting & Finance II, III",
                "Taxation II, III",
                "Auditing II, III",
                "Business Enterprise Law",
                "Mercantile Law",
                "Information Systems Data Analytics II",
                "Economics IA (Microeconomics)",
                "Economics IB (Macroeconomics)",
                "Commercial Law I",
                "Computational Mathematics I",
                "Business Statistics I",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* BCom Accounting */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💼</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>BCom Accounting</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Accounting I & II",
                "Management Accounting & Finance II",
                "Taxation II",
                "Auditing II",
                "Business Enterprise Law",
                "Mercantile Law",
                "Information Systems Data Analytics II",
                "Fundamentals of Information Systems",
                "Information Systems IA",
                "Economics IA & IB",
                "Commercial Law I",
                "Computational Mathematics I",
                "Business Statistics I",
                "Human Resources IIA",
                "Principles of Marketing",
                "Consumer Behaviour",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Information Systems */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>💻</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#c084fc", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · CLM</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Information Systems</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Information Systems IA & IB",
                "Information Systems IIA & IIB",
                "Accounting I",
                "Computational Mathematics I",
                "Business Statistics I",
                "Economics IA (Microeconomics)",
                "Economics IB (Macroeconomics)",
                "Corporate Finance II",
                "Investment II",
                "Economics IIA & IIB",
                "Consumer Behaviour",
                "Principles of Marketing",
                "Insurance & Risk Management IIA & IIB",
                "Human Resources IIA & IIB (Labour Relations)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#c084fc", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🔬</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#4ade80", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Faculty of Science</p>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Science</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Physics I (PHYS1000A)",
                "Chemistry I",
                "Biology (BIOL1035A)",
                "Introductory Life Sciences I",
                "Molecular & Cell Biology II",
                "Biochemistry & Cell Biology III",
                "Genetics & Developmental Biology III",
                "Microbiology & Biotechnology III",
                "Mathematics I & II",
                "Statistics I (STAT2012A)",
              ].map(m => (
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#4ade80", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

        </div>
        <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Don&apos;t see your module? WhatsApp us and we&apos;ll find the right tutor for you.
          </p>
          <a href="https://wa.me/27660397779?text=Hi%20MMT%2C%20I%20need%20help%20with%20a%20specific%20module." target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            WhatsApp Us →
          </a>
        </div>
      </section>


      {/* COURSES */}
      <section id="courses" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Degree Curricula</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Courses We Cover
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "560px" }}>
          A detailed breakdown of modules per degree and year. Find your exact course and book a tutor who specialises in it.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Actuarial Science */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📈</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Commerce · Science</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Actuarial Science</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>First Year</p>
                {["Actuarial Science I","Mathematical Statistics I","Algebra I","Calculus I","Economic Theory IA (Microeconomics)","Economic Theory IB (Macroeconomics)","Business Accounting I"].map(m=>(
                  <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Second Year</p>
                {["Actuarial Science II","Mathematical Statistics II","Abstract Mathematics","Differential Equations","Basic Analysis","Linear Algebra","Multivariable Calculus","Advanced Analysis"].map(m=>(
                  <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "#fbbf24", fontSize: "0.5rem" }}>◆</span> {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mechanical Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚙️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#818cf8", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Mechanical Engineering</h3>
              </div>
            </div>
            <p className="font-body" style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1rem" }}>First year: Common First Year Engineering (see Engineering tab). Second year onwards:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Electrical Engineering","Mathematics II","Mechanical Engineering Laboratory I","Introduction to Materials Science and Engineering","Applied Mechanics A & B","Computing Skills and Software Development","Engineering Design","Engineering Investigation","Engineering Tools I","Machine Elements","Fluid Mechanics I","Engineering Thermodynamics I","Mechatronics I"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#818cf8", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Electrical Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⚡</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#22d3ee", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Electrical Engineering</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Data Structures and Algorithms","Electrical and Magnetic Systems","Software Development I","Signals and Systems I","Microprocessors","Electronics I","Electric Circuits","Mathematics II","Physics II (Electrical)","Vacation Work I (Electrical)"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22d3ee", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Civil Engineering */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🏗️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#4ade80", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Civil Engineering</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Materials and Structures I & II","Numerical Methods","Probability Theory and Mathematical Statistics for Engineers","Introduction to Environmental Engineering","Engineering Computing","Engineering Economics and Infrastructure Planning","Geology for Civil Engineers","Mathematics II","Vacation Work (Civil)","Engineering Surveying"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#4ade80", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

          {/* Construction Studies */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🏢</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.65rem", color: "#c084fc", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>FEBE · Engineering</p>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>Construction Studies</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem" }}>
              {["Introduction to Structures","Building Science I","Construction Technology II","Quantities and Specifications II","Site Management","Accounting Principles in Construction","Civil Engineering Theory I","Economics IA & IB","Engineering Surveying","Practical Experience II"].map(m=>(
                <div key={m} className="font-body" style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#c084fc", fontSize: "0.5rem" }}>◆</span> {m}
                </div>
              ))}
            </div>
          </div>

        </div>
        <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Don&apos;t see your degree or module? WhatsApp us — we&apos;ll find the right tutor.
          </p>
          <a href="https://wa.me/27660397779?text=Hi%20MMT%2C%20I%20need%20help%20with%20a%20specific%20module." target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            WhatsApp Us →
          </a>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Pricing</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Tutoring Packages
        </h2>
        <div className="divider" />
        <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
          Choose between per-session or monthly pricing. Monthly packages offer better value for consistent support throughout the semester.
        </p>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {packages.map((pkg, i) => (
            <div key={pkg.name} className={i === 1 ? "card-featured" : "card"} style={{ padding: "2rem" }}>
              {i === 1 && (
                <div style={{ position: "absolute", top: "-14px", left: "2rem" }}>
                  <span className="badge">Most Popular</span>
                </div>
              )}
              {i !== 1 && <span className="badge-muted">{pkg.tier}</span>}
 
              <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f1f5f9", marginTop: "1rem", marginBottom: "0.5rem" }}>
                {pkg.name}
              </h3>
              <p className="font-body" style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: "1.65", marginBottom: "1.25rem" }}>
                {pkg.ideal}
              </p>
 
              {/* Pricing table */}
              <div className="price-table">
                <div className="price-row">
                  <span className="price-label">In-person</span>
                  <span>
                    <span className="price-value" style={{ color: i === 1 ? "#22d3ee" : "#94a3b8" }}>{pkg.inPerson}</span>
                    <span className="price-unit">/ session</span>
                  </span>
                </div>
                <div className="price-row">
                  <span className="price-label">Online</span>
                  <span>
                    <span className="price-value" style={{ color: i === 1 ? "#22d3ee" : "#94a3b8" }}>{pkg.online}</span>
                    <span className="price-unit">/ session</span>
                  </span>
                </div>
                {pkg.monthly && (
                <div className="price-row price-row-highlight">
                  <span className="price-label" style={{ color: "#22d3ee" }}>Sessions</span>
                  <span>
                    <span className="price-value" style={{ color: "#22d3ee" }}>{pkg.monthly}</span>
                  </span>
                </div>
                )}
              </div>
 
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {pkg.features.map((f) => (
                  <li key={f} className="font-body" style={{ fontSize: "0.875rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ color: "#22d3ee", fontSize: "0.65rem" }}>◆</span> {f}
                  </li>
                ))}
              </ul>
 
              <a href={bookingFormLink} target="_blank" rel="noreferrer"
                className={i === 1 ? "btn-primary" : "btn-ghost"}
                style={{ marginTop: "2rem", width: "100%", justifyContent: "center" }}>
                Book Now
              </a>
            </div>
          ))}
        </div>
      </section>
 
      {/* TUTORS */}
      <section id="tutors" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-label">Our Team</div>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
            Meet the Tutors
          </h2>
          <div className="divider" />
          <p className="font-body" style={{ color: "#64748b", marginBottom: "3rem", maxWidth: "500px" }}>
            Every MMT tutor is a current or recent Wits student who has excelled in the exact modules they teach.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {tutors.map((t) => (
              <div key={t.name} className="card" style={{ padding: "2rem" }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(34,211,238,0.2)", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem", fontWeight: "700", fontFamily: "'Playfair Display', serif",
                  color: "#22d3ee", marginBottom: "1.25rem",
                }}>
                  {t.name[0]}
                </div>
                <span className="badge-muted" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{t.year}</span>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.25rem" }}>{t.name}</h3>
                <p className="font-body" style={{ fontSize: "0.8rem", color: "#22d3ee", marginBottom: "0.75rem", fontWeight: "500" }}>{t.subject}</p>
                <p className="font-body" style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: "1.65" }}>{t.bio}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.25rem 1.75rem", background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p className="font-body" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Are you a high-achieving Wits student? Join the MMT tutor team.
            </p>
            <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
              Apply Now →
            </a>
          </div>
        </div>
      </section>
 
      {/* REVIEWS */}
      <section id="reviews" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="section-label">Testimonials</div>
        <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          What Students Say
        </h2>
        <div className="divider" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {reviews.map((r) => (
            <div key={r.name} className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="font-body" style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: "1.7", marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{r.quote}"
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <p className="font-body" style={{ fontSize: "0.875rem", fontWeight: "600", color: "#f1f5f9" }}>{r.name}</p>
                <p className="font-body" style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.15rem" }}>{r.programme} — Wits</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* CONTACT */}
      <section id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-label">Get in Touch</div>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
            Contact Us
          </h2>
          <div className="divider" />
          <p className="font-body" style={{ color: "#64748b", marginBottom: "2.5rem", maxWidth: "480px" }}>
            Reach out to book a session, ask about a specific module, or apply as a tutor. We respond within 24 hours.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", maxWidth: "800px" }}>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Fezile Nkosi (CEO)</p>
                <a href="tel:0660397779" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>066 039 7779</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Thandeka (COO)</p>
                <a href="tel:0655112416" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>065 511 2416</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Email</p>
                <a href="mailto:mastermindtutoringmmt@gmail.com" className="font-body" style={{ fontSize: "0.875rem", color: "#22d3ee", textDecoration: "none", fontWeight: "500" }}>
                  mastermindtutoringmmt@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>WhatsApp</p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", fontWeight: "500" }}>
                  Message Us
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={bookingFormLink} target="_blank" rel="noreferrer" className="btn-primary">Book a Session →</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Us</a>
          </div>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "30px", height: "30px", background: "linear-gradient(135deg, #22d3ee, #0891b2)",
                borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: "700", color: "#060d1a", fontFamily: "'DM Sans', sans-serif",
              }}>M</div>
              <span className="font-display" style={{ fontWeight: "700", fontSize: "1rem", color: "#f1f5f9" }}>Mastermind Tutoring</span>
            </div>
            <p className="font-body" style={{ fontSize: "0.8rem", color: "#475569", maxWidth: "260px", lineHeight: "1.6" }}>
              Excellence made understandable. Serving Wits University students.
            </p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Leadership</p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "#64748b" }}>Fezile Nkosi — CEO</p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>Thandeka Valelo — COO</p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Quick Links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <a href="#packages" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Packages</a>
              <a href="#tutors" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Tutors</a>
              <a href={bookingFormLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Book a Session</a>
              <a href={tutorApplicationLink} target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Tutor Application</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.75rem", color: "#334155" }}>
            © {new Date().getFullYear()} Mastermind Tutoring (MMT). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}