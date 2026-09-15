import fs from "node:fs";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const records = JSON.parse(fs.readFileSync("data/manifests/nationwide/official-school-sample-20.json", "utf8")).records;
const results = [];
for (const record of records) {
  const response = await fetch(`${base}${record.page.url}`);
  const html = await response.text();
  const checks = {
    status: response.status,
    title: html.includes(record.page.title),
    description: html.includes(record.page.description),
    canonical: html.includes(record.page.canonical),
    ogImage: html.includes(`https://studyhigh.co.kr${record.image.path.replaceAll("&", "&amp;")}`) || html.includes(`https://studyhigh.co.kr${record.image.path}`),
    school: html.includes(record.school.name),
    region: html.includes(record.region.representativeRegion),
    grade: html.includes(record.page.grade),
    subject: html.includes(record.page.subject),
    faqContent:
      record.content.faq.length >= 5 &&
      record.content.faq.every((item) => html.includes(item.question) && html.includes(item.answer)),
    faqSchema: html.includes('"@type":"FAQPage"') || html.includes('\\"@type\\":\\"FAQPage\\"'),
  };
  results.push({ url: record.page.url, ...checks, pass: response.status === 200 && Object.values(checks).slice(1).every(Boolean) });
}
const failed = results.filter((result) => !result.pass);
console.log(JSON.stringify({ base, total: results.length, http200: results.filter((result) => result.status === 200).length, passed: results.length - failed.length, failed }, null, 2));
if (failed.length) process.exit(1);
