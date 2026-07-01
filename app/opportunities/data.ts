export type Opportunity = {
  slug: string;
  org: string;
  emoji: string;
  type: "Marking Contract" | "Internship" | "Vacation Work" | "Part-Time";
  status: "Open" | "Closing Soon" | "Closed";
  summary: string;
  about: string;
  positions: { group: string; count: string }[];
  requirements: string[];
  duties: string[];
  keyDates: { label: string; date: string }[];
  closingDate: string;
  applyUrl: string;
  source: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    slug: "jet-wced-markers",
    org: "JET Education Services",
    emoji: "✏️",
    type: "Marking Contract",
    status: "Open",
    summary:
      "JET Education Services is recruiting short-term contract markers for the Western Cape Education Department's Grade 9 Systemic Testing — a paid opportunity that suits students and graduates strong in English, Afrikaans or Maths.",
    about:
      "JET Education Services is building a register of markers to mark scripts for WCED Grades 3, 6 and 9 Systemic Testing. Recruitment is starting with Grade 9. Markers are assigned to a subject matching their qualifications and experience, and work under a Senior Marker at a Marking Centre for the duration of the contract.",
    positions: [
      { group: "English Language (LOLT)", count: "Up to 40 positions" },
      { group: "Afrikaans Language (LOLT)", count: "Up to 70 positions" },
      { group: "Mathematics", count: "Up to 60 positions" },
    ],
    requirements: [
      "Tertiary qualification with a minimum second-year university-level pass in the subject",
      "Previous WCED marking experience is an advantage, but not required",
      "Not currently employed by the WCED",
      "Fully available for the whole marking period, including weekends if needed",
      "Valid SARS tax number and South African ID",
      "Person of integrity able to maintain confidentiality of testing material",
    ],
    duties: [
      "Attend a compulsory Training Session before marking begins",
      "Know the Marking Instruction Manual issued at training",
      "Be present at the Marking Centre 07h00–17h00 on all assigned marking days",
      "Report to an assigned Senior Marker and follow Chief Marker instructions",
      "Mark scripts thoroughly and accurately per the memorandum",
    ],
    keyDates: [
      { label: "Applications close", date: "30 July 2026" },
      { label: "Marking starts", date: "12 October 2026" },
      { label: "Marking ends by", date: "20 November 2026" },
    ],
    closingDate: "30 July 2026",
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdD39uhD7i3OSQdbQwaWthJ27juFvuxaBcKzvedt3w-96QKtA/viewform",
    source: "jet.org.za",
  },
];

export function getOpportunity(slug: string) {
  return OPPORTUNITIES.find((o) => o.slug === slug);
}
