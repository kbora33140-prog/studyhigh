import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const out = path.join(os.tmpdir(), 'studyhigh-new50-20260901');
await fs.mkdir(out, { recursive: true });
const mode = process.argv[2] || 'baseline';
const base = process.argv[3] || 'https://studyhigh.co.kr';
const records = JSON.parse(await fs.readFile('data/manifests/daejeon/additional-50-20260901.json', 'utf8')).records;
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
const decode = s => (s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const text = s => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(x => [x[1], decode(x[2])]));
async function request(url) {
  let last;
  for (let n=0;n<3;n++) try { const r = await fetch(url, { signal: AbortSignal.timeout(60000) }); const b=Buffer.from(await r.arrayBuffer());return { status:r.status, mime:r.headers.get('content-type'), body:b, final:r.url }; } catch(e) { last=e; }
  throw last;
}
async function pool(items, fn) { let i=0; const res=[];await Promise.all(Array.from({length:6},async()=>{while(i<items.length){const j=i++;res[j]=await fn(items[j],j);}}));return res; }
function parse(html) {
  const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(x=>{const a=attrs(x[0]);return [a.property||a.name,a.content];}));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(x=>attrs(x[0])).find(x=>x.rel==='canonical')?.href;
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const article = main.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || main;
  const images = [...main.matchAll(/<img\b[^>]*>/g)].map(x=>attrs(x[0]));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>{try{return JSON.parse(x[1]);}catch{return null;}});
  return { title:decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]), description:metas.description, canonical,
    ogTitle:metas['og:title'],ogDescription:metas['og:description'],ogImage:metas['og:image'],ogUrl:metas['og:url'], robots:metas.robots||'',
    bodyText:text(article),
    // Compare prose, not identical navigation/buttons/section labels required by the shared design.
    contentText:[...new Set([...article.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(x=>text(x[1])).filter(x=>! /^(QUICK ANSWER|STUDY GUIDE|PERSONAL DIAGNOSIS|CONSULTATION PROCESS|0[123] ·)/.test(x)))].join(' '),
    mainSignature:hash(text(main)), images:images.map(x=>({src:x.src,alt:x.alt})), schemas,
    sectionClasses:[...article.matchAll(/<section\b[^>]*>/g)].map(x=>attrs(x[0]).class),
    links:[...main.matchAll(/<a\b[^>]*>/g)].map(x=>attrs(x[0]).href).filter(Boolean) };
}
async function sitemap() {const r=await request(base+'/sitemap.xml'); if(r.status!==200)throw Error('sitemap status'); return [...r.body.toString().matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>decode(x[1]));}
const map=await sitemap();
const master=await request(base+'/thumbnails/studyhigh-official-template.png');
if(mode==='baseline') {
  const urls=map.filter(x=>x.includes('/tutoring/'));
  if(urls.length!==101)throw Error(`Baseline count changed: ${urls.length}`);
  const pages=await pool(urls,async url=>{const r=await request(url);if(r.status!==200)throw Error(url);return {url,...parse(r.body.toString())};});
  const imageUrls=[...new Set(pages.map(p=>p.ogImage).filter(Boolean))];
  const images=await pool(imageUrls,async url=>{const r=await request(url);return {url,status:r.status,mime:r.mime,sha256:hash(r.body)};});
  await fs.writeFile(path.join(out,'baseline.json'),JSON.stringify({checkedAt:new Date().toISOString(),map,pages,images,master:hash(master.body)}));
  console.log(JSON.stringify({mode,pages:pages.length,images:images.length,master:hash(master.body),out}));
} else {
  const baseline=JSON.parse(await fs.readFile(path.join(out,'baseline.json'),'utf8'));
  const errors=[];
  const existing=new Set(baseline.pages.map(x=>x.url));
  const seen=new Set();const titles=new Set(baseline.pages.map(x=>x.title));
  const fresh=await pool(records,async r=>{
    const res=await request(base+r.page.url);const p=parse(res.body.toString());
    if(res.status!==200)errors.push(`${r.id}: HTTP ${res.status}`);
    if(existing.has(r.page.canonical)||seen.has(r.page.url))errors.push(`${r.id}: URL collision`);seen.add(r.page.url);
    if(titles.has(p.title))errors.push(`${r.id}: title duplicate`);titles.add(p.title);
    for(const [field,value] of Object.entries({title:r.seo.title,description:r.seo.description,canonical:r.page.canonical,ogTitle:r.seo.title,ogDescription:r.seo.description,ogImage:r.image.imageUrl,ogUrl:r.page.canonical})) if(p[field]!==value)errors.push(`${r.id}: ${field}`);
    if(/noindex/.test(p.robots))errors.push(`${r.id}: noindex`);
    if(!p.images.some(x=>x.src===r.image.imagePath&&x.alt===r.image.alt))errors.push(`${r.id}: image/alt`);
    const faq=p.schemas.find(x=>x?.['@type']==='FAQPage');
    if(!faq||JSON.stringify(faq.mainEntity.map(x=>({question:x.name,answer:x.acceptedAnswer?.text})))!==JSON.stringify(r.content.faq))errors.push(`${r.id}: FAQ schema`);
    for(const t of [r.region.sido,r.region.sigungu,r.region.eupmyeondong,r.school.name,r.page.grade,r.page.subject,r.content.studyMethod]) if(!p.bodyText.includes(t))errors.push(`${r.id}: GEO ${t}`);
    const sections=['QUICK ANSWER','STUDY GUIDE','PERSONAL DIAGNOSIS','CONSULTATION PROCESS'];let pos=-1;for(const s of sections){const next=p.bodyText.indexOf(s);if(next<=pos)errors.push(`${r.id}: section ${s}`);pos=next;}
    if(!map.includes(r.page.canonical))errors.push(`${r.id}: sitemap`);
    if(!p.links.some(x=>records.some(y=>y.page.url===x)))errors.push(`${r.id}: internal link`);
    const img=await request(base+r.image.imagePath);const m=await sharp(img.body).metadata().catch(()=>({}));
    if(img.status!==200||!img.mime?.startsWith('image/png')||m.width!==1254||m.height!==1254||m.format!=='png')errors.push(`${r.id}: image format/status`);
    if(hash(img.body)!==hash(await fs.readFile(path.join(root,'public',r.image.imagePath))))errors.push(`${r.id}: image bytes`);
    return {url:r.page.canonical,status:res.status,...p,imageStatus:img.status};
  });
  for(const url of baseline.map)if(!map.includes(url))errors.push('Removed sitemap '+url);
  if(map.length!==baseline.map.length+50||new Set(map).size!==map.length)errors.push('Sitemap total/duplicates');
  if(hash(master.body)!==baseline.master)errors.push('MASTER changed');
  const regression=await pool(baseline.pages,async old=>{const res=await request(base+new URL(old.url).pathname);const p=parse(res.body.toString());const fields=['title','description','canonical','ogTitle','ogDescription','ogImage','mainSignature','images','schemas','sectionClasses'];for(const f of fields)if(JSON.stringify(p[f])!==JSON.stringify(old[f]))errors.push(`Regression ${old.url}: ${f}`);if(res.status!==200)errors.push(`Regression HTTP ${old.url}`);return {url:old.url,status:res.status};});
  if(mode==='production')await pool(baseline.images,async old=>{const res=await request(old.url);if(res.status!==old.status||hash(res.body)!==old.sha256)errors.push('Existing image changed '+old.url);});
  const robots=await request(base+'/robots.txt');const robotText=robots.body.toString();
  if(robots.status!==200||/^Disallow:\s*\/\s*$/m.test(robotText)||/Disallow:.*(?:tutoring|seo-images)/i.test(robotText))errors.push('robots blocked');
  // Character 5-gram Jaccard of rendered prose paragraphs. Shared controls and
  // headings are UI, not authored prose. Disclaimers and school facts remain.
  // Region/school labels normalized to expose simple substitutions.
  const labels=[...new Set(records.flatMap(r=>[r.region.eupmyeondong,r.school.name]))].sort((a,b)=>b.length-a.length);
  function grams(t){for(const label of labels)t=t.replaceAll(label,'지역학교');const s=t.replace(/[^가-힣a-z0-9]/gi,'');return new Set(Array.from({length:Math.max(0,s.length-4)},(_,i)=>s.slice(i,i+5)));}
  const all=[...baseline.pages,...fresh];const sets=all.map(p=>grams(p.contentText||p.bodyText));let maximum=0;let pair=[];
  for(let i=baseline.pages.length;i<all.length;i++)for(let j=0;j<i;j++){let n=0;for(const g of sets[i])if(sets[j].has(g))n++;const score=n/(sets[i].size+sets[j].size-n);if(score>maximum){maximum=score;pair=[all[i].url,all[j].url];}}
  if(maximum>0.2)errors.push(`Content similarity ${maximum}`);
  const report={mode,checkedAt:new Date().toISOString(),newPages:fresh.length,http200:fresh.filter(p=>p.status===200).length,image200:fresh.filter(p=>p.imageStatus===200).length,regression:regression.length,sitemap:map.length,tutoring:map.filter(x=>x.includes('/tutoring/')).length,maximumSimilarity:maximum,mostSimilarPair:pair,masterUnchanged:hash(master.body)===baseline.master,robots:robots.status,errors};
  await fs.writeFile(path.join(out,mode+'.json'),JSON.stringify(report,null,2));
  await fs.writeFile(path.join(out,mode+'-pages.json'),JSON.stringify(fresh));
  console.log(JSON.stringify(report));if(errors.length)process.exitCode=1;
}
