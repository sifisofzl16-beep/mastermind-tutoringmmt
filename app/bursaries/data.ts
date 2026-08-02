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
      "Toyota South Africa Motors (TSAM) has run its bursary fund since incorporating as a Toyota Motor Corporation subsidiary in 2002, aiming to support academically strong students from its communities. Beyond tuition funding, recipients get vacation work placements and potential exposure to Toyota's flagship graduate programme, a real bridge from study into employment.",
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
    applyUrl: "https://studytrust.org.za/toyota/",
    source: "jobs.toyota.co.za",
  },
  {
    slug: "wilmar",
    company: "Wilmar South Africa",
    emoji: "🌾",
    status: "Open",
    year: "2027",
    summary:
      "Full cost-of-study funding, tuition, accommodation, books and living allowance, for South African students entering their final undergraduate year in Commerce, Engineering or Agriculture-related fields.",
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
  {
    slug: "nedbank",
    company: "Nedbank External Bursary Programme",
    emoji: "🏦",
    status: "Open",
    year: "2027",
    summary:
      "Nedbank funds full-time undergraduate or honours study in STEM and green economy fields for South African citizens with proven financial need.",
    about:
      "The Nedbank External Bursary Programme, run by the Nedbank Educational Trust, funds first undergraduate or honours degrees/diplomas at accredited South African public universities and universities of technology, with a focus on scarce-skills shortages in STEM and green economy fields.",
    fields: [
      { group: "STEM", items: ["Science", "Technology", "Engineering", "Mathematics"] },
      { group: "Green Economy", items: ["Green economy / sustainability-linked skills"] },
    ],
    requirements: [
      "South African citizen",
      "Currently in Matric or completed Matric",
      "Studying or intending to study a 1st undergraduate/Honours degree or diploma in 2027 in STEM or green economy",
      "Full-time study at an accredited public SA university or university of technology",
      "Passed Mathematics (not Maths Literacy) in Matric",
      "Minimum 65% overall average for 2026 (Matric or university level), and 65% for subjects aligned to the qualification",
      "Proven financial need (household income)",
      "Parent/guardian consent if under 18",
    ],
    benefits: [
      "Funding toward tuition for full-time undergraduate/honours study",
      "Applies to any accredited SA public university or university of technology",
      "Administered by the Nedbank Educational Trust",
    ],
    closingDate: "31 August 2026",
    applyUrl: "https://nedbankex.fra1.qualtrics.com/jfe/form/SV_eXneIZdSSqwmFCK",
    source: "group.nedbank.co.za/careers/graduates-and-bursaries.html",
  },
  {
    slug: "glencore-alloys-electrical",
    company: "Glencore South Africa (Alloys Division)",
    emoji: "⚡",
    status: "Open",
    year: "2027",
    summary:
      "Glencore's Alloys Division, based at Rhovan PSV in Brits, is funding Electrical Engineering students, covering tuition, residence, textbooks and a monthly allowance.",
    about:
      "Glencore is a major global diversified mining group listed on the London and Swiss Stock Exchanges, with operations spanning four continents and eighteen countries. Its South African Alloys Division, based at Rhovan PSV near Brits, offers this bursary to Grade 12 learners and current university students studying Electrical Engineering, with selection based on academic results and an interview with the Bursary Committee.",
    fields: [
      { group: "Engineering", items: ["Electrical Engineering"] },
    ],
    requirements: [
      "Grade 12 learners or current university students",
      "At least a C+ symbol at Higher Grade for both Mathematics and Science",
      "Selection based on academic results and an interview with Glencore Alloy's Bursary Committee",
      "Cannot be held at the same time as any other significant industry bursary",
    ],
    benefits: [
      "Composite registration and tuition fees",
      "Residence fees, including meals",
      "Prescribed textbooks",
      "Monthly cash allowance for incidental expenses",
      "Financial assistance toward a personal computer from 2nd year of study, if prescribed by the university",
    ],
    closingDate: "1 August 2026",
    applyUrl: "https://www.glencore.com/en/careers/jobs/07O%20-%2000195726",
    source: "glencore.com official careers listing (Job ID 07O - 00195726)",
  },
  {
    slug: "sanparks-external",
    company: "SANParks External Bursary Programme",
    emoji: "🌳",
    status: "Open",
    year: "2027",
    summary:
      "South African National Parks is funding first-year undergraduate study for youth aged 18 to 35 from communities neighbouring national parks, across an unusually wide range of fields from conservation to artisan trades.",
    about:
      "SANParks was established under the National Environmental Management: Protected Areas Act, 2003, to conserve South Africa's biodiversity, landscapes and heritage through its national parks, while ensuring those operations create educational and economic benefit for neighbouring communities. This bursary is one of its most direct investments in those communities, covering degree, diploma, TVET and artisan qualifications at any accredited public South African institution.",
    fields: [
      { group: "Environmental Sciences", items: ["Nature Conservation", "Environmental Management", "Green Energy", "Environmental Engineering", "Sustainable Development", "Game Ranch Management"] },
      { group: "Tourism", items: ["Hospitality Management", "Tourism Management", "Resort Management", "Tour Guiding", "Events & Conference Management"] },
      { group: "Social Sciences", items: ["Community Development", "Economic Development", "Socio-Economic Development"] },
      { group: "Infrastructure & Built Environment", items: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Construction Management", "Quantity Surveying", "Architecture", "Project Management"] },
      { group: "Technical & Artisan Trades", items: ["Electricians", "Plumbers", "Welders", "Millwrights", "Mechanics", "Technicians", "Solar Technicians", "Refrigeration Technicians", "Water & Wastewater Technicians"] },
      { group: "Emerging Scarce Skills", items: ["GIS", "Analytics", "Cyber Security", "Renewable Energy", "Climate Change Adaptation", "Biodiversity Economics", "Entrepreneurship"] },
    ],
    requirements: [
      "South African citizen",
      "From a community living adjacent to a National Park, as defined in that park's management plan",
      "Aged 18 to 35",
      "Entering first-year post-Matric study in 2027 (university, university of technology, or TVET college)",
      "Household or applicant income not exceeding R350,000 per year",
      "If already registered at an institution, a 100% pass rate for all completed study periods",
      "Proof of application and admission to an accredited institution",
    ],
    benefits: [
      "Comprehensive bursary covering approved study-related expenses",
      "Selection considers academic merit alongside SANParks' commitment to women, people with disabilities, and designated groups",
      "Covers degree, National Diploma, TVET and artisan qualifications",
    ],
    closingDate: "21 August 2026",
    applyUrl: "mailto:happy.nhlangwini@sanparks.org?subject=SANParks%20External%20Bursary%20Programme%202027%20Application",
    source: "sanparks.org official vacancies listing",
  },
];

export function getBursary(slug: string) {
  return BURSARIES.find((b) => b.slug === slug);
}
