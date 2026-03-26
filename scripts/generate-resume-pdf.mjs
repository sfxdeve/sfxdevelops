/**
 * generate-resume-pdf.mjs
 * Uses Chrome headless to convert public/resume.html → public/Shayan_Fareed_Resume.pdf
 * Run: node scripts/generate-resume-pdf.mjs
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const HTML = join(__dir, "../public/resume.html");
const OUT = join(__dir, "../public/Shayan_Fareed_Resume.pdf");

const CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
];

const chrome = CHROME_PATHS.find(existsSync);
if (!chrome) {
  console.error("❌  Chrome / Chromium not found. Install Chrome and retry.");
  process.exit(1);
}

console.log("🖨  Generating PDF...");
execSync(
  `"${chrome}" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --print-to-pdf="${OUT}" \
    --print-to-pdf-no-header \
    --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=5000 \
    "file://${HTML}"`,
  { stdio: "inherit" },
);

console.log("✅  PDF saved →", OUT);
