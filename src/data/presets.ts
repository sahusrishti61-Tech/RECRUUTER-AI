export interface PresetScenario {
  id: string;
  name: string;
  badge: string;
  targetRole: string;
  experienceLevel: string;
  resume: string;
  jobDescription: string;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'data-analyst-fintech',
    name: 'Data Analyst at Mid-size FinTech',
    badge: 'Exact Prompt Example',
    targetRole: 'Data Analyst at a mid-size fintech company',
    experienceLevel: 'Mid-Level',
    resume: `JORDAN LEE
San Francisco, CA | jordan.lee@email.com | linkedin.com/in/jordanlee-data | github.com/jordanlee

PROFESSIONAL SUMMARY
Data Analyst with 3.5 years of experience querying databases, building BI reports, and collaborating with cross-functional partners in financial services and retail banking. Experienced with SQL, Python, Tableau, and Excel. Looking for a high-impact Data Analyst role at a fast-growing fintech company.

WORK EXPERIENCE
Nexus Financial Partners — San Francisco, CA
Data Analyst | Jan 2023 – Present
- Responsible for running daily and weekly SQL queries on customer transaction logs to generate financial performance reports.
- Created Tableau dashboards for the credit risk team to monitor default rates and loan repayment schedules.
- Assisted engineering team with ad-hoc data extraction and cleaned customer dataset using Python and Pandas.
- Helped optimize database query times by adding indexes on frequently queried customer ID columns.
- Collaborated with product managers to understand feature engagement for our mobile banking portal.

Apex Retail Services — Oakland, CA
Junior Business & Data Analyst | June 2021 – Dec 2022
- Extracted sales and inventory data using PostgreSQL and prepared monthly executive slide decks.
- Automated a manual reporting workbook using Python scripts and Excel VBA, saving several hours every week.
- Analyzed customer churn patterns across 5 geographic regions and identified seasonal drop-offs.
- Participated in weekly standups and documented internal metric definitions in company Confluence.

EDUCATION
University of California, Davis
B.S. in Economics, Minor in Statistics | Graduated May 2021
Relevant Coursework: Econometrics, Linear Algebra, Statistical Modeling, Applied Database Systems

TECHNICAL SKILLS
- Languages: SQL (PostgreSQL, MySQL), Python (pandas, numpy, matplotlib), Bash
- Tools & BI: Tableau, Power BI, Excel (Advanced, VBA), Git, Confluence, Jira
- Concepts: A/B Testing, Exploratory Data Analysis, Cohort Analysis, Financial Modeling`,
    jobDescription: `Role: Data Analyst — Risk & Growth Analytics
Company: PayStream (Series B FinTech, 180 employees)
Location: San Francisco, CA (Hybrid)

About the Role:
PayStream is looking for a driven Data Analyst to join our Risk & Fraud Analytics team. In this role, you will partner directly with Risk Operations, Product, and Finance to uncover fraudulent behavior, optimize transaction approval rates, and build scalable automated pipelines.

Key Responsibilities:
- Build, maintain, and automate end-to-end data pipelines using dbt, SQL, and Snowflake to support real-time fraud monitoring.
- Design high-frequency anomaly detection dashboards in Tableau and Looker tracking Chargeback Rates, KYC Drop-off, and Net Fraud Loss (basis points).
- Partner with Risk Engineers to analyze payment gateway transaction volumes ($50M+ monthly) and identify synthetic identity rings.
- Design and execute rigorous A/B experiments on friction-reduction features in checkout workflows.
- Communicate complex statistical insights clearly to executive leadership and banking partners.

Requirements:
- 3+ years experience as a Data Analyst or Business Intelligence Analyst, preferably in FinTech, Payments, or Banking.
- Advanced SQL proficiency (window functions, CTEs, query optimization on columnar data stores like Snowflake or BigQuery).
- Hands-on experience with dbt or modern data stack workflow orchestrators (Airflow, Dagster).
- Strong understanding of key FinTech metrics: Churn, LTV, Chargeback Ratio, KYC verification rate, interchange margins.
- Excellent data storytelling and stakeholder management skills.`,
  },
  {
    id: 'fullstack-engineer-startup',
    name: 'Senior Full-Stack Engineer',
    badge: 'Tech & SaaS',
    targetRole: 'Senior Full-Stack Software Engineer at a Series A SaaS',
    experienceLevel: 'Senior',
    resume: `ALEX RIVERA
alex.rivera.dev@gmail.com | github.com/alexrivera-code | Austin, TX

SUMMARY
Full-Stack Engineer with 6+ years of building web applications with TypeScript, React, Node.js, and PostgreSQL. Passionate about clean code, developer tooling, and microservices.

EXPERIENCE
CloudScale Technologies | Austin, TX
Senior Software Engineer | 2022 – Present
- Worked on redesigning the core billing and subscription management system with React and TypeScript.
- Built backend REST APIs in Node.js and Express to process customer invoices and Stripe webhooks.
- Helped improve system reliability and fixed high-priority bug tickets reported by customer support.
- Mentored junior engineers and conducted code reviews across the team.

WebCraft Labs | Austin, TX
Software Engineer | 2019 – 2022
- Developed frontend user interfaces using React, Redux, and Tailwind CSS for enterprise clients.
- Implemented PostgreSQL database schemas and optimized slow SQL queries for search endpoints.
- Integrated third-party APIs including Auth0, Twilio, and SendGrid.
- Participated in sprint planning and on-call rotations.

SKILLS
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5/CSS3, Tailwind, Redux
- Backend: Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL
- Cloud & DevOps: Docker, AWS (S3, EC2), Git, CI/CD with GitHub Actions`,
    jobDescription: `Company: Synapse Analytics (Series A)
Position: Senior Full-Stack Engineer

We need a Senior Full-Stack Engineer to architect our enterprise collaboration platform.
Requirements:
- 5+ years experience building high-throughput, low-latency web apps in React, TypeScript, and Node.js.
- Strong distributed systems knowledge (Redis pub/sub, WebSockets, Kafka, event-driven architecture).
- Proven track record optimizing web performance (Core Web Vitals, SSR, caching strategies).
- Deep experience with PostgreSQL tuning (indexing strategies, connection pooling, EXPLAIN ANALYZE).
- Experience leading architectural decisions, RFCs, and mentoring mid-level engineers.`,
  },
  {
    id: 'product-manager-b2b',
    name: 'Product Manager (B2B SaaS)',
    badge: 'Product & Strategy',
    targetRole: 'Product Manager at a mid-market B2B SaaS',
    experienceLevel: 'Mid-Level',
    resume: `SAMANTHA CHEN
New York, NY | sam.chen.pm@gmail.com

PROFESSIONAL EXPERIENCE
Veloce Enterprise Cloud — New York, NY
Product Manager | March 2022 – Present
- Managed the roadmap for the customer analytics dashboard module used by enterprise customers.
- Worked with engineering and design to ship new filtering and CSV export capabilities.
- Conducted user interviews with 15 customer accounts to gather feedback on user pain points.
- Defined product requirements and user stories in Jira for two scrum teams.
- Collaborated with marketing on release notes and webinar demonstrations.

MetricPulse — Boston, MA
Associate Product Manager | Jan 2020 – Feb 2022
- Assisted Senior PM with competitive analysis and backlog grooming.
- Tracked product adoption using Mixpanel and Google Analytics.
- Coordinated user testing sessions for onboarding redesign.

EDUCATION
Boston University — B.S. in Business Administration, 2019`,
    jobDescription: `Role: Product Manager — Platform Core
Company: Dataship Technologies
Looking for a metrics-obsessed Product Manager with experience driving activation, product-led growth (PLG), and reducing enterprise customer churn. Must have demonstrated success with quantifiable ARR impact and complex API integrations.`,
  },
];
