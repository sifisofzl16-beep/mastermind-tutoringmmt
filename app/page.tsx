"use client";
 
import { useState, useEffect } from "react";
 
export default function MastermindTutoringWebsite() {
  const bookingFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeFR9P04-aA_vJJIEukzNpAygBJl8CHMeuaDZIjaN_tiQrwlQ/viewform";
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
      name: "Foundation",
      tier: "Starter",
      inPerson: "R300",
      online: "R250",
      monthly: "From R1,000",
      ideal: "First-year students building core fundamentals and academic confidence.",
      features: [
        "First-year & introductory modules",
        "Concept building & weekly support",
        "Assignment & homework guidance",
        "WhatsApp support between sessions",
      ],
    },
    {
      name: "Momentum",
      tier: "Most Popular",
      inPerson: "R350",
      online: "R300",
      monthly: "From R2,000",
      ideal: "Second-year students needing consistent, structured academic support.",
      features: [
        "Core technical modules",
        "Past paper & test prep focus",
        "Test and exam preparation",
        "Priority academic support",
      ],
    },
    {
      name: "Mastery",
      tier: "Advanced",
      inPerson: "R450",
      online: "R380",
      monthly: "From R3,000",
      ideal: "Advanced modules requiring deep understanding and high-performance support.",
      features: [
        "Final-year & advanced modules",
        "Personalised study planning",
        "Deep problem-solving sessions",
        "Extended support and revision guidance",
      ],
    },
  ];
 
  const tutors = [
    {
      name: "Lethabo Mokoena",
      subject: "Engineering Mathematics & Calculus",
      year: "3rd Year — BSc Engineering",
      bio: "Helps first-year students build the problem-solving confidence they need to succeed in demanding engineering programmes.",
    },
    {
      name: "Jason van der Merwe",
      subject: "Thermodynamics & Fluid Mechanics",
      year: "4th Year — Mechanical Engineering",
      bio: "Specialist in the modules most students fear. Breaks down complex systems into logical, understandable frameworks.",
    },
    {
      name: "Priyesh Naidoo",
      subject: "Physics & Chemistry",
      year: "3rd Year — BSc Science",
      bio: "Combines strong theoretical grounding with an exam-focused approach that consistently helps students improve their marks.",
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
                <div className="price-row price-row-highlight">
                  <span className="price-label" style={{ color: "#22d3ee" }}>Monthly</span>
                  <span>
                    <span className="price-value" style={{ color: "#22d3ee" }}>{pkg.monthly}</span>
                    <span className="price-unit">/ month</span>
                  </span>
                </div>
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
                <p className="font-body" style={{ fontSize: "0.7rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Fezile (Founder)</p>
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
            <p className="font-body" style={{ fontSize: "0.85rem", color: "#64748b" }}>Fezile Sifiso Nkosi — Founder</p>
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