/**
 * generate-resume-docx.mjs
 * Generates public/Shayan_Fareed_Resume.docx matching the two-column resume theme.
 * Run: node scripts/generate-resume-docx.mjs
 */

import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "../public/Shayan_Fareed_Resume.docx");

// ── Design tokens ────────────────────────────────────────────────────────────
const BLUE = "2563EB";
const BLACK = "111111";
const GRAY = "444444";
const LIGHT_GRAY = "9CA3AF";

// Sizes in half-points (1pt = 2 half-pts)
const SZ_NAME = 72; // 36 pt
const SZ_TITLE = 30; // 15 pt
const SZ_SECTION = 25; // 12.5 pt
const SZ_ROLE = 23; // 11.5 pt
const SZ_BODY = 21; // 10.5 pt
const SZ_SMALL = 19; // 9.5 pt

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Uppercase section heading with thick bottom border */
function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: SZ_SECTION,
        color: BLACK,
        font: "Arial",
      }),
    ],
    border: {
      bottom: { style: BorderStyle.THICK, size: 16, color: BLACK, space: 1 },
    },
    spacing: { before: 200, after: 120 },
  });
}

/** Regular body paragraph */
function bodyPara(text, { before = 0, after = 60, color = GRAY } = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: SZ_BODY, color, font: "Arial" })],
    spacing: { before, after },
  });
}

/** Bullet point */
function bulletPoint(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: SZ_BODY, color: GRAY, font: "Arial" })],
    bullet: { level: 0 },
    spacing: { after: 40 },
  });
}

/** Job block */
function jobBlock({ role, company, meta, bullets }) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: role, bold: true, size: SZ_ROLE, color: BLACK, font: "Arial" }),
      ],
      spacing: { before: 120, after: 30 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: company, bold: true, size: SZ_ROLE, color: BLUE, font: "Arial" }),
      ],
      spacing: { after: 30 },
    }),
    new Paragraph({
      children: [new TextRun({ text: meta, size: SZ_SMALL, color: LIGHT_GRAY, font: "Arial" })],
      spacing: { after: 60 },
    }),
    ...bullets.map(bulletPoint),
  ];
}

/** Strength / achievement block */
function featureBlock({ title, desc }) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: title, bold: true, size: SZ_BODY, color: BLACK, font: "Arial" }),
      ],
      spacing: { before: 80, after: 30 },
    }),
    bodyPara(desc, { after: 80 }),
  ];
}

/** Divider (thin horizontal rule) */
function divider() {
  return new Paragraph({
    text: "",
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB", space: 1 },
    },
    spacing: { before: 0, after: 0 },
  });
}

// ── Left column ───────────────────────────────────────────────────────────────
function leftColumn() {
  return [
    // SUMMARY
    sectionHeading("Summary"),
    bodyPara(
      "Full Stack JavaScript Developer with 3+ years of professional experience building scalable, " +
      "production-level web applications using React.js, Next.js, Node.js, and MongoDB. " +
      "Currently working remotely with a UK-based company, contributing across full stack architecture, " +
      "API development, and performance optimization with a focus on clean architecture and maintainable systems. " +
      "Eager to take on high-impact projects in Europe or through remote opportunities.",
      { after: 80 },
    ),

    // EXPERIENCE
    sectionHeading("Experience"),

    ...jobBlock({
      role: "Freelance Full Stack Developer",
      company: "Upwork",
      meta: "01/2025 – Present   |   Remote",
      bullets: [
        "Delivered custom web solutions for international clients.",
        "Managed complete project lifecycle from requirements gathering to deployment.",
        "Built scalable frontend systems and backend API integrations.",
        "Worked with clients across multiple regions in remote collaboration setups.",
      ],
    }),

    divider(),

    ...jobBlock({
      role: "Software Engineer",
      company: "Jumppace Pvt Ltd",
      meta: "10/2023 – 11/2024   |   Karachi, Pakistan",
      bullets: [
        "Built production-level web applications using React.js and Node.js.",
        "Refactored reusable components to improve maintainability and performance.",
        "Assisted in backend API development and MongoDB schema design.",
        "Contributed to version control management and deployment processes.",
      ],
    }),

    divider(),

    ...jobBlock({
      role: "React.js Developer",
      company: "AZ Code Arena",
      meta: "04/2023 – 09/2023   |   Karachi, Pakistan",
      bullets: [
        "Developed responsive frontend interfaces from Figma designs.",
        "Integrated REST APIs and authentication systems.",
        "Ensured cross-browser compatibility and mobile responsiveness.",
      ],
    }),

    // EDUCATION
    sectionHeading("Education"),
    new Paragraph({
      children: [
        new TextRun({
          text: "Bachelor of Science in Computer Science",
          bold: true,
          size: SZ_ROLE,
          color: BLACK,
          font: "Arial",
        }),
      ],
      spacing: { before: 80, after: 30 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "NED University of Engineering & Technology",
          bold: true,
          size: SZ_ROLE,
          color: BLUE,
          font: "Arial",
        }),
      ],
      spacing: { after: 30 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "01/2023 – Expected 05/2026   |   Karachi, Pakistan",
          size: SZ_SMALL,
          color: LIGHT_GRAY,
          font: "Arial",
        }),
      ],
      spacing: { after: 60 },
    }),
  ];
}

// ── Right column ──────────────────────────────────────────────────────────────
function rightColumn() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "ES6+",
    "HTML5",
    "CSS3",
    "React",
    "Next.js",
    "Redux Toolkit",
    "Tailwind CSS",
    "Material UI",
    "Node.js",
    "Express.js",
    "NestJS",
    "REST APIs",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Docker",
    "AWS",
    "Vercel",
    "Heroku",
    "Git / GitHub",
    "Postman",
    "Figma",
    "Agile",
    "Clean Code",
    "Kotlin",
  ];

  const langRows = [
    { name: "English", level: "Professional", dots: "● ● ● ● ○" },
    { name: "Turkish", level: "Fluent", dots: "● ● ● ● ●" },
    { name: "Urdu", level: "Native", dots: "● ● ● ● ●" },
  ];

  return [
    // STRENGTHS
    sectionHeading("Strengths"),
    ...featureBlock({
      title: "Full Stack JavaScript Development",
      desc: "Full Stack JavaScript Development, Scalable REST API Architecture, MERN Stack Applications",
    }),
    ...featureBlock({
      title: "Clean Architecture & Systems Design",
      desc: "Performance Optimization, Reusable Component Architecture, Clean Code & Code Reviews",
    }),

    // KEY ACHIEVEMENTS
    sectionHeading("Key Achievements"),
    ...featureBlock({
      title: "High-Impact Project Deliveries",
      desc: "Successfully delivered multiple high-impact projects consistently ahead of deadlines while maintaining high-quality code standards.",
    }),
    ...featureBlock({
      title: "International Remote Collaboration",
      desc: "Worked effectively with clients and teams across Europe and Asia, adapting to varying time zones and workflows.",
    }),

    // LANGUAGES
    sectionHeading("Languages"),
    ...langRows.flatMap(({ name, level, dots }) => [
      new Paragraph({
        children: [
          new TextRun({ text: name, bold: true, size: SZ_BODY, color: BLACK, font: "Arial" }),
          new TextRun({ text: "  —  " + level, size: SZ_SMALL, color: GRAY, font: "Arial" }),
          new TextRun({ text: "   " + dots, size: SZ_SMALL, color: BLUE, font: "Arial" }),
        ],
        spacing: { before: 60, after: 60 },
        border: {
          bottom: { style: BorderStyle.DASHED, size: 4, color: "D1D5DB", space: 1 },
        },
      }),
    ]),

    // SKILLS
    sectionHeading("Skills"),
    // Render skills as a comma-separated flowing paragraph (most ATS-friendly)
    new Paragraph({
      children: skills
        .map((s, i) => [
          new TextRun({
            text: s,
            size: SZ_BODY,
            color: BLACK,
            font: "Arial",
            bold: false,
          }),
          ...(i < skills.length - 1
            ? [new TextRun({ text: "  ·  ", size: SZ_BODY, color: LIGHT_GRAY, font: "Arial" })]
            : []),
        ])
        .flat(),
      spacing: { after: 40 },
    }),
  ];
}

// ── No-border helper for table cells ─────────────────────────────────────────
const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: "auto" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
  left: { style: BorderStyle.NONE, size: 0, color: "auto" },
  right: { style: BorderStyle.NONE, size: 0, color: "auto" },
};

// ── Document ──────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: "bullet",
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 360, hanging: 200 } },
              run: { font: "Arial" },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, right: 900, bottom: 720, left: 900 },
        },
      },
      children: [
        // ── Name
        new Paragraph({
          children: [
            new TextRun({
              text: "SHAYAN FAREED",
              bold: true,
              size: SZ_NAME,
              color: BLACK,
              font: "Arial",
            }),
          ],
          spacing: { after: 60 },
        }),

        // ── Title
        new Paragraph({
          children: [
            new TextRun({
              text: "Full Stack JavaScript Developer",
              bold: true,
              size: SZ_TITLE,
              color: BLUE,
              font: "Arial",
            }),
          ],
          spacing: { after: 80 },
        }),

        // ── Contact bar
        new Paragraph({
          children: [
            new TextRun({
              text: "📞 +923082228141",
              size: SZ_SMALL,
              color: GRAY,
              font: "Segoe UI Emoji",
            }),
            new TextRun({ text: "   |   ", size: SZ_SMALL, color: LIGHT_GRAY, font: "Arial" }),
            new TextRun({
              text: "✉ sfx.deve@gmail.com",
              size: SZ_SMALL,
              color: GRAY,
              font: "Segoe UI Emoji",
            }),
            new TextRun({ text: "   |   ", size: SZ_SMALL, color: LIGHT_GRAY, font: "Arial" }),
            new TextRun({
              text: "🔗 linkedin.com/in/shayanfareed",
              size: SZ_SMALL,
              color: BLUE,
              font: "Segoe UI Emoji",
            }),
            new TextRun({ text: "   |   ", size: SZ_SMALL, color: LIGHT_GRAY, font: "Arial" }),
            new TextRun({
              text: "💻 github.com/sfxdeve",
              size: SZ_SMALL,
              color: BLUE,
              font: "Segoe UI Emoji",
            }),
            new TextRun({ text: "   |   ", size: SZ_SMALL, color: LIGHT_GRAY, font: "Arial" }),
            new TextRun({
              text: "📍 Karachi, Pakistan",
              size: SZ_SMALL,
              color: GRAY,
              font: "Segoe UI Emoji",
            }),
          ],
          spacing: { after: 0 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "D1D5DB", space: 80 },
          },
        }),

        // ── Spacer
        new Paragraph({ text: "", spacing: { after: 120 } }),

        // ── Two-column body table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE, size: 0, color: "auto" },
            bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
            left: { style: BorderStyle.NONE, size: 0, color: "auto" },
            right: { style: BorderStyle.NONE, size: 0, color: "auto" },
            insideH: { style: BorderStyle.NONE, size: 0, color: "auto" },
            insideV: { style: BorderStyle.NONE, size: 0, color: "auto" },
          },
          rows: [
            new TableRow({
              children: [
                // Left 58 %
                new TableCell({
                  width: { size: 58, type: WidthType.PERCENTAGE },
                  borders: noBorder,
                  margins: { right: 400 },
                  children: leftColumn(),
                }),
                // Right 42 %
                new TableCell({
                  width: { size: 42, type: WidthType.PERCENTAGE },
                  borders: noBorder,
                  margins: { left: 400 },
                  children: rightColumn(),
                }),
              ],
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc)
  .then((buffer) => {
    writeFileSync(OUT, buffer);
    console.log("✅  Resume saved →", OUT);
  })
  .catch((err) => {
    console.error("❌  Error:", err.message);
    process.exit(1);
  });
