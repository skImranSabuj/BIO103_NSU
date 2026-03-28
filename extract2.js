const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");

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

async function extractPDF(file) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      resolve(`\n=== FILE NOT FOUND: ${file} ===\n`);
      return;
    }
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";
      if (pdfData && pdfData.Pages) {
        for (const page of pdfData.Pages) {
          for (const textItem of page.Texts || []) {
            for (const run of textItem.R || []) {
              try {
                text += decodeURIComponent(run.T) + " ";
              } catch (e) {
                text += run.T + " ";
              }
            }
          }
          text += "\n---PAGE---\n";
        }
      }
      resolve(`\n========== ${file} ==========\n${text}`);
    });
    pdfParser.on("pdfParser_dataError", (errData) => {
      resolve(`\n=== ERROR reading ${file}: ${errData} ===\n`);
    });
    pdfParser.loadPDF(filePath);
  });
}

(async () => {
  for (const file of files) {
    const result = await extractPDF(file);
    process.stdout.write(result);
  }
})();
