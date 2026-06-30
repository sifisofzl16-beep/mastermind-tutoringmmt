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
  {
    slug: "wilmar",
    company: "Wilmar South Africa",
    emoji: "🌾",
    status: "Open",
    year: "2027",
    summary:
      "Full cost-of-study funding — tuition, accommodation, books and living allowance — for South African students entering their final undergraduate year in Commerce, Engineering or Agriculture-related fields.",
    about:
      "Wilmar South Africa is part of Wilmar International, one of the world's largest agribusiness groups, operating in edible oils, sugar and consumer food products across South Africa. The Wilmar SA Bursary Fund supports talented students from historically disadvantaged or underprivileged backgrounds through their final year of study, with selection based on both academic potential and genuine financial need.",
    fields: [
      { group: "Commerce & Finance", items: ["Accounting", "Finance", "Econometrics", "International Trade"] },
      { group: "Operations & Supply", items: ["Operations Management", "Production Management", "Supply Chain", "Agro-economics"] },
      { group: "People & Markets", items: ["Human Resources Management", "Marketing / Sales-related", "Engineering"] },
    ],
    requirements: [
      "South African citizens only",
      "Historically Disadvantaged Person and/or from an underprivileged background",
      "Currently enrolled in your final undergraduate year",
      "Studying at an accredited South African institution",
      "Minimum 70% aggregate in your latest examinations",
    ],
    benefits: [
      "Tuition fees covered",
      "Accommodation covered",
      "Book allowance",
      "Living allowance",
    ],
    closingDate: "19 August 2026",
    applyUrl: "https://www.cognitoforms.com/StudyTrust2/WilmarSABursaryApplication2026?qr",
    source: "Wilmar SA bursary application (StudyTrust)",
  },
];

export function getBursary(slug: string) {
  return BURSARIES.find((b) => b.slug === slug);
}
