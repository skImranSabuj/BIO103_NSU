const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const files = [
  "L1_L2-BIO103-Intro-Characterization+of+life_FHA.pdf",
  "L3-Biological+Classification_FHA.pdf",
  "L4-History+of+biology_FHA.pdf",
  "L5-BIO-Organization+of+life_FHA.pdf",
  "L6-BIO-Chemistry of life_FHA.pdf",
  "Lec-8,9_FHA_Cells.pdf",
  "Lec-10_CDL_FHA.pdf",
  "Lec-11_12_Energy+of+Life.pdf",
];

(async () => {
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.log(`\n=== FILE NOT FOUND: ${file} ===\n`);
      continue;
    }
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await PDFParse(dataBuffer);
      console.log(`\n========== ${file} ==========\n`);
      console.log(data.text);
    } catch (err) {
      console.log(`\n=== ERROR reading ${file}: ${err.message} ===\n`);
    }
  }
})();
