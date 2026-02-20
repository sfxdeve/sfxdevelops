import type {
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PortfolioProfile,
  SkillGroup,
} from "../types/portfolio";

export const profile: PortfolioProfile = {
  name: "Shayan Fareed",
  title: "Full Stack JavaScript Developer",
  location: "Karachi, Pakistan",
  summary: [
    "Full Stack JavaScript Developer with 3+ years of professional experience building scalable, production level web applications using React.js, Next.js, Node.js, and MongoDB.",
    "Currently working remotely with a UK based company and contributing across full stack architecture, API development, and performance optimization with a strong focus on clean architecture and maintainable systems.",
  ],
  relocationNote: "Open to relocation within Europe.",
  contact: {
    email: "sfx.deve@gmail.com",
    phone: "+923082228141",
    linkedIn: "https://linkedin.com/in/shayanfareed",
    github: "https://github.com/sfxdeve",
  },
};

export const coreCompetencies: string[] = [
  "Full Stack JavaScript Development",
  "Scalable REST API Architecture",
  "MERN Stack Applications",
  "Performance Optimization",
  "Reusable Component Architecture",
  "Clean Code & Code Reviews",
  "Agile & Sprint Based Development",
  "International Remote Collaboration",
];

export const experience: ExperienceItem[] = [
  // {
  //   role: "Software Engineer",
  //   company: "Aqua Digital Rising",
  //   location: "London, UK (Remote)",
  //   startDate: "Jan 2025",
  //   endDate: "Present",
  //   achievements: [
  //     "Develop and maintain full stack MERN applications for production environments.",
  //     "Design and implement scalable RESTful APIs for internal and third party integrations.",
  //     "Optimize frontend performance using structured state management and reusable architecture.",
  //     "Participate in sprint planning, architecture discussions, and peer code reviews.",
  //     "Contribute to scalable backend structures and clean deployment workflows.",
  //   ],
  // },
  {
    role: "Freelance Full Stack Developer (Upwork)",
    company: "Independent",
    location: "Remote",
    startDate: "Jan 2025",
    endDate: "Present",
    achievements: [
      "Delivered custom web solutions for international clients.",
      "Managed complete project lifecycle from requirements gathering to deployment.",
      "Built scalable frontend systems and backend API integrations.",
      "Worked with clients across multiple regions in remote collaboration setups.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Jumppace Pvt Ltd",
    location: "Karachi, Pakistan",
    startDate: "Oct 2023",
    endDate: "Nov 2024",
    achievements: [
      "Built production level web applications using React.js and Node.js.",
      "Refactored reusable components to improve maintainability and performance.",
      "Assisted in backend API development and MongoDB schema design.",
      "Contributed to version control management and deployment processes.",
    ],
  },
  {
    role: "React.js Developer",
    company: "AZ Code Arena",
    location: "Karachi, Pakistan",
    startDate: "Apr 2023",
    endDate: "Sep 2023",
    achievements: [
      "Developed responsive frontend interfaces from Figma designs.",
      "Integrated REST APIs and authentication systems.",
      "Ensured cross browser compatibility and mobile responsiveness.",
    ],
  },
];

export const featuredExperience: ExperienceItem[] = experience.slice(0, 2);

export const positioningSummary: string[] = [
  "A production ready Full Stack JavaScript engineer",
  "Experienced in international remote collaboration",
  "Strong in structured architecture and scalable systems",
  "Comfortable owning both frontend and backend systems",
  "Ready for European relocation",
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming Languages",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Kotlin (Backend / Android Exposure)",
    ],
  },
  {
    name: "Frontend Development",
    items: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Material UI",
      "Responsive UI/UX Design",
      "Component Optimization",
      "Cross browser compatibility",
    ],
  },
  {
    name: "Backend Development",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST API Development",
      "Authentication & Authorization",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Event driven architecture",
      "Webhook handling",
    ],
  },
  {
    name: "Dashboard & Data Systems",
    items: [
      "Custom Admin Panels",
      "Data driven dashboards",
      "Real time analytics",
      "Third party API integrations",
    ],
  },
  {
    name: "DevOps & Deployment",
    items: ["Docker", "AWS", "Vercel", "Heroku", "CI/CD Pipelines", "Git & GitHub"],
  },
  {
    name: "Development Tools & Practices",
    items: [
      "Git Version Control",
      "Postman",
      "Agile Methodology",
      "Code Reviews",
      "Structured State Management",
      "API Testing & Documentation",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "NED University of Engineering & Technology",
    location: "Karachi, Pakistan",
    expected: "Expected 2026",
    gpa: "CGPA: 3.5",
  },
];

export const languages: LanguageItem[] = [
  { name: "English", level: "Professional" },
  { name: "Turkish", level: "Fluent" },
  { name: "Urdu", level: "Native" },
];
