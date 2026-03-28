const AdmZip = require("adm-zip");
const path = require("path");

const filePath = path.join(__dirname, "Lec 7_Biological macromolecules.pptx");
const zip = new AdmZip(filePath);
const entries = zip.getEntries();

for (const entry of entries) {
  if (
    entry.entryName.startsWith("ppt/slides/slide") &&
    entry.entryName.endsWith(".xml")
  ) {
    const content = entry.getData().toString("utf8");
    // Extract text between <a:t> tags
    const matches = content.match(/<a:t>([^<]*)<\/a:t>/g);
    if (matches) {
      const slideNum = entry.entryName.match(/slide(\d+)/)[1];
      console.log(`\n--- Slide ${slideNum} ---`);
      const texts = matches.map((m) => m.replace(/<\/?a:t>/g, ""));
      console.log(texts.join(" "));
    }
  }
}
