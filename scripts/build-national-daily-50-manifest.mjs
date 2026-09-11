import fs from "node:fs";

const base = "https://studyhigh.co.kr";
const createdAt = "2026-09-11";
const batch = "daily-50-20260911";
const subjectNames = { math: "수학", english: "영어", korean: "국어", science: "과학", social: "사회" };
const places = [
  ["seoul","서울특별시","yongsan-gu","용산구","cheongpa-dong","청파동","town:1117055500"],
  ["seoul","서울특별시","yongsan-gu","용산구","seobinggo-dong","서빙고동","town:1117069000"],
  ["seoul","서울특별시","yongsan-gu","용산구","bogwang-dong","보광동","town:1117070000"],
  ["seoul","서울특별시","seongdong-gu","성동구","wangsimnidoseon-dong","왕십리도선동","town:1120053500"],
  ["seoul","서울특별시","seongdong-gu","성동구","majang-dong","마장동","town:1120054000"],
  ["seoul","서울특별시","seongdong-gu","성동구","sageun-dong","사근동","town:1120055000"],
  ["seoul","서울특별시","seongdong-gu","성동구","eungbong-dong","응봉동","town:1120058000"],
  ["seoul","서울특별시","seongdong-gu","성동구","oksu-dong","옥수동","town:1120064500"],
  ["seoul","서울특별시","gwangjin-gu","광진구","hwayang-dong","화양동","town:1121571000"],
  ["seoul","서울특별시","gwangjin-gu","광진구","gwangjang-dong","광장동","town:1121581000"],
];
const topics = {
  math:["이차함수 축과 꼭짓점","부등식 해의 범위","삼각형 닮음 조건","순열 조합 기준","수열 점화식 해석","로그 밑 조건","유리함수 점근선","공간벡터 좌표화","도함수 증가 감소","정적분 부호 판단"],
  english:["다의어 문맥 판별","분사구문 의미 관계","무관한 문장 찾기","연결사 논리 전개","영작 핵심어 배열","가정법 시제 일치","요지와 빈칸 연결","복합 지문 정보","듣기 숫자 정보","독해 검토 순서"],
  korean:["독서 문단 기능","시적 화자 태도","서사 전개 방식","고전시가 화자 상황","문장 성분 구별","오답 선택지 범위","토론 논거 평가","작문 조건 점검","비판적 읽기 근거","갈래별 표현 효과"],
  science:["실험군 대조군 구분","속도 시간 그래프","화학식 양적 관계","운동량 보존 판단","세포 분열 단계","저항 연결 계산","별의 밝기 비교","상태 변화 열출입","화학 평형 이동","빛의 굴절 경로"],
  social:["지형도 등고선 해석","인구 이동 원인","수요 공급 변화","권력 분립 사례","세계사 시대 연결","윤리 원칙 적용","형사 절차 이해","무역 자료 분석","사회화 기관 비교","여론 조사 판단"],
};
const concerns=[
  "문제를 읽자마자 계산부터 시작해 중요한 조건을 빠뜨립니다.","배운 개념을 말로 설명하지 못해 새로운 유형에서 멈춥니다.","오답의 원인을 적지 않고 답만 고쳐 같은 실수를 반복합니다.","시험 범위를 늦게 시작해 취약 단원에 시간을 충분히 쓰지 못합니다.","혼자 공부할 때 질문할 지점을 찾지 못하고 오래 멈춰 있습니다.","쉬운 문항에 시간을 과하게 사용해 검토 시간이 부족합니다.","학교 자료와 문제집을 따로 외워 개념 사이의 연결이 약합니다.","수업 직후에는 이해하지만 며칠 뒤 풀이 순서를 재현하지 못합니다.","여러 자료가 나오면 핵심 정보와 보조 정보를 구분하기 어렵습니다.","목표는 있지만 주간 계획과 실제 수행량을 비교하지 않습니다."
];
const methods=[
  "조건에 번호를 붙이고 사용한 근거를 풀이 줄마다 연결해 마지막에 누락을 점검합니다.","개념을 자기 말로 설명한 다음 표현이 다른 두 문제에 같은 판단 기준을 적용합니다.","오류가 시작된 줄을 표시하고 당일 재풀이와 사흘 뒤 변형 문제를 묶어 복습합니다.","시험 범위를 주차별로 나누고 개념, 학교 자료, 오답 회수 순으로 완료 여부를 기록합니다.","막힌 순간에 질문 꼬리표를 붙이고 수업 후 혼자 답할 수 있는지 다시 확인합니다.","문항별 목표 시간을 정하고 근거가 약한 문제만 표시해 마지막 검토 때 돌아옵니다.","교과서 개념 옆에 학교 프린트와 문제집의 대응 문항 번호를 함께 적습니다.","수업 다음 날 빈 종이에 핵심 순서를 복원하고 빠진 단계를 짧게 보완합니다.","필수 정보와 보조 정보를 표로 나누고 하나를 뺐을 때 결론이 달라지는지 확인합니다.","주간 목표를 세 번의 짧은 과제로 나눠 수행률과 정확도를 함께 비교합니다."
];
const subjectActions={
  math:"정의와 조건을 기호로 옮긴 뒤 계산식의 각 줄이 어떤 성질을 사용했는지 말하게 하고, 검산에서는 대입과 역산 중 알맞은 방법을 선택합니다.",
  english:"어휘의 문맥 의미를 확인하고 주절과 수식어를 색으로 나눈 뒤, 해석·요약·서술형 문장으로 이어지는 과정을 학생이 직접 설명합니다.",
  korean:"지문에서 화자·주장·근거를 서로 다른 표시로 구분하고, 선택지의 표현이 본문 범위를 벗어나는지 문장 단위로 대조합니다.",
  science:"관찰 사실과 해석을 분리하고 단위·변인·그래프 축을 먼저 점검한 뒤, 실험 조건이 바뀔 때 예상 결과와 이유를 함께 기록합니다.",
  social:"시간·공간·제도·가치의 관점을 먼저 정하고 표와 지도, 사례의 근거를 연결한 뒤 반대 사례에서도 같은 판단 기준이 유지되는지 확인합니다."
};
const transitions=["먼저","첫 단계에서는","학습 기록을 펼치면","수업 초반에는","진단 과정에서는","시험 계획을 세울 때","복습을 시작할 때","주간 점검에서는","학생과 대화할 때","학부모 상담에서는"];
const evidence=["풀이가 멈춘 줄","정답을 바꾼 흔적","숙제를 시작한 시간","질문을 남긴 위치","교과서에 표시한 부분","학교 프린트의 오답","시험 범위표의 진도","문항별 소요 시간","학생이 설명한 문장","일주일 수행 기록"];
const management=["하루 분량을 작게 나눕니다","완료 여부보다 설명 가능 여부를 봅니다","오답을 원인별로 다시 묶습니다","다음 복습 날짜를 바로 정합니다","도움 없이 푼 단계를 구분합니다","학습 순서를 학생과 함께 정합니다","시험 전 점검 횟수를 확보합니다","집중이 끊긴 시점을 기록합니다","숙제 난이도를 단계적으로 조절합니다","학부모에게 변화와 다음 목표를 공유합니다"];
const wordVariants={
  "학생":["학생","아이","수강생","청소년","학령기 자녀","학교생활 중인 아이","배우는 자녀"],
  "확인":["확인","점검","검토","파악","살핌","진단","대조"],
  "학습":["학습","공부","교과 학습","배움","학업","교과 공부","과목 연습"],
  "기록":["기록","학습 흔적","노트","과정표","메모","풀이 이력","복습 표"],
  "방식":["방식","방법","진행법","접근법","수업 흐름","지도 형태","피드백 흐름"],
  "자료":["자료","교재","학습물","수업 문서","준비 자료","학업 자료","수업 기록물"],
  "수업":["수업","지도","개별 학습","1:1 시간","교습","맞춤 시간","학습 세션"],
  "학교":["학교","재학 학교","교내","학교 현장","교육기관","재학 기관","교실"],
  "문제":["문제","문항","과제 문항","연습 항목","질문","풀이 대상","시험 문항"],
  "설명":["설명","풀이 해설","말로 풀기","근거 전달","개념 표현","사고 과정 공유","이유 제시"],
  "선생님":["선생님","지도자","담당 교사","과외 교사","학습 코치","지도 선생님","담당 선생님"],
  "진도":["진도","학습 범위","현재 범위","수업 범위","교과 진행","단원 진행","배운 범위"],
  "시험":["시험","평가","학교 평가","지필평가","내신 시험","평가 일정","시험 준비"],
  "과정":["과정","절차","흐름","단계","진행","경로","학습 순서"],
  "근거":["근거","판단 이유","풀이 이유","선택 이유","본문 단서","해결 단서","사고 단서"]
};
function personalize(text,pageIndex){
  const multipliers=[1,3,7,11,13,17];
  return Object.entries(wordVariants).reduce((value,[word,variants],variantIndex)=>value.replaceAll(word,variants[(pageIndex*multipliers[variantIndex]+Math.floor(pageIndex/5))%variants.length]),text);
}
function buildLongForm({pageIndex,townName,sido,sigungu,school,grade,subject,theme,concern,method,exam}){
  const main = Array.from({length:20},(_,paragraphIndex)=>{
    const a=transitions[(pageIndex+paragraphIndex*3)%transitions.length];
    const b=evidence[(pageIndex*3+paragraphIndex*7)%evidence.length];
    const c=management[(pageIndex*7+paragraphIndex*9)%management.length];
    const d=evidence[(pageIndex*9+paragraphIndex*2+3)%evidence.length];
    const e=management[(pageIndex*4+paragraphIndex*3+6)%management.length];
    const f=evidence[(pageIndex*2+paragraphIndex*5+1)%evidence.length];
    const g=management[(pageIndex*6+paragraphIndex*7+2)%management.length];
    const protectedValues={"__SIDO__":sido,"__SIGUNGU__":sigungu,"__TOWN__":townName,"__GRADE__":grade,"__SUBJECT__":subject,"__THEME__":theme,"__SCHOOL__":school.name,"__CONCERN__":concern,"__METHOD__":method,"__EXAM__":exam};
    let paragraph=personalize(`__THEME__을 다루는 __TOWN__ __GRADE__ __SUBJECT__ 수업은 결과표보다 학습 행동을 읽는 데서 출발합니다. ${a} ${b}에 남은 흔적을 통해 어디까지 스스로 판단했는지 구분하고, 다음 시도에서는 ${c}. __SCHOOL__ 관련 준비는 공개 정보로 단정하지 않고 학생이 가져온 ${d}, 교과 범위와 실제 진도를 기준으로 ${e}. __CONCERN__ 따라서 양을 늘리기 전에 ${f}을 말로 설명하도록 하여 막힘의 성격을 찾습니다. 이어서 ${g}. __METHOD__ 생활 리듬은 __SIDO__ __SIGUNGU__ 통학 시간과 주중 일정에 맞춰 조절합니다. 선생님의 경력만 비교하지 않고 아이가 질문을 꺼낼 수 있는 분위기, 피드백을 이해하는 속도, 숙제를 수행하는 방식의 궁합을 함께 봅니다. 보호자와는 완료한 과제와 남은 오답, 다음 목표를 구분해 소통합니다. __EXAM__`,pageIndex+317);
    for(const [placeholder,value] of Object.entries(protectedValues)) paragraph=paragraph.replaceAll(placeholder,value);
    return paragraph;
  });
  const appendix = Array.from({length:14},(_,index)=>{
    const observed=evidence[(pageIndex+index*3)%evidence.length];
    const managed=management[(pageIndex*2+index*7)%management.length];
    const opening=transitions[(pageIndex*5+index*2)%transitions.length];
    const followup=evidence[(pageIndex*7+index*5+4)%evidence.length];
    return `${townName} ${grade} ${subject}의 ${theme} 점검 ${index+1}에서는 ${observed}을 출발점으로 삼습니다. ${school.name} ${subject} 준비 자료를 볼 때는 ${managed}. ${townName} 학생이 남긴 ${theme} 풀이에서 ${opening} ${followup}을 다시 설명하게 하여 개념 이해와 습관 문제를 나눕니다. ${townName} ${subject} 과제는 학생의 실제 집중 시간에 맞춰 조정하고, ${theme} 복습 결과는 맞힌 개수와 혼자 해결한 단계를 구분해 기록합니다. ${school.name}의 시험 특성을 추측하지 않으며 ${grade} 학생이 제공한 최신 범위와 자료만 사용합니다. ${townName} 생활권 일정, ${subject} 질문 방식, ${theme} 오답 회수 속도를 함께 살펴 다음 목표를 정합니다.`;
  });
  const distinctive = Array.from({length:12},(_,index)=>{
    const observed=evidence[(pageIndex*11+index*7)%evidence.length];
    const next=evidence[(pageIndex*13+index*3+2)%evidence.length];
    return `${townName} ${theme} 루틴 ${index+1}은 ${school.name} ${subject} 자료의 ${observed}에서 시작합니다. ${townName} ${grade} 학생은 ${theme} 판단을 말로 남기고 ${townName} ${subject} 복습표에 ${next}을 표시합니다. ${school.name} ${theme} 진도는 학생이 제시한 범위만 따르며 ${townName} 생활 일정에 맞춰 ${subject} 숙제를 나눕니다. ${townName} ${theme} 피드백은 보호자에게 수행 사실과 다음 행동을 구분해 전달합니다.`;
  });
  return [...main, ...appendix, ...distinctive];
}

const outputName=`daily-50-${createdAt.replaceAll("-","")}.json`;
const existingFiles=fs.readdirSync("data/manifests/national").filter((name)=>name.endsWith(".json")&&name!==outputName);
const existingRecords=existingFiles.flatMap((name)=>JSON.parse(fs.readFileSync(`data/manifests/national/${name}`,"utf8")).records||[]);
const existingUrls=new Set(existingRecords.map((record)=>record.page.url));
const records=[];
for(let placeIndex=0;placeIndex<places.length;placeIndex+=1){
  const [provinceSlug,sido,districtSlug,sigungu,townSlug,townName,townId]=places[placeIndex];
  const regions=JSON.parse(fs.readFileSync(`data/regions/${provinceSlug}.json`,"utf8"));
  const schools=JSON.parse(fs.readFileSync(`data/schools/${provinceSlug}.json`,"utf8"));
  const district=regions.districts.find((item)=>item.slug===districtSlug);
  const town=district?.towns.find((item)=>item.id===townId);
  if(!town||town.slug!==townSlug||/[0-9]/.test(town.name)) throw new Error(`Invalid town ${townName}`);
  const school=schools.schools.find((item)=>item.region.townId===townId&&["middle","high"].includes(item.schoolType)&&!item.id.includes("pending"));
  if(!school||!town.schoolIds.includes(school.id)) throw new Error(`No verified school ${townName}`);
  const grade=school.schoolType==="middle"?"중등":"고등";
  for(const [subjectSlug,subject] of Object.entries(subjectNames)){
    const subjectIndex=Object.keys(subjectNames).indexOf(subjectSlug);
    const pageIndex=placeIndex*Object.keys(subjectNames).length+subjectIndex;
    const theme=topics[subjectSlug][placeIndex];
    const concern=`${theme} 학습에서 ${concerns[pageIndex%concerns.length]}`;
    const method=`${theme}을 보완할 때는 ${methods[placeIndex]} 이어서 ${methods[(placeIndex+subjectIndex+3)%methods.length]}`;
    const url=`/tutoring/${provinceSlug}/${districtSlug}/${townSlug}/${subjectSlug}`;
    if(existingUrls.has(url)) throw new Error(`Existing URL ${url}`);
    const canonical=base+url;
    const title=`${townName} ${grade} ${subject}과외 | ${theme} 맞춤 관리 | 스터디하이`;
    const description=`${sido} ${sigungu} ${townName} ${grade} ${subject}과외에서 ${concern} ${method} ${school.name}의 최신 학습 자료를 확인해 학생별 학습 순서를 설계합니다.`;
    const exam=`${school.name}의 공개되지 않은 시험 난이도나 출제 비율은 단정하지 않습니다. 학생이 가진 최신 시험 범위표, 교과서, 학교 프린트와 오답에서 ${theme} 관련 항목을 확인합니다.`;
    const faq=[
      {question:`${townName} ${grade} ${subject}과외에서 ${theme}은 어떻게 진단하나요?`,answer:`최근 풀이를 학생이 직접 설명하게 해 멈추는 지점과 반복 행동을 확인합니다. ${method}`},
      {question:`${school.name} ${subject} 내신 준비에는 어떤 자료가 필요한가요?`,answer:`${exam} 확인된 자료만으로 개념 보완과 시험 대비 순서를 정합니다.`}
    ];
    const imagePath=`/api/seo-thumbnail?dong=${encodeURIComponent(townName)}&subject=${subjectSlug}`;
    const longForm=buildLongForm({pageIndex,townName,sido,sigungu,school,grade,subject,theme,concern,method,exam});
    records.push({
      id:`page:national:${createdAt.replaceAll("-","")}:${String(records.length+1).padStart(3,"0")}`,status:"validated",createdAt,
      region:{sido,sigungu,eupmyeondong:townName,provinceSlug,districtSlug,townSlug,townId,sourceTownId:townId},
      school:{id:school.id,name:school.name,type:school.schoolType,typeName:school.schoolTypeName,address:school.address.road,addressDetail:school.address.detail,source:schools.meta.source,sourceDate:schools.meta.sourceDate},
      page:{url,canonical,title,description,grade,subject,subjectSlug},
      content:{theme,introduction:`${townName} ${grade} ${subject} 학습은 문제 수보다 학생이 혼자 설명하고 다시 풀 수 있는지 확인하는 데서 시작합니다. ${concern}`,regionContext:`${sido} ${sigungu} ${townName} 생활권에서 ${school.name} 통학 일정과 현재 진도, 가능한 수업 시간을 함께 확인해 ${theme} 계획을 조정합니다.`,schoolAnalysis:`${school.name}은 프로젝트 학교 기본정보에서 ${sido} ${sigungu} 소재 ${school.schoolTypeName}로 확인됩니다. 세부 시험 정보는 학생이 제공한 최신 자료가 있을 때만 반영합니다.`,exam,examCaveat:"확인되지 않은 학교별 난이도와 출제 경향은 만들지 않습니다.",concern,difficultUnit:`${theme} 진단에서는 ${subjectActions[subjectSlug]} ${methods[(placeIndex+subjectIndex*2+6)%methods.length]}`,studyMethod:method,parentConcern:`문제 양을 늘려도 변화가 적다는 고민에는 학생의 성향, 집중 시간, 숙제 수행과 설명 방식의 적합성을 함께 살핍니다. 잘 가르치는 선생님과 아이에게 잘 맞는 선생님은 다를 수 있어 소통 방식도 진단합니다.`,workedExample:`${theme} 대표 문항을 학생이 소리 내어 설명한 뒤 조건 표현이 달라진 문항에 적용합니다. 맞힌 문제도 근거가 불분명하면 복습 대상으로 기록합니다.`,lesson:"현재 수준 진단부터 공부 방법 교정, 주간 계획, 숙제·오답 관리, 자기주도 복습까지 연결합니다. 학부모에게 집중도와 취약 지점, 다음 계획을 정기적으로 공유합니다.",longForm,faq},
      seo:{title,description,canonical,ogTitle:title,ogDescription:description,ogImage:base+imagePath,keywords:[`${townName} ${grade} ${subject}과외`,`${school.name} ${subject} 내신`,`${sigungu} 1:1 과외`,theme]},
      aeo:{questions:faq.map((item)=>item.question),answers:faq.map((item)=>item.answer),faqPageSchema:{"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map((item)=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))}},
      geo:{region:`${sido} ${sigungu} ${townName}`,school:school.name,grade,subject,localLearningContext:`${townName} 생활권의 통학 일정과 ${school.name} 진도, 학생의 ${theme} 어려움을 연결해 방문 또는 화상 수업 시간과 학습 순서를 정합니다.`},
      image:{masterImage:"/thumbnails/studyhigh-official-template.png",imagePath,imageUrl:base+imagePath,alt:`${townName} ${grade} ${subject}과외 대표 이미지`,regionText:townName,subjectText:`${subject}과외`,width:1200,height:1200},
      provenance:{regionFile:`data/regions/${provinceSlug}.json`,schoolFile:`data/schools/${provinceSlug}.json`,schoolId:school.id,sourceTownId:townId,teachingAdvice:"editorial-general-guidance",verifiedSchoolExamPattern:false}
    });
  }
}
if(records.length!==50) throw new Error(`Expected 50, got ${records.length}`);
for(const field of ["url","title","description","canonical"]){const values=records.map((r)=>field==="description"?r.page.description:r.page[field]);if(new Set(values).size!==50)throw new Error(`Duplicate ${field}`);}
fs.writeFileSync(`data/manifests/${outputName}`,JSON.stringify({version:1,batch,expansionStage:["서울"],records},null,2)+"\n");
console.log(JSON.stringify({batch,count:records.length,seoul:records.filter((r)=>r.region.sido==="서울특별시").length},null,2));
