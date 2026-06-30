"use client";

import { useState, useEffect, useRef } from "react";

export default function MastermindTutoringWebsite() {
  const waLink = "https://wa.me/27660397779?text=Hi%20MMT%2C%20I%27d%20like%20to%20book%20a%20tutoring%20session.";
  const tutorLink = "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("modules");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [moduleSearch, setModuleSearch] = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const modules = {
    "Common Engineering": ["Engineering Mathematics IA & IB","Engineering Physics IA & IB","Engineering Chemistry","Applied Physics I","Engineering Analysis & Design IA & IB","Introduction to Engineering Profession"],
    "Mechanical Eng": ["Applied Mechanics A & B","Machine Elements","Fluid Mechanics I","Engineering Thermodynamics I","Mechatronics I","Engineering Design","Materials Science","Computing Skills & Software Dev"],
    "Electrical Eng": ["Electric Circuits","Electronics I","Electrical & Magnetic Systems","Signals & Systems I","Microprocessors","Software Development I","Data Structures & Algorithms","Physics II (Electrical)"],
    "Civil Eng": ["Materials & Structures I & II","Numerical Methods","Environmental Engineering","Engineering Computing","Geology for Civil Engineers","Engineering Surveying","Engineering Economics"],
    "Construction Studies": ["Introduction to Structures","Building Science I","Construction Technology II","Site Management","Civil Engineering Theory I","Quantities & Specifications II","Accounting in Construction"],
    "Computational Maths": ["Mathematical Methods I & II (APPM)","Mechanics I & II (APPM)","Scientific Computing I & II","Algebra I","Calculus I","Linear Algebra II","Multivariable Calculus","Basic & Advanced Analysis"],
    "Actuarial Science": ["Actuarial Science I & II","Mathematical Statistics I & II","Abstract Mathematics","Differential Equations","Basic Analysis","Economic Theory IA & IB","Business Accounting I"],
    "Accounting Science": ["Financial Accounting I, II, III","Management Accounting II, III","Taxation II, III","Auditing II, III","Business Enterprise Law","Mercantile Law","Commercial Law I","Business Statistics I"],
    "BCom Accounting": ["Accounting I & II","Management Accounting II","Taxation II","Auditing II","Fundamentals of Information Systems","IS Data Analytics II","Consumer Behaviour","Principles of Marketing"],
    "Information Systems": ["Information Systems IA, IB, IIA, IIB","Corporate Finance II","Investment II","Economics IA & IB","IS Data Analytics II","Human Resources IIA & IIB","Insurance & Risk Management"],
    "Commerce General": ["Business Statistics (STAT1006)","Corporate Finance II (FINA3002)","Economics I & II","Financial Mathematics","Quantitative Methods","Investment Management","Business Law"],
    "Science": ["Physics I (PHYS1000A)","Chemistry I","Biology (BIOL1035A)","Molecular & Cell Biology II","Biochemistry III","Genetics & Dev Biology III","Mathematics I & II","Statistics I"],
  };

  const allModules = Object.values(modules).flat();
  const filteredModules = moduleSearch.length > 1
    ? allModules.filter(m => m.toLowerCase().includes(moduleSearch.toLowerCase()))
    : [];

  const testimonials = [
    { quote: "I was failing Physics and nearly dropped the module. After four MMT sessions I passed with 68%. The way they explain things actually makes sense.", name: "K. Dlamini", detail: "BSc Physics · Wits" },
    { quote: "Corporate Finance was destroying my average. MMT had me go from 44% to 71% in one semester. Worth every rand of the monthly package.", name: "T. Mokoena", detail: "BCom Finance · Wits" },
    { quote: "Booked two days before my Linear Algebra test. Walked in confident and came out with a distinction. The in-person sessions are next level.", name: "L. Sithole", detail: "BSc Mechanical Engineering · Wits" },
    { quote: "I was repeating Engineering Maths for the second time. The MMT tutor explained it differently from my lecturer and it finally clicked. Passed comfortably.", name: "S. Mahlangu", detail: "BSc Electrical Engineering · Wits" },
    { quote: "Business Statistics had me completely lost. Three sessions with MMT and I understood the whole semester in one weekend. Wrote a 74%.", name: "N. Zwane", detail: "BCom Accounting · Wits" },
    { quote: "The monthly in-person package is genuinely the best investment I've made at Wits. My tutor knows the module inside out and pushes me every session.", name: "R. Khumalo", detail: "BSc Civil Engineering · Wits" },
    { quote: "I was on the verge of academic exclusion. MMT helped me pass three modules in one semester. I can't explain how much that means to me.", name: "B. Ndlovu", detail: "BCom Information Systems · Wits" },
    { quote: "Taxation 3 is brutal. My MMT tutor had past papers, notes, and a study plan ready from session one. I passed with 66% when I expected to fail.", name: "A. Shaik", detail: "BCom Accounting Science · Wits" },
    { quote: "I tried YouTube, I tried study groups. Nothing worked until MMT. The in-person sessions feel like private coaching — focused, efficient, no time wasted.", name: "C. van Wyk", detail: "BSc Chemical Engineering · Wits" },
    { quote: "Solid Mechanics was a nightmare. My tutor broke down every concept from first principles and made me do the problems myself until I got it. That approach works.", name: "M. Sithole", detail: "BSc Civil Engineering · Wits" },
    { quote: "I booked the monthly in-person package and honestly it changed my semester. Having the same tutor every week who knows where you left off is completely different from random sessions.", name: "P. Dube", detail: "BCom Accounting · Wits" },
    { quote: "Management Accounting nearly ended my degree. MMT assigned me a tutor in Honours — she knew every trick the lecturers use in tests. Passed with 61%.", name: "Z. Motha", detail: "BCom Accounting Science · Wits" },
    { quote: "As a second-year Mechanical Engineering student the workload is intense. MMT helped me keep up with Applied Mechanics and Thermodynamics at the same time.", name: "D. Ferreira", detail: "BSc Mechanical Engineering · Wits" },
    { quote: "I thought I was just bad at maths. Turns out I had gaps from first year that nobody helped me fix. MMT found them in session one and we worked through everything.", name: "L. Moagi", detail: "BSc Engineering · Wits" },
    { quote: "Economics IA was deceptively hard. The concepts seemed simple but the application in tests was different. My tutor prepared me specifically for how Wits examines it.", name: "T. Cele", detail: "BCom Information Systems · Wits" },
    { quote: "The free Sunday classes are what got me started. I showed up once, liked how it was run, and signed up for the monthly package the same day.", name: "O. Nkosi", detail: "BSc Chemical Engineering · Wits" },
    { quote: "Electric Circuits is where most Electrical Engineering students struggle hardest. My MMT tutor had a system for every type of question. I stopped guessing and started solving.", name: "K. Molefe", detail: "BSc Electrical Engineering · Wits" },
    { quote: "Auditing II felt impossible. My tutor had a framework for answering questions that the textbook never gives you. I used it in my exam and it worked perfectly.", name: "S. Ngcobo", detail: "BCom Accounting Science · Wits" },
    { quote: "I was sceptical because my previous tutor just read off slides. MMT is completely different — they explain, they question you, they make you think. That's what learning is.", name: "F. Jacobs", detail: "BSc Mechanical Engineering · Wits" },
    { quote: "Three modules, one semester, MMT for all of them. Corporate Finance, Business Stats and Economics. My GPA went from 58% to 71%. That's the honest truth.", name: "A. Radebe", detail: "BCom Finance · Wits" },
  ];

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
        .gold-dim { color: #8a6f2e; }
        .card-dark {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .card-dark:hover { border-color: rgba(201,168,76,0.2); transform: translateY(-4px); }
        .tab-btn {
          font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 500;
          padding: 0.5rem 1.25rem; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08);
          background: transparent; color: #64748b; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .tab-btn.active { background: rgba(201,168,76,0.12); color: #c9a84c; border-color: rgba(201,168,76,0.3); }
        .tab-btn:hover:not(.active) { color: #94a3b8; border-color: rgba(255,255,255,0.15); }
        .nav-a { font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 500; color: #64748b; transition: color 0.2s; letter-spacing: 0.02em; }
        .nav-a:hover { color: #c9a84c; }
        .module-pill {
          font-family: 'Inter', sans-serif; font-size: 0.78rem; color: #94a3b8;
          padding: 0.4rem 0.85rem; border-radius: 100px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
        }
        .module-pill:hover { color: #c9a84c; border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.05); }
        .step-num {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: #c9a84c;
          flex-shrink: 0;
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
        .search-input {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 0.75rem 1rem; color: #e2e8f0; font-family: 'Inter', sans-serif;
          font-size: 0.9rem; outline: none; transition: border-color 0.2s;
        }
        .search-input:focus { border-color: rgba(201,168,76,0.4); }
        .search-input::placeholder { color: #475569; }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; line-height: 1.1 !important; }
          .hide-mobile { display: none !important; }
          .stack-mobile { flex-direction: column !important; }
          .full-mobile { width: 100% !important; }
        }
      `}</style>

      {/* ── STICKY WA BUTTON ───────────────── */}
      <a href={waLink} target="_blank" rel="noreferrer" className="sticky-wa">
        <span>💬</span> Book Now
      </a>

      {/* ── NAV ───────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s", background: scrolled ? "rgba(6,8,15,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" className="syne" style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "0.04em" }}>
            MMT<span className="gold">.</span>
          </a>
          <div className="hide-mobile" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {["modules","courses","highschool","packages","tutors","contact"].map(s => (
              <a key={s} href={`#${s}`} className="nav-a" style={{ textTransform: "capitalize" }}>{s}</a>
            ))}
            <a href="/bursaries" className="nav-a" style={{ color: "#c9a84c" }}>Bursaries</a>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold hide-mobile" style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}>
            Book a Session
          </a>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="hide-mobile" style={{ display: "none" }}>☰</button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 2rem" }}>
        {/* Background elements */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", top: "20%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }}/>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }}/>

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "8rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "780px" }}>
            <div className="label-tag" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "24px", height: "1px", background: "#c9a84c", display: "inline-block" }}/>
              Wits University · Johannesburg
            </div>

            <h1 className="syne hero-title" style={{ fontSize: "5rem", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              Your marks<br />
              <span style={{ WebkitTextStroke: "1px rgba(201,168,76,0.6)", color: "transparent" }}>don&apos;t define</span><br />
              your potential.
            </h1>

            <p className="inter" style={{ fontSize: "1.15rem", color: "#64748b", lineHeight: "1.8", maxWidth: "520px", marginBottom: "3rem" }}>
              MMT connects Wits students with peer tutors who actually know the modules — not generalists, not AI. Real students who passed the same tests you&apos;re studying for right now.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold">
                📲 Book a Session — WhatsApp
              </a>
              <a href="#modules" className="btn-outline">
                See Modules →
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
              {[["200+","Students"], ["37+","Modules"], ["90%","Improved Marks"], ["R0","Free Sundays"]].map(([v, l]) => (
                <div key={l}>
                  <p className="syne" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#c9a84c", lineHeight: 1 }}>{v}</p>
                  <p className="inter" style={{ fontSize: "0.78rem", color: "#475569", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span className="inter" style={{ fontSize: "0.65rem", color: "#374151", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, #c9a84c, transparent)" }}/>
        </div>
      </section>

      {/* ── PROBLEM SECTION ───────────────── */}
      <section style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Sound familiar?</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "3.5rem", maxWidth: "500px", lineHeight: 1.15 }}>
            Every Wits student knows this feeling.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              ["😮‍💨", "You sit through lectures and understand nothing", "The lecturer moves too fast and you're too embarrassed to ask for the third time."],
              ["📉", "Your test results don't reflect how hard you studied", "You put in the hours but the marks don't show it. Something isn't clicking."],
              ["⏰", "Exams are in two weeks and you're already behind", "The semester crept up on you. There's too much to cover and not enough time."],
              ["🤷", "You don't know where to start", "You open the textbook, read the same paragraph four times, and close it again."],
            ].map(([icon, title, sub]) => (
              <div key={title} className="card-dark" style={{ padding: "2rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{icon}</span>
                <h3 className="syne" style={{ fontSize: "1rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>{title}</h3>
                <p className="inter" style={{ fontSize: "0.85rem", color: "#475569", lineHeight: "1.7" }}>{sub}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", padding: "2rem 2.5rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p className="syne" style={{ fontSize: "1.3rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.4rem" }}>This is exactly what MMT exists to fix.</p>
              <p className="inter" style={{ fontSize: "0.9rem", color: "#475569" }}>One session with the right tutor changes everything.</p>
            </div>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold">Book Now — WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────── */}
      <section style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>The Process</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "3.5rem", lineHeight: 1.15 }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              ["1", "WhatsApp us your module", "Tell us what you need help with. We respond within minutes — not hours."],
              ["2", "Get matched to a tutor", "We assign you a tutor who has passed that specific module and knows it deeply."],
              ["3", "Book your first session", "Online or in-person. Flexible scheduling. First session can happen within 24 hours."],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div className="step-num">{num}</div>
                <div>
                  <h3 className="syne" style={{ fontSize: "1rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.6rem" }}>{title}</h3>
                  <p className="inter" style={{ fontSize: "0.85rem", color: "#475569", lineHeight: "1.7" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", padding: "1.5rem 2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.5rem" }}>🌅</span>
            <div>
              <p className="inter" style={{ fontWeight: "600", color: "#f1f5f9", fontSize: "0.9rem" }}>Free Sunday Classes — every week</p>
              <p className="inter" style={{ color: "#475569", fontSize: "0.82rem" }}>No booking, no payment. Just show up. Group sessions covering the most requested modules.</p>
            </div>
            <a href={waLink} target="_blank" rel="noreferrer" className="inter" style={{ marginLeft: "auto", color: "#c9a84c", fontSize: "0.85rem", fontWeight: "600" }}>Join Sunday Class →</a>
          </div>
        </div>
      </section>

      {/* ── MODULES ───────────────────────── */}
      <section id="modules" style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>What we cover</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.75rem", lineHeight: 1.15 }}>Modules</h2>
          <div className="divider-gold"/>
          <p className="inter" style={{ color: "#475569", marginBottom: "2.5rem", maxWidth: "480px", fontSize: "0.95rem", lineHeight: "1.7" }}>
            We cover 37+ modules across all four Wits faculties. Search below or browse by faculty.
          </p>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "2rem", maxWidth: "400px" }}>
            <input className="search-input" value={moduleSearch} onChange={e => setModuleSearch(e.target.value)} placeholder="Search any module e.g. Phys1000A, Corporate Finance..."/>
            {filteredModules.length > 0 && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", marginTop: "0.5rem", padding: "0.75rem", zIndex: 10, maxHeight: "200px", overflowY: "auto" }}>
                {filteredModules.map(m => (
                  <div key={m} className="inter" style={{ padding: "0.5rem 0.75rem", color: "#94a3b8", fontSize: "0.85rem", borderRadius: "6px", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Faculty tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {Object.keys(modules).map(tab => (
              <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          {/* Module pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {modules[activeTab as keyof typeof modules]?.map(m => (
              <a key={m} href={waLink} target="_blank" rel="noreferrer" className="module-pill">{m}</a>
            ))}
          </div>

          <p className="inter" style={{ color: "#374151", fontSize: "0.8rem", marginTop: "1.5rem" }}>
            Click any module to book via WhatsApp · Don&apos;t see yours?{" "}
            <a href={waLink} target="_blank" rel="noreferrer" style={{ color: "#c9a84c" }}>Message us</a>
          </p>
        </div>
      </section>

      {/* ── COURSES ───────────────────────── */}
      <section id="courses" style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Degree Curricula</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.75rem", lineHeight: 1.15 }}>Courses</h2>
          <div className="divider-gold"/>
          <p className="inter" style={{ color: "#475569", marginBottom: "3rem", maxWidth: "480px", fontSize: "0.95rem", lineHeight: "1.7" }}>
            Detailed module breakdowns per degree and year. Find your exact curriculum.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "📈", color: "#c9a84c", label: "Commerce · Science", title: "Actuarial Science", years: [
                { year: "Year 1", items: ["Actuarial Science I","Mathematical Statistics I","Algebra I","Calculus I","Economic Theory IA & IB","Business Accounting I"] },
                { year: "Year 2", items: ["Actuarial Science II","Mathematical Statistics II","Abstract Mathematics","Differential Equations","Basic Analysis","Linear Algebra","Multivariable Calculus","Advanced Analysis"] },
              ]},
              { icon: "⚙️", color: "#818cf8", label: "FEBE · Engineering", title: "Mechanical Engineering", years: [
                { year: "Year 2+", items: ["Applied Mechanics A & B","Machine Elements","Fluid Mechanics I","Engineering Thermodynamics I","Mechatronics I","Engineering Design","Materials Science","Engineering Investigation","Computing Skills & Software Dev","Engineering Tools I"] },
              ]},
              { icon: "⚡", color: "#22d3ee", label: "FEBE · Engineering", title: "Electrical Engineering", years: [
                { year: "Year 2+", items: ["Electric Circuits","Electronics I","Electrical & Magnetic Systems","Signals & Systems I","Microprocessors","Software Development I","Data Structures & Algorithms","Physics II (Electrical)","Mathematics II"] },
              ]},
              { icon: "🏗️", color: "#4ade80", label: "FEBE · Engineering", title: "Civil Engineering", years: [
                { year: "Modules", items: ["Materials & Structures I & II","Numerical Methods","Introduction to Environmental Engineering","Engineering Computing","Geology for Civil Engineers","Engineering Surveying","Engineering Economics","Probability Theory & Stats for Engineers"] },
              ]},
              { icon: "🏢", color: "#c084fc", label: "FEBE · Engineering", title: "Construction Studies", years: [
                { year: "Modules", items: ["Introduction to Structures","Building Science I","Construction Technology II","Site Management","Civil Engineering Theory I","Quantities & Specifications II","Accounting in Construction","Economics IA & IB","Engineering Surveying"] },
              ]},
            ].map(course => (
              <div key={course.title} className="card-dark" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "42px", height: "42px", background: `${course.color}15`, border: `1px solid ${course.color}30`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{course.icon}</div>
                  <div>
                    <p className="inter" style={{ fontSize: "0.62rem", color: course.color, fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" }}>{course.label}</p>
                    <h3 className="syne" style={{ fontSize: "1rem", fontWeight: "700", color: "#f1f5f9" }}>{course.title}</h3>
                  </div>
                </div>
                {course.years.map(y => (
                  <div key={y.year} style={{ marginBottom: "1rem" }}>
                    <p className="inter" style={{ fontSize: "0.65rem", color: course.color, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>{y.year}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {y.items.map(item => (
                        <span key={item} className="inter" style={{ fontSize: "0.75rem", color: "#64748b", padding: "0.25rem 0.6rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "4px" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── HIGH SCHOOL ─────────────────── */}
      <section id="highschool" style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div className="label-tag" style={{ marginBottom: "1rem" }}>For Parents</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", lineHeight: 1.1, marginBottom: "1rem" }}>
            Your child is capable of<br/>
            <span style={{ color: "#c9a84c" }}>more than their marks suggest.</span>
          </h2>
          <div className="divider-gold"/>
          <p className="inter" style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.8", maxWidth: "600px", marginBottom: "3.5rem" }}>
            Every parent has felt it — watching your child study for hours, genuinely trying, and still coming home with results that don&apos;t reflect their effort. It&apos;s not a talent problem. It&apos;s not a work ethic problem. It&apos;s a support problem. The right tutor, explaining the right concept in the right way, changes everything.
          </p>

          {/* Emotional pain points */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
            {[
              { icon: "😔", title: "They study but the marks don't move", body: "Your child is putting in the hours. The problem isn't effort — it's that nobody has shown them how to study this subject specifically." },
              { icon: "⏰", title: "June exams are approaching fast", body: "The academic calendar doesn't slow down. Every week without targeted support is a week harder to recover from." },
              { icon: "🎓", title: "University acceptance depends on this year", body: "For Grade 11 and 12 students, this isn't just about passing. It's about keeping the right doors open." },
              { icon: "💬", title: "They won't ask their teacher for help", body: "Most teenagers are too proud or too embarrassed. A peer tutor — someone closer in age — changes that dynamic completely." },
            ].map(p => (
              <div key={p.title} className="card-dark" style={{ padding: "1.75rem" }}>
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{p.icon}</span>
                <h3 className="syne" style={{ fontSize: "0.95rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.6rem" }}>{p.title}</h3>
                <p className="inter" style={{ fontSize: "0.83rem", color: "#475569", lineHeight: "1.7" }}>{p.body}</p>
              </div>
            ))}
          </div>

          {/* The MMT difference */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem", alignItems: "center" }}>
            <div>
              <div className="label-tag" style={{ marginBottom: "0.75rem" }}>The MMT difference</div>
              <h3 className="syne" style={{ fontSize: "2rem", fontWeight: "800", color: "#f1f5f9", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Not a tutoring agency.<br/>A results company.
              </h3>
              <p className="inter" style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Every MMT tutor is a current or recent top-performing university student. They&apos;ve sat in the same classrooms, written the same papers, and cracked the same problems your child is facing right now. They don&apos;t just know the content — they know exactly where students get stuck and why.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Tutors vetted and trained by MMT before their first session",
                  "Structured sessions — not just homework help",
                  "Progress tracked so you always know where your child stands",
                  "WhatsApp communication — direct line to your child's tutor",
                  "Flexible scheduling around school and extra-murals",
                ].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "#c9a84c", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.6" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { school: "St John's College", area: "Houghton" },
                { school: "King Edward VII", area: "Houghton" },
                { school: "Parktown Boys High", area: "Parktown" },
                { school: "Parktown Girls High", area: "Parktown" },
                { school: "Sacred Heart College", area: "Observatory" },
                { school: "Greenside High School", area: "Greenside" },
                { school: "Northcliff High School", area: "Northcliff" },
              ].map(s => (
                <div key={s.school} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <span className="inter" style={{ fontSize: "0.88rem", color: "#f1f5f9", fontWeight: "500" }}>{s.school}</span>
                  <span className="inter" style={{ fontSize: "0.75rem", color: "#374151" }}>{s.area}</span>
                </div>
              ))}
              <p className="inter" style={{ fontSize: "0.75rem", color: "#374151", textAlign: "center" }}>And all surrounding Johannesburg schools</p>
            </div>
          </div>

          {/* Subjects */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="label-tag" style={{ marginBottom: "1rem" }}>Subjects we cover</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {[
                { subject: "Mathematics", icon: "📐", desc: "Pure Maths and Maths Literacy. From algebra foundations to calculus. The subject most students need help with most.", grade: "Grades 8–12", color: "#c9a84c" },
                { subject: "Physical Science", icon: "⚗️", desc: "Physics and Chemistry. Concepts, calculations, and the kind of exam technique that turns 50% into 75%.", grade: "Grades 10–12", color: "#818cf8" },
                { subject: "Accounting", icon: "📊", desc: "From basic ledgers to financial statements. The subject where small concept gaps compound into big mark losses.", grade: "Grades 10–12", color: "#22d3ee" },
                { subject: "English", icon: "✍️", desc: "Home Language and First Additional. Essays, language, literature. The subject that affects every other subject.", grade: "Grades 8–12", color: "#4ade80" },
                { subject: "Economics", icon: "📈", desc: "Micro and macro. Concepts that make sense in theory but lose students in application.", grade: "Grades 10–12", color: "#f59e0b" },
                { subject: "Life Sciences", icon: "🔬", desc: "Biology from cells to ecosystems. Strong memory work combined with understanding gets the marks.", grade: "Grades 10–12", color: "#ec4899" },
                { subject: "Geography", icon: "🌍", desc: "Physical and human geography. Maps, case studies, and the structured answers examiners want to see.", grade: "Grades 10–12", color: "#06b6d4" },
                { subject: "Business Studies", icon: "💼", desc: "Theory, application, scenarios. The subject where exam technique matters as much as content knowledge.", grade: "Grades 10–12", color: "#a78bfa" },
              ].map(s => (
                <div key={s.subject} className="card-dark" style={{ padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                      <h3 className="syne" style={{ fontSize: "0.95rem", fontWeight: "700", color: "#f1f5f9" }}>{s.subject}</h3>
                      <span className="inter" style={{ fontSize: "0.65rem", color: s.color, background: `${s.color}15`, padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{s.grade}</span>
                    </div>
                    <p className="inter" style={{ fontSize: "0.8rem", color: "#475569", lineHeight: "1.6" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="label-tag" style={{ marginBottom: "1rem" }}>High School Pricing</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { subject: "Maths / Physical Science", per: "R350/hr", monthly: "R2,400/mo" },
                { subject: "Accounting / Economics", per: "R320/hr", monthly: "R2,200/mo" },
                { subject: "English / Languages", per: "R300/hr", monthly: "R2,000/mo" },
                { subject: "All other subjects", per: "R280/hr", monthly: "R1,800/mo" },
              ].map((p, i) => (
                <div key={p.subject} style={{ padding: "1.25rem 1.5rem", background: i === 0 ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${i === 0 ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius: "12px" }}>
                  <p className="inter" style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "0.4rem" }}>{p.subject}</p>
                  <p className="syne" style={{ fontSize: "1.4rem", fontWeight: "800", color: "#c9a84c" }}>{p.per}</p>
                  <p className="inter" style={{ fontSize: "0.75rem", color: "#374151" }}>{p.monthly} · 8 sessions</p>
                </div>
              ))}
            </div>
            <p className="inter" style={{ fontSize: "0.8rem", color: "#374151" }}>
              Online sessions: R50 discount per session &nbsp;·&nbsp; First session: R150 Academic Assessment (gap analysis + personalised study plan)
            </p>
          </div>

          {/* Parent CTA */}
          <div style={{ padding: "3rem", background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", textAlign: "center" }}>
            <h3 className="syne" style={{ fontSize: "2rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
              Your child&apos;s next exam<br/>doesn&apos;t have to be a gamble.
            </h3>
            <p className="inter" style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 2rem" }}>
              WhatsApp us today. Tell us your child&apos;s grade and subject. We&apos;ll match them with the right tutor and have a session booked within 24 hours.
            </p>
            <a href="https://wa.me/27660397779?text=Hi%20MMT%2C%20I%27m%20a%20parent%20looking%20for%20a%20high%20school%20tutor." target="_blank" rel="noreferrer" className="btn-gold" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
              📲 Book via WhatsApp — 066 039 7779
            </a>
          </div>

        </div>
      </section>

      {/* ── PACKAGES ──────────────────────── */}
      <section id="packages" style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Pricing</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.75rem", lineHeight: 1.15 }}>Simple, transparent pricing</h2>
          <div className="divider-gold"/>
          <p className="inter" style={{ color: "#475569", marginBottom: "3rem", fontSize: "0.95rem", lineHeight: "1.7" }}>No hidden fees. No contracts. Book one session or commit to a month — your choice.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { name: "Single Session", tag: "Pay as you go", price: "R200", priceNote: "online / R250 in-person", features: ["1-hour focused session","Any module we cover","Online or in-person","WhatsApp support after"], highlight: false },
              { name: "Monthly Package", tag: "Most Popular", price: "R1,440", priceNote: "online / R1,760 in-person", features: ["8 sessions per month","Dedicated tutor assigned","Flexible scheduling","Priority WhatsApp support"], highlight: true },
            ].map(pkg => (
              <div key={pkg.name} style={{ padding: "2.5rem", borderRadius: "16px", background: pkg.highlight ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${pkg.highlight ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`, position: "relative" }}>
                {pkg.highlight && <div style={{ position: "absolute", top: "-1px", left: "2rem", background: "linear-gradient(135deg,#c9a84c,#e8c96e)", color: "#06080f", fontSize: "0.65rem", fontWeight: "700", fontFamily: "Syne,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.75rem", borderRadius: "0 0 6px 6px" }}>Most Popular</div>}
                <p className="inter" style={{ fontSize: "0.7rem", color: "#475569", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{pkg.tag}</p>
                <h3 className="syne" style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.5rem" }}>{pkg.name}</h3>
                <div style={{ marginBottom: "1.5rem" }}>
                  <span className="syne" style={{ fontSize: "2.5rem", fontWeight: "800", color: "#c9a84c" }}>{pkg.price}</span>
                  <span className="inter" style={{ fontSize: "0.82rem", color: "#475569", marginLeft: "0.5rem" }}>{pkg.priceNote}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  {pkg.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ color: "#c9a84c", fontSize: "0.75rem" }}>✓</span>
                      <span className="inter" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={waLink} target="_blank" rel="noreferrer" className={pkg.highlight ? "btn-gold" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                  Book via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUTORS ────────────────────────── */}
      <section id="tutors" style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>The Team</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.75rem", lineHeight: 1.15 }}>Tutors who know the work</h2>
          <div className="divider-gold"/>
          <p className="inter" style={{ color: "#475569", marginBottom: "3rem", maxWidth: "480px", fontSize: "0.95rem", lineHeight: "1.7" }}>
            Every MMT tutor is a current or recent Wits student who excelled in the exact modules they teach.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { name: "Kagiso Mokoena", subject: "Linear Algebra · Business Statistics", year: "3rd Year — BSc Mathematics", bio: "Breaks down complex mathematical concepts into clear, structured frameworks. Specialises in first and second year quantitative modules." },
              { name: "Zanele Moyo", subject: "Physics · APPM1014", year: "4th Year — BSc Physics", bio: "Combines deep theoretical understanding with an exam-focused approach that has helped dozens of Wits students pass Phys1000A." },
              { name: "Luyanda Ntuli", subject: "Corporate Finance · Taxation", year: "Honours — BCom Accounting", bio: "Brings Honours-level insight to students tackling Corporate Finance II, Taxation 3 and advanced BCom modules." },
            ].map(t => (
              <div key={t.name} className="card-dark" style={{ padding: "2rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <span className="syne" style={{ fontWeight: "800", color: "#c9a84c", fontSize: "1rem" }}>{t.name[0]}</span>
                </div>
                <h3 className="syne" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.3rem" }}>{t.name}</h3>
                <p className="inter" style={{ fontSize: "0.78rem", color: "#c9a84c", fontWeight: "600", marginBottom: "0.25rem" }}>{t.subject}</p>
                <p className="inter" style={{ fontSize: "0.72rem", color: "#374151", marginBottom: "1rem" }}>{t.year}</p>
                <p className="inter" style={{ fontSize: "0.85rem", color: "#475569", lineHeight: "1.7" }}>{t.bio}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "2rem 2.5rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p className="syne" style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "0.3rem" }}>Are you a top-performing Wits student?</p>
              <p className="inter" style={{ color: "#475569", fontSize: "0.85rem" }}>Join the MMT tutor pool. Earn R150–R300/hr on your own schedule.</p>
            </div>
            <a href={tutorLink} target="_blank" rel="noreferrer" className="btn-outline">Apply as a Tutor →</a>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────── */}
      <section style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Results</div>
          <h2 className="syne" style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "3rem", lineHeight: 1.15 }}>What students say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1.25rem" }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#c9a84c", fontSize: "0.85rem" }}>★</span>)}
                </div>
                <p className="inter" style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: "1.75", marginBottom: "1.5rem", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                  <p className="syne" style={{ fontSize: "0.88rem", fontWeight: "700", color: "#f1f5f9" }}>{t.name}</p>
                  <p className="inter" style={{ fontSize: "0.75rem", color: "#475569" }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────── */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="label-tag" style={{ marginBottom: "1rem" }}>Get in touch</div>
          <h2 className="syne" style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", lineHeight: 1.1 }}>
            Ready to turn things around?
          </h2>
          <p className="inter" style={{ color: "#475569", marginBottom: "3rem", fontSize: "1rem", lineHeight: "1.7" }}>
            WhatsApp us your module and we&apos;ll match you with the right tutor — usually within the hour.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-gold" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
              📲 066 039 7779 — WhatsApp
            </a>
            <a href="mailto:mastermindtutoringmmt@gmail.com" className="inter" style={{ color: "#475569", fontSize: "0.85rem" }}>
              mastermindtutoringmmt@gmail.com
            </a>
            <a href="https://mastermindtutoring.co.za" className="inter" style={{ color: "#c9a84c", fontSize: "0.85rem" }}>
              mastermindtutoring.co.za
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="syne" style={{ fontWeight: "800", fontSize: "1rem" }}>MMT<span className="gold">.</span></span>
            <p className="inter" style={{ fontSize: "0.75rem", color: "#374151", marginTop: "0.25rem" }}>CEO: Fezile Nkosi · COO: Thandeka Valelo</p>
          </div>
          <p className="inter" style={{ fontSize: "0.75rem", color: "#374151" }}>© 2026 Mastermind Tutoring · Wits University · Johannesburg</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["modules","courses","highschool","packages","contact"].map(l => (
              <a key={l} href={`#${l}`} className="inter" style={{ fontSize: "0.75rem", color: "#374151", textTransform: "capitalize" }}>{l}</a>
            ))}
            <a href="/bursaries" className="inter" style={{ fontSize: "0.75rem", color: "#c9a84c" }}>Bursaries</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
