import { whatsappLink } from "./contact";

export const TUTOR_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";

export const WA = {
  fullCourse: whatsappLink("Hi Mastermind Tutoring, I'd like to join the Full Course."),
  session: whatsappLink("Hi Mastermind Tutoring, I'd like to book a tutoring session."),
  highSchool: whatsappLink("Hi Mastermind Tutoring, I'm looking for a high school tutor."),
  general: whatsappLink("Hi Mastermind Tutoring, I have a question."),
  bursaryAlerts: whatsappLink("Hi Mastermind Tutoring, please let me know when new bursaries open."),
  opportunityAlerts: whatsappLink("Hi Mastermind Tutoring, please let me know about new opportunities."),
  module: (name: string) =>
    whatsappLink(`Hi Mastermind Tutoring, I need help with ${name}.`),
  course: (name: string) =>
    whatsappLink(`Hi Mastermind Tutoring, I'd like to join the ${name} Full Course.`),
};

export const FULL_COURSE_PRICES = [
  { modules: "1 module", price: "R250", note: "per month" },
  { modules: "2 modules", price: "R450", note: "per month" },
  { modules: "3 modules", price: "R600", note: "per month" },
];

export const SESSION_PRICES = [
  {
    name: "Single session",
    blurb: "One focused hour on the part of the module that is costing you marks.",
    online: "R200",
    inPerson: "R250",
    unit: "per hour",
    points: ["Any module we cover", "Online or in person", "Book when you need it"],
  },
  {
    name: "Monthly package",
    blurb: "Eight sessions a month with the same tutor, so the work builds week on week.",
    online: "R1,440",
    inPerson: "R1,760",
    unit: "8 sessions",
    points: ["One dedicated tutor", "A fixed weekly rhythm", "Works out cheaper per session"],
  },
];

export const MODULES: Record<string, string[]> = {
  "Common Engineering": ["Engineering Mathematics IA & IB", "Engineering Physics IA & IB", "Engineering Chemistry", "Applied Physics I", "Engineering Analysis & Design IA & IB", "Introduction to Engineering Profession"],
  "Mechanical": ["Applied Mechanics A & B", "Machine Elements", "Fluid Mechanics I", "Engineering Thermodynamics I", "Mechatronics I", "Engineering Design", "Materials Science", "Computing Skills & Software Dev"],
  "Electrical": ["Electric Circuits", "Electronics I", "Electrical & Magnetic Systems", "Signals & Systems I", "Microprocessors", "Software Development I", "Data Structures & Algorithms", "Physics II (Electrical)"],
  "Civil": ["Materials & Structures I & II", "Numerical Methods", "Environmental Engineering", "Engineering Computing", "Geology for Civil Engineers", "Engineering Surveying", "Engineering Economics"],
  "Construction Studies": ["Introduction to Structures", "Building Science I", "Construction Technology II", "Site Management", "Civil Engineering Theory I", "Quantities & Specifications II", "Accounting in Construction"],
  "Computational Maths": ["Mathematical Methods I & II (APPM)", "Mechanics I & II (APPM)", "Scientific Computing I & II", "Algebra I", "Calculus I", "Linear Algebra II", "Multivariable Calculus", "Basic & Advanced Analysis"],
  "Actuarial Science": ["Actuarial Science I & II", "Mathematical Statistics I & II", "Abstract Mathematics", "Differential Equations", "Basic Analysis", "Economic Theory IA & IB", "Business Accounting I"],
  "Accounting Science": ["Financial Accounting I, II, III", "Management Accounting II, III", "Taxation II, III", "Auditing II, III", "Business Enterprise Law", "Mercantile Law", "Commercial Law I", "Business Statistics I"],
  "BCom Accounting": ["Accounting I & II", "Management Accounting II", "Taxation II", "Auditing II", "Fundamentals of Information Systems", "IS Data Analytics II", "Consumer Behaviour", "Principles of Marketing"],
  "Information Systems": ["Information Systems IA, IB, IIA, IIB", "Corporate Finance II", "Investment II", "Economics IA & IB", "IS Data Analytics II", "Human Resources IIA & IIB", "Insurance & Risk Management"],
  "Commerce": ["Business Statistics (STAT1006)", "Corporate Finance II (FINA3002)", "Economics I & II", "Financial Mathematics", "Quantitative Methods", "Investment Management", "Business Law"],
  "Science": ["Physics I (PHYS1000A)", "Chemistry I", "Biology (BIOL1035A)", "Molecular & Cell Biology II", "Biochemistry III", "Genetics & Dev Biology III", "Mathematics I & II", "Statistics I"],
};

/** Turns "30 September 2026" or "3 August 2026, 23:59 SAST" into a Date, or null when there is no fixed date. */
export function parseClosingDate(text: string): Date | null {
  const m = text.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const d = new Date(`${m[1]} ${m[2]} ${m[3]} 23:59:59 GMT+0200`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export type LiveStatus = "Open" | "Closing soon" | "Closed";

/** Works out the status from the closing date, so a listing closes itself once the date passes. */
export function liveStatus(closingDate: string, fallback: string, now = new Date()): LiveStatus {
  const d = parseClosingDate(closingDate);
  if (!d) return fallback === "Closed" ? "Closed" : fallback === "Closing Soon" ? "Closing soon" : "Open";
  const days = (d.getTime() - now.getTime()) / 86400000;
  if (days < 0) return "Closed";
  if (days <= 14) return "Closing soon";
  return "Open";
}

/** Google Business Profile. Update the numbers here when the rating changes. */
export const GOOGLE_REVIEWS = {
  rating: "4.8",
  count: 54,
  url: "https://share.google/vofx6H3cRAId8y1US",
  writeUrl: "https://g.page/r/CbdZCEZW3YHKEAE/review",
};
