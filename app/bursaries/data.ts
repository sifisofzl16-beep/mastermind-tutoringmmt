export type Bursary = {
  slug: string;
  company: string;
  emoji: string;
  status: "Open" | "Closing Soon" | "Closed";
  year: string;
  summary: string;
  about: string;
  fields: { group: string; items: string[] }[];
  requirements: string[];
  benefits: string[];
  closingDate: string;
  applyUrl: string;
  source: string;
};

export const BURSARIES: Bursary[] = [
  {
    slug: "toyota",
    company: "Toyota South Africa Motors",
    emoji: "🚗",
    status: "Open",
    year: "2027",
    summary:
      "Funding full-time South African students across Engineering, Commerce and Science, with vacation work and a path into Toyota's graduate programme.",
    about:
      "Toyota South Africa Motors (TSAM) has run its bursary fund since incorporating as a Toyota Motor Corporation subsidiary in 2002, aiming to support academically strong students from its communities. Beyond tuition funding, recipients get vacation work placements and potential exposure to Toyota's flagship graduate programme — a real bridge from study into employment.",
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
    benefits: [
      "Financial support toward tuition and study costs",
      "Vacation work placements during study breaks",
      "Potential exposure to Toyota's graduate programme",
      "Applications administered by StudyTrust",
    ],
    closingDate: "30 September 2026",
    applyUrl: "http://studytrust.org.za/toyota",
    source: "jobs.toyota.co.za",
  },
];

export function getBursary(slug: string) {
  return BURSARIES.find((b) => b.slug === slug);
}
