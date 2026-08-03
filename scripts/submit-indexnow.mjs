const HOST = "studyhigh.co.kr";
const SITE_URL = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://searchadvisor.naver.com/indexnow";
const KEY = "8b1e4f37a6c942d0b573e91f24ad680c";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

async function collectUrls() {
  const explicitUrls = process.argv.slice(2);

  if (explicitUrls.length > 0) {
    return explicitUrls.map((url) => new URL(url, SITE_URL).href);
  }

  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Unable to fetch sitemap: HTTP ${response.status}`);
  }

  const sitemap = await response.text();
  return [...sitemap.matchAll(/<loc>(https:\/\/studyhigh\.co\.kr\/tutoring\/[^<]+)<\/loc>/g)]
    .map((match) => match[1]);
}

const urls = [...new Set(await collectUrls())];

if (urls.length === 0) {
  throw new Error("No tutoring URLs found for IndexNow submission.");
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${body}`.trim());
}

console.log(`IndexNow submission complete: HTTP ${response.status}, URLs ${urls.length}`);
