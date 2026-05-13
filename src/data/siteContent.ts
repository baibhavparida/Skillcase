export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export const aboutPage = {
  eyebrow: "About us",
  title: "Bringing India’s Skilled Workforce to the Global Map",
  intro: [
    "At Skillcase, we believe in the power of skilled talent — and we're on a mission to connect India’s healthcare professionals with global opportunities.",
    "From qualified nurses to allied health workers, we help candidates navigate the complex journey of international placements with transparency, care, and speed.",
    "Our platform simplifies everything — from language training and documentation to relocation and onboarding — so talent can focus on what they do best: caring for others.",
  ],
  values: [
    {
      title: "Ethics",
      text: "We are committed to fair, responsible, and compliant recruitment practices.",
      icon: "shield-check",
    },
    {
      title: "Transparency",
      text: "No hidden fees, no middlemen — just clear, honest communication.",
      icon: "badge-check",
    },
    {
      title: "Empowerment",
      text: "We equip candidates with tools, training, and confidence to succeed abroad.",
      icon: "sparkles",
    },
    {
      title: "Global Readiness",
      text: "We align our services with international standards to ensure seamless integration.",
      icon: "globe",
    },
  ],
  reasons: [
    {
      label: "To bridge",
      text: "the healthcare talent gap globally — starting with Germany and Europe",
    },
    {
      label: "To empower",
      text: "Indian professionals with the support they need to thrive abroad",
    },
    {
      label: "To build",
      text: "trust-driven partnerships between institutions and candidates",
    },
  ],
};

export const blogPosts = [
  {
    id: "13",
    slug: "nursing-in-germany-guide",
    title: "Nursing in Germany: A Comprehensive Guide for Aspiring Nurses",
    category: "Career guide",
    date: "25 July 2025",
    datetime: "2025-07-25",
    author: "Skillcase",
    image: "/assets/images/blog-nursing-germany-guide.webp",
    imageAlt: "Indian nurses preparing for international healthcare interviews",
    excerpt:
      "Germany is a highly sought-after destination for nurses from around the world. With its world-class healthcare system, excellent work-life balance, and ample career opportunities, Germany offers an ideal environment for nurses to grow personally and professionally.",
    highlights: ["B1/B2 German", "Credential recognition", "Adaptation program"],
    readTime: "8 min read",
    content: [
      {
        type: "paragraph",
        text: "Germany is a highly sought-after destination for nurses from around the world. With its world-class healthcare system, excellent work-life balance, and ample career opportunities, Germany offers an ideal environment for nurses to grow personally and professionally. This blog explores everything you need to know about pursuing a nursing career in Germany, including qualifications, language requirements, application processes, and life as a nurse in Germany.",
      },
      { type: "heading", text: "Why Germany is a Popular Destination for Nurses" },
      {
        type: "paragraph",
        text: "Germany boasts one of the best healthcare systems globally, offering exceptional quality of care and services. Nurses in Germany enjoy:",
      },
      {
        type: "list",
        items: [
          "**Strong Work-Life Balance**: A typical 40-hour workweek with optional overtime that is well-compensated.",
          "**Ample Opportunities**: Germany has a high demand for skilled nurses, creating many opportunities for professionals worldwide.",
          "**Excellent Benefits**: Nurses receive comprehensive social security benefits, including health insurance, paid leave, and support for family members.",
          "**Career Growth**: Nurses can specialize in various fields or even transition into higher roles, such as nurse practitioners or medical doctors.",
        ],
      },
      { type: "heading", text: "Qualifications and Eligibility for Nursing in Germany" },
      { type: "subheading", text: "Basic Qualifications" },
      {
        type: "paragraph",
        text: "To work as a nurse in Germany, candidates must have:",
      },
      {
        type: "list",
        items: [
          "A 3 year nursing degree such as **GNM (General Nursing and Midwifery)**, **BSc Nursing**, **Post BSc**, or **MSc Nursing**.",
          "German language proficiency of at least **B1 or B2 level**.",
        ],
      },
      { type: "subheading", text: "Work Experience and Age Limit" },
      {
        type: "list",
        items: [
          "**Experience**: Prior work experience is not mandatory. Fresh graduates are welcome to apply.",
          "**Age Limit**: While there is no strict age limit, it’s advisable to apply before turning 42 years old.",
        ],
      },
      { type: "heading", text: "Language Requirements for Nurses in Germany" },
      {
        type: "paragraph",
        text: "Since nurses interact with patients daily, proficiency in the German language is essential.",
      },
      {
        type: "list",
        items: [
          "**Required Level**: A minimum of **B1**, with **B2** being preferred.",
          "**Language Certification**: Candidates need to give a language proficiency test at any of the certified language centers like Goethe, TELC, ÖSD & TestDaF.",
        ],
      },
      { type: "heading", text: "Application Process for Nursing Jobs in Germany" },
      {
        type: "paragraph",
        text: "The process of applying for a nursing position in Germany involves the following steps:",
      },
      {
        type: "list",
        items: [
          "**Complete Language Training**: Achieve B1 or B2 level German proficiency.",
          "**Apply for Jobs**: Secure a position through interviews with German employers.",
          "**Credential Recognition**: Submit your nursing degree for equalization (Defizitbescheid).",
          "**Visa Application**: Apply for an employment visa with necessary documents, including health and travel insurance.",
          "**Relocate**: Once your visa is approved, fly to Germany and start your adaptation program.",
        ],
      },
      { type: "heading", text: "Credential Recognition and Adaptation Program" },
      {
        type: "paragraph",
        text: "The duration for credential recognition varies by state in Germany. It typically takes **2 months**, but in some regions, it may take up to **6-8 months**.",
      },
      {
        type: "paragraph",
        text: "Upon arrival in Germany, candidates go through an adaptation program that helps foreign nurses integrate into the German healthcare system.",
      },
      {
        type: "list",
        items: [
          "**Language Training**: Prepares candidates for the **B2 certification** if they haven’t achieved it yet.",
          "**Medical Terminology**: Familiarizes nurses with German medical terms.",
          "**Practical Training**: Offers hands-on experience in German hospitals.",
          "**Kenntnisprüfung**: Prepares candidates for the licensing exam.",
        ],
      },
      {
        type: "paragraph",
        text: "All candidates get paid from the time they reach Germany, including during the adaptation program.",
      },
      { type: "heading", text: "Salary, Benefits, and Career Growth" },
      {
        type: "list",
        items: [
          "**Working Hours**: Standard workweek of 40 hours, with additional pay for overtime.",
          "**Salary**: Nurses earn an average starting salary of **€3,600 to €3,900 per month** post completion of the adoption process.",
          "Specializations like critical procedure assistance or catheterization can increase earnings.",
          "Benefits include free health insurance and education for dependents, paid leave, social security benefits, spouse visas, and child benefits.",
        ],
      },
      {
        type: "paragraph",
        text: "Germany offers endless possibilities for career advancement, including specializations in intensive care, geriatrics, pediatrics, higher education, and advanced healthcare roles.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Germany is a land of opportunity for nurses, offering competitive salaries, excellent working conditions, and a pathway to professional and personal growth. While the journey requires effort, particularly in mastering the German language and navigating credential recognition, the rewards are worth it.",
      },
      {
        type: "paragraph",
        text: "Whether you are a fresh graduate or an experienced nurse, Germany welcomes you to build a fulfilling and successful career. Platforms like **Skillcase** connect aspiring nurses with top employers across the country.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    id: "14",
    slug: "nursing-salaries-germany-foreign-professionals",
    title: "Nursing Salaries in Germany for Foreign Professionals",
    category: "Salary insights",
    date: "25 July 2025",
    datetime: "2025-07-25",
    author: "Skillcase",
    image: "/assets/images/blog-salary-germany.webp",
    imageAlt: "Indian nurse reviewing salary documents with an advisor",
    excerpt:
      "Germany is a leading destination for nurses worldwide, offering competitive salaries, excellent working conditions, and plenty of opportunities for career growth.",
    highlights: ["€3,300-€3,600 gross", "30-40% deductions", "Specialization upside"],
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Germany is a leading destination for nurses worldwide, offering competitive salaries, excellent working conditions, and plenty of opportunities for career growth. One of the primary questions for prospective nurses is: **How much can I earn as a nurse in Germany, and what does the income look like over five years?** This blog dives into nursing salaries in Germany, expected increments, and how specialization and experience can influence earnings.",
      },
      { type: "heading", text: "Starting Salary for Nurses in Germany" },
      {
        type: "paragraph",
        text: "The average starting salary for a registered nurse in Germany is approximately **€3,300 to €3,600 per month (gross)**. This varies depending on factors like location, hospital size, and whether the institution is public or private.",
      },
      { type: "heading", text: "Key Factors Affecting Starting Salary" },
      {
        type: "list",
        items: [
          "**Language Proficiency**: Nurses with a B2 language level or higher may secure better-paying positions.",
          "**State of Employment**: Salaries tend to be higher in urban areas like Berlin or Munich but may be offset by higher living costs.",
          "**Specialized Skills**: Additional certifications like intensive care or geriatrics can lead to higher starting salaries.",
        ],
      },
      { type: "heading", text: "Salary Growth Over 5 Years" },
      {
        type: "paragraph",
        text: "Nurses in Germany benefit from annual salary increments, which are generally tied to collective labour agreements (Tarifvertrag) or individual performance evaluations. Nurses can earn up to 6000 Euros with specialised skills and overtime duties.",
      },
      { type: "heading", text: "Additional Income Through Specializations" },
      {
        type: "paragraph",
        text: "Specialized nursing roles often pay higher salaries. For example:",
      },
      {
        type: "list",
        items: [
          "**ICU Nurses**: Earn an additional €300-€500 per month.",
          "**Geriatric Nurses**: May earn €200-€400 more monthly.",
          "**Pediatric Nurses**: Earn bonuses for working in childcare units.",
        ],
      },
      { type: "heading", text: "Taxation and Take-Home Pay" },
      {
        type: "paragraph",
        text: "Nurses in Germany are subject to taxes, social security contributions, and health insurance deductions, which can reduce gross income by **30-40%**. A fresher earning €3,900 per month can expect a take-home salary of around **€2,500 to €2,800 per month** after deductions.",
      },
      { type: "heading", text: "Additional Benefits" },
      {
        type: "list",
        items: [
          "**Overtime Pay**: Paid at higher hourly rates.",
          "**Pension Contributions**: Significant employer contributions to retirement funds.",
          "**Paid Leave**: Minimum of 20-30 days per year.",
        ],
      },
      { type: "heading", text: "Career Opportunities for Nurses in Germany" },
      {
        type: "paragraph",
        text: "Germany offers abundant career growth opportunities for nurses, including specialization in pediatric nursing, ICU, oncology, further education, and transition into higher medical pathways.",
      },
      { type: "heading", text: "Living and Working in Germany" },
      {
        type: "list",
        items: [
          "**Social Security Benefits**: Healthcare, pension, and unemployment benefits are available to employees.",
          "**Work-Life Balance**: A 40-hour workweek with paid leave helps nurses enjoy time outside work.",
          "**Family Benefits**: Nurses can bring families under a spouse visa, with free education, healthcare, and social security benefits for children.",
        ],
      },
      { type: "heading", text: "Next Steps" },
      {
        type: "paragraph",
        text: "Germany offers a promising future for international nurses. With the right qualifications, language skills, and determination, you can expect a rewarding career and a high quality of life. **Skillcase** can guide candidates from language certification to visa application.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    id: "15",
    slug: "moving-to-germany-as-a-foreign-doctor",
    title: "Moving to Germany as a Foreign Doctor: A Step-by-Step Guide",
    category: "Relocation",
    date: "25 July 2025",
    datetime: "2025-07-25",
    author: "Skillcase",
    image: "/assets/images/blog-doctor-relocation-germany.webp",
    imageAlt: "Healthcare professional preparing Germany relocation documents",
    excerpt:
      "Germany offers immense opportunities for medical professionals seeking career growth, attractive salaries, and exposure to an advanced healthcare system.",
    highlights: ["FSP preparation", "Medical recognition", "Approbation pathway"],
    readTime: "7 min read",
    content: [
      {
        type: "paragraph",
        text: "Germany offers immense opportunities for medical professionals seeking career growth, attractive salaries, and exposure to an advanced healthcare system. This guide provides a comprehensive roadmap to help foreign doctors navigate the process of moving to Germany.",
      },
      { type: "heading", text: "Why Germany is a Great Destination for Doctors" },
      {
        type: "list",
        items: [
          "**Advanced Healthcare System**: Germany offers state-of-the-art medical facilities and a structured career pathway.",
          "**High Demand**: There is a growing need for qualified doctors, especially in rural areas.",
          "**Competitive Salaries**: Doctors in Germany earn attractive salaries with opportunities for growth.",
          "**Work-Life Balance**: The country emphasizes a balanced lifestyle and professional development.",
          "**Career Progression**: Opportunities for specialization and continuous learning are abundant.",
        ],
      },
      { type: "heading", text: "Step 1: Understand the Requirements" },
      {
        type: "paragraph",
        text: "Before initiating the relocation process, it is essential to understand the prerequisites for practicing medicine in Germany.",
      },
      {
        type: "list",
        items: [
          "**Language Proficiency**: Complete at least B1-level German from India to apply, while B2-level proficiency is required to start practice.",
          "**Medical Degree**: Your medical degree and academic documents, including work experience certificates, are required. Your degree must be registered with a State Medical Council or National Medical Council.",
          "**Identity Documents**: Essential documents include your passport, birth certificate, and academic transcripts.",
        ],
      },
      { type: "heading", text: "Step 2: Application Process" },
      {
        type: "list",
        items: [
          "**Complete Language Training**: Achieve B1-level German proficiency and clear the certification exam with a recognized center such as Goethe-Institut.",
          "**Recognition of Your Medical Degree**: Submit translated and certified academic documents for degree equivalence.",
          "**Registration for a Preparatory Course**: Register for an FSP (Fachsprachprüfung) preparatory course in Germany.",
          "**Visa Application**: Apply for your visa using the course invitation and supporting documents, including health and travel insurance.",
          "**Relocate**: Once your visa is approved, move to Germany and begin your preparatory program.",
        ],
      },
      { type: "heading", text: "Step 3: Fachsprachprüfung (FSP) Examination" },
      {
        type: "paragraph",
        text: "The **Fachsprachprüfung (FSP)** is a specialized medical language examination required for foreign doctors who wish to work in Germany. It assesses your ability to communicate effectively in a clinical environment and is a crucial step toward obtaining your medical license.",
      },
      { type: "subheading", text: "Exam Structure" },
      {
        type: "list",
        items: [
          "**Doctor-Patient Conversation (Anamnesegespräch)**: Simulated interaction with a patient to take medical history.",
          "**Documentation**: Writing a medical report or summarizing the patient conversation with accurate terminology.",
          "**Doctor-Doctor Conversation**: Presenting a case or discussing diagnostic and treatment plans with a colleague.",
        ],
      },
      {
        type: "paragraph",
        text: "It usually takes 6-7 months to complete language proficiency and FSP preparation. Upon successfully passing the FSP, you obtain your medical license to work as a junior doctor in Germany.",
      },
      { type: "heading", text: "Step 4: Securing Employment" },
      {
        type: "paragraph",
        text: "After clearing the FSP, the next step is to apply for jobs in hospitals. A well-structured CV highlighting your qualifications, language proficiency, and relevant experience can increase your chances.",
      },
      { type: "heading", text: "Step 5: Obtaining Approbation" },
      {
        type: "paragraph",
        text: "To practice permanently as a doctor in Germany, you need **Approbation**, the official authorization to practice medicine without restrictions. This requires passing the **Kenntnisprüfung** exam.",
      },
      { type: "heading", text: "Final Thoughts" },
      {
        type: "paragraph",
        text: "Relocating to Germany as a foreign doctor is a rewarding journey that demands dedication and meticulous planning. By following these steps and remaining proactive, you can establish a successful medical career in one of the world’s most advanced healthcare systems.",
      },
    ] satisfies ArticleBlock[],
  },
] as const;

export type BlogPost = (typeof blogPosts)[number];
