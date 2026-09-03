import fs from "node:fs";

const base = "https://studyhigh.co.kr";
const createdAt = "2026-09-03";
const subjectNames = { math: "수학", english: "영어", korean: "국어", science: "과학", social: "사회" };

const places = [
  ["seoul", "서울특별시", "gangnam-gu", "강남구", "daechi-dong", "대치동", "town:1168061000", ["math","english","korean","science","social"]],
  ["seoul", "서울특별시", "songpa-gu", "송파구", "jamsil-dong", "잠실동", "town:1171067000", ["math","english","korean","science","social"]],
  ["seoul", "서울특별시", "nowon-gu", "노원구", "junggye-dong", "중계동", "town:1135062100", ["math","english","korean","science","social"]],
  ["seoul", "서울특별시", "seocho-gu", "서초구", "banpo-dong", "반포동", "town:1165055000", ["math","english","korean","science","social"]],
  ["seoul", "서울특별시", "seocho-gu", "서초구", "bangbae-dong", "방배동", "town:1165062000", ["math","english","korean","science","social"]],
  ["gyeonggi", "경기도", "bundang-gu-seongnam-si", "성남시 분당구", "jeongja-dong", "정자동", "town:4113554500", ["math","english","korean","science","social"]],
  ["gyeonggi", "경기도", "dongan-gu-anyang-si", "안양시 동안구", "pyeongchon-dong", "평촌동", "town:4117357000", ["math","english","korean","science","social"]],
  ["gyeonggi", "경기도", "bundang-gu-seongnam-si", "성남시 분당구", "pangyo-dong", "판교동", "town:4113565000", ["math","english","korean","science","social"]],
  ["busan", "부산광역시", "dongnae-gu", "동래구", "myeongnyun-dong", "명륜동", "town:2626054500", ["math","english","korean","science"]],
  ["busan", "부산광역시", "dongnae-gu", "동래구", "sajik-dong", "사직동", "town:2626059000", ["social","math","english"]],
  ["ulsan", "울산광역시", "nam-gu", "남구", "ok-dong", "옥동", "town:3114060000", ["korean","science","social"]],
];

const banks = {
  math: [
    ["조건 해석과 식 세우기","문제의 숫자는 찾지만 어떤 관계식으로 연결할지 결정하지 못합니다.","구할 값과 주어진 조건을 표로 분리한 뒤 관계를 한 문장으로 설명합니다.","조건마다 기호를 붙이고 그림·표·식 중 가장 짧은 표현으로 바꾼 다음 계산합니다."],
    ["계산 과정 검산 습관","풀이 속도를 높이려다 부호와 괄호를 빠뜨리는 실수가 반복됩니다.","정답보다 오류가 시작된 줄을 찾아 연산 순서와 기록 습관을 점검합니다.","중간값을 생략하지 않고 역연산 검산표로 마지막 두 분을 사용하는 연습을 합니다."],
    ["함수 그래프의 변화 읽기","공식은 외웠지만 그래프의 축과 변화 방향을 말로 설명하지 못합니다.","식·표·그래프가 같은 관계를 나타내는지 좌표와 증가량으로 연결합니다.","대표 좌표 세 개를 찍고 기울기와 절편의 의미를 실제 문장으로 복원합니다."],
    ["서술형 풀이 근거 쓰기","답은 맞아도 어떤 성질을 사용했는지 쓰지 않아 서술형 점수를 잃습니다.","조건, 사용한 개념, 결론을 세 칸으로 나눠 논리의 빈 부분을 확인합니다.","한 줄 계산마다 이유 꼬리표를 붙인 뒤 불필요한 문장만 줄여 답안을 완성합니다."],
    ["도형 보조선 선택","도형을 오래 바라보지만 필요한 보조선과 합동 조건을 찾지 못합니다.","주어진 길이와 각을 표시하고 결론에서 필요한 조건을 거꾸로 추적합니다.","보조선 후보를 하나씩 그려 새로 생기는 관계를 기록하고 근거 없는 선은 지웁니다."],
    ["수열 규칙 검증","몇 개 항에서 보인 규칙을 전체 수열의 일반항으로 바로 확정합니다.","항 번호와 값을 표로 놓고 차이·비율·재귀 관계 중 맞는 구조를 구별합니다.","추측한 식을 첫째 항과 새 항에 모두 대입해 반례가 없는지 확인합니다."],
    ["확률 경우의 수 정리","중복되거나 빠진 경우를 알아채지 못해 계산 결과가 흔들립니다.","사건의 순서와 선택 가능 조건을 나무도표 또는 표로 빠짐없이 분류합니다.","전체 경우를 먼저 번호화하고 제외 조건을 색으로 표시해 중복 집계를 막습니다."],
    ["미분 변화율 해석","미분 공식을 적용해도 계산한 값이 그래프에서 무엇을 뜻하는지 모릅니다.","평균변화율과 순간변화율을 구간과 한 점의 차이로 구분합니다.","할선의 간격을 줄이는 표와 접선 그림을 함께 사용해 부호와 크기를 해석합니다."],
    ["비례 관계 단위 통일","속력과 농도 문제에서 서로 다른 단위를 그대로 식에 넣습니다.","계산 전에 같은 종류의 양과 단위를 맞추고 비례 방향을 예상합니다.","숫자 옆에 단위를 끝까지 적고 어림값으로 결과의 현실성을 검산합니다."],
    ["오답 유형별 재풀이","해설을 읽은 문제도 며칠 뒤 같은 유형에서 다시 막힙니다.","오답 원인을 개념, 조건 해석, 계산, 시간 배분으로 나누어 기록합니다.","즉시 재풀이와 삼일 후 변형 문제를 묶어 기억이 아닌 해결 순서를 확인합니다."],
  ],
  english: [
    ["문장 구조와 중심 동사","단어 뜻은 알지만 긴 문장에서 주어와 핵심 동사를 놓칩니다.","수식어를 잠시 걷어내고 문장의 뼈대와 절의 경계를 먼저 찾습니다.","주절을 상자로 묶고 관계절·분사구를 단계적으로 다시 붙여 해석합니다."],
    ["어휘 장기 기억","단어 시험 직후에는 맞지만 누적 범위에서 철자와 뜻이 섞입니다.","발음, 철자, 문맥을 따로 확인해 어느 연결에서 기억이 끊기는지 봅니다.","하루·삼일·일주일 간격 테스트와 짧은 예문 회상으로 누적 복습합니다."],
    ["본문 암기 전 의미 연결","교과서 문장을 외웠지만 어순이 바뀐 문제에는 대응하지 못합니다.","문단의 주장과 세부 예시를 구분하고 문장 사이 논리 관계를 읽습니다.","각 문장을 핵심어 세 개로 줄인 뒤 원문 없이 뜻과 구조를 복원합니다."],
    ["서술형 조건 점검","의미는 비슷하게 썼지만 필수 단어·시제·어순 조건을 빠뜨립니다.","문제의 작성 조건을 내용과 문법으로 분리해 감점 지점을 확인합니다.","답안 작성 후 필수어, 동사 형태, 단복수, 의미를 네 번 나눠 검토합니다."],
    ["빈칸 논리 추론","빈칸 주변 단어만 보고 글 전체 주장과 반대되는 선택지를 고릅니다.","대조·인과·양보 표현을 따라 문단에서 빈칸이 맡는 역할을 정합니다.","선택지를 보기 전에 들어갈 말을 한국어로 예상하고 논리와 어휘를 순서대로 비교합니다."],
    ["듣기 핵심 정보 기록","놓친 한 표현에 머물러 뒤의 시간·장소·요청까지 연속으로 놓칩니다.","질문에서 요구하는 정보 종류를 먼저 확인하고 전체 흐름을 우선 듣습니다.","첫 청취는 핵심어만 쓰고 두 번째에 놓친 구간을 표시해 받아쓰기로 확인합니다."],
    ["대명사 지시 대상 추적","it과 they를 가까운 명사에 기계적으로 연결해 문맥을 오해합니다.","수와 의미가 맞는 후보를 찾아 문장에 다시 넣고 연결을 검증합니다.","지시어와 대상 사이에 화살표를 긋고 문단 끝에서 연결망을 한 번에 설명합니다."],
    ["비교 구문 대상 맞추기","비교급 형태는 맞지만 서로 다른 종류의 대상을 비교합니다.","생략된 명사를 복원해 두 대상이 같은 기준에 놓였는지 확인합니다.","비교 대상과 기준을 두 열로 적고 대칭이 깨지는 표현을 직접 고칩니다."],
    ["독해 시간 배분","첫 지문을 완벽히 이해하려다 뒤 문항을 읽을 시간이 부족합니다.","문항 유형별 목표 시간과 재확인 표시를 정해 멈추는 기준을 만듭니다.","짧은 세트에서 1차 근거 표시 후 보류 문항만 돌아오는 순서를 훈련합니다."],
    ["접속사와 논지 전환","문장별 해석은 되지만 however 이후 중심 내용이 바뀌는 것을 놓칩니다.","연결어 앞뒤를 한 줄씩 요약해 주장과 반론의 방향을 비교합니다.","접속 표현을 가린 채 관계를 추론하고 같은 기능의 표현으로 바꿔 읽습니다."],
  ],
  korean: [
    ["비문학 문단 구조","문장을 모두 중요하게 표시해 중심 주장과 사례를 구분하지 못합니다.","문단마다 질문 하나와 답 하나를 남겨 정보의 위계를 정리합니다.","정의·원인·예시·반론 꼬리표를 붙여 문단 관계도를 완성합니다."],
    ["문학 근거 중심 해석","느낌에 맞는 선택지를 고르지만 지문에서 근거를 찾지 못합니다.","화자·서술자·인물의 관점을 나누고 표현이 만든 효과를 확인합니다.","선택지의 판단어마다 대응 시어와 문장을 표시해 과도한 해석을 지웁니다."],
    ["고전 문학 상황 복원","낯선 어휘를 하나씩 번역하다 인물 관계와 사건 순서를 놓칩니다.","발화자, 청자, 장소, 사건을 먼저 정리하고 주석은 필요한 부분에만 씁니다.","장면을 현대어 한 문장으로 줄인 뒤 핵심 어휘를 원문과 다시 연결합니다."],
    ["문법 개념 적용","개념 정의는 외웠지만 실제 문장에서 품사와 문장 성분을 구별하지 못합니다.","형태, 기능, 의미 기준을 따로 적용해 판단 근거를 말하게 합니다.","같은 단어가 다른 역할로 쓰인 짝문장을 비교하고 판별 질문을 직접 만듭니다."],
    ["논설문 주장 평가","사례가 인상적이라는 이유로 근거가 충분하고 타당하다고 판단합니다.","주장, 근거, 숨은 전제를 분리하고 자료의 관련성과 신뢰성을 살핍니다.","근거가 결론을 직접 뒷받침하는지 반대 사례를 넣어 논리의 빈틈을 찾습니다."],
    ["시의 정서 변화","첫 연의 분위기로 화자의 감정을 고정해 후반부 태도 변화를 놓칩니다.","시상 전환과 반복 시어를 기준으로 대상과 화자의 거리를 추적합니다.","연별 핵심 대상과 어조를 표로 비교하고 마지막 표현의 변화를 근거로 설명합니다."],
    ["매체 자료 의도 읽기","사진과 그래프를 장식으로 보고 선택·배치된 정보의 의도를 놓칩니다.","본문과 매체가 강조하거나 생략한 내용을 비교해 전달 목적을 찾습니다.","같은 정보를 글과 표로 바꿔 보며 표현 방식에 따라 달라지는 효과를 기록합니다."],
    ["서술형 답안 압축","아는 내용을 길게 쓰지만 질문이 요구한 핵심 조건이 드러나지 않습니다.","발문 동사를 기준으로 설명·비교·평가에 필요한 답안 구조를 구분합니다.","근거와 결론을 먼저 한 줄로 쓴 뒤 필요한 개념어만 보태 분량을 조절합니다."],
    ["독서 어휘 문맥 추론","모르는 개념어가 나오면 배경지식이 없다고 생각해 글 읽기를 멈춥니다.","지문 안의 정의, 대조, 예시에서 용어의 조건과 범위를 찾습니다.","낯선 말을 익숙한 표현으로 바꾸고 새 사례가 정의에 맞는지 검사합니다."],
    ["선택지 판단 속도","지문으로 자주 돌아가 확인하면서도 어느 문장이 근거인지 기록하지 않습니다.","선택지의 범위·강도·인과 표현을 나눠 틀린 이유를 유형화합니다.","근거 문장 번호를 적고 확실한 오답부터 제거해 재확인 횟수를 줄입니다."],
  ],
  science: [
    ["실험 변인 구분","조작 변인과 통제 변인을 섞어 실험 결과의 원인을 설명하지 못합니다.","바꾼 것, 같게 둔 것, 측정한 것을 실험 절차에서 각각 찾습니다.","실험 문장을 세 칸 표로 옮기고 변인 하나가 달라질 때 예측 결과를 씁니다."],
    ["자료 그래프 해석","그래프의 모양만 보고 축의 단위와 측정 조건을 확인하지 않습니다.","가로축·세로축·단위·증감 구간을 순서대로 읽어 관계를 문장화합니다.","특정 두 점의 변화량을 계산하고 그래프 밖 추측과 자료 안 결론을 구분합니다."],
    ["화학 반응식 균형","계수를 맞추면서 아래첨자를 바꾸어 다른 물질을 만들어 버립니다.","분자식은 유지하고 반응 전후 원소별 원자 수가 보존되는지 확인합니다.","원소별 개수표를 만든 뒤 묶음 수만 조절하고 가장 간단한 정수비로 줄입니다."],
    ["힘과 운동 방향","속력이 크면 항상 힘도 같은 방향으로 크다고 단정합니다.","운동 상태의 변화와 알짜힘을 구분해 방향 화살표로 표현합니다.","물체별 힘을 따로 그린 자유물체도를 만들고 합력과 가속도 방향을 비교합니다."],
    ["유전 확률 과정","결과 비율만 외워 부모 유전자형이 달라진 문제에서 적용하지 못합니다.","생식세포 조합과 표현형 조건을 단계적으로 구분합니다.","부모의 가능한 유전자를 먼저 적고 조합표의 각 칸을 독립적으로 확인합니다."],
    ["전류와 전압 회로","전류계와 전압계를 같은 위치와 방식으로 연결하려고 합니다.","흐름을 재는 값과 두 지점의 차이를 재는 값을 회로에서 분리합니다.","측정 대상 두 점을 표시한 뒤 전류 경로와 전압계 연결을 다른 색으로 그립니다."],
    ["지구과학 시간 순서","지질 사건의 이름은 외우지만 선후 관계를 근거로 판단하지 못합니다.","관입·퇴적·침식의 흔적을 보고 상대적인 시간 순서를 세웁니다.","단면도에서 경계면을 따라가며 먼저 생겨야 가능한 사건을 화살표로 배열합니다."],
    ["밀도와 비례 관계","질량이 큰 물체가 언제나 밀도도 크다고 생각합니다.","질량과 부피의 비를 단위와 함께 계산해 물질 고유 성질을 이해합니다.","크기가 다른 같은 물질 자료를 표와 그래프로 바꾸고 기울기를 비교합니다."],
    ["산화 환원 전자 이동","산소가 붙는 반응만 산화라고 외워 다른 사례를 분류하지 못합니다.","배운 범위에서 전자 이동과 산화수 변화를 반응 전후로 연결합니다.","전하와 산화수를 표에 쓰고 산화되는 물질과 환원되는 물질을 동시에 표시합니다."],
    ["파동 주기와 진동수","주기와 진동수가 함께 커진다고 생각하고 그래프 축도 혼동합니다.","한 번 진동하는 시간과 일정 시간의 진동 횟수를 역관계로 이해합니다.","시간축 반복 간격을 재고 같은 자료에서 진동 횟수를 세어 두 값을 검산합니다."],
  ],
  social: [
    ["지도 축척과 거리","축척의 분모만 보고 실제 거리를 바로 계산해 단위를 놓칩니다.","지도 거리와 실제 거리의 대응 관계를 세우고 단위를 먼저 통일합니다.","자와 축척 막대를 함께 사용해 어림한 뒤 계산값이 생활 거리와 맞는지 확인합니다."],
    ["인구 자료 변화 해석","한 시점의 수치만 비교하고 증가율과 구성비 변화를 구분하지 못합니다.","절대량, 비율, 증감 방향을 각각 읽어 자료가 말하는 범위를 정합니다.","표를 간단한 그래프로 바꾸고 원인으로 단정할 수 있는 내용과 없는 내용을 나눕니다."],
    ["경제 기회비용 판단","포기한 모든 것을 기회비용으로 더해 선택의 기준을 혼동합니다.","선택 가능한 대안 중 가장 가치가 큰 포기 대안을 찾습니다.","일상 선택 사례의 편익과 명시·암묵 비용을 표로 비교해 판단 근거를 설명합니다."],
    ["정치 제도 비교","기관 이름은 외우지만 권한 관계와 견제 방식이 섞입니다.","제도의 목적, 담당 기관, 통제 장치를 같은 기준으로 비교합니다.","사례 문장에서 누가 결정하고 누가 견제하는지 화살표 관계도로 정리합니다."],
    ["역사 사건 인과 연결","연도는 기억하지만 사건 사이 원인과 결과를 설명하지 못합니다.","배경, 직접 계기, 변화, 장기 영향을 시간 순서로 구분합니다.","사건 카드를 인과 화살표로 배열하고 하나를 뺐을 때 설명이 끊기는 지점을 찾습니다."],
    ["윤리 쟁점 근거 비교","자신의 의견만 반복하고 반대 입장의 가치 기준을 이해하지 못합니다.","입장별 핵심 가치와 예상 결과를 분리해 논거의 충돌 지점을 찾습니다.","찬반 주장을 서로 바꿔 요약한 뒤 공통 전제와 다른 전제를 표로 비교합니다."],
    ["법 사례 요건 적용","결과가 불공정해 보인다는 느낌으로 법적 판단 요건을 건너뜁니다.","사실관계와 규범의 요건을 나누고 각 조건이 충족되는지 확인합니다.","사례 문장을 인물·행위·시점으로 정리한 뒤 요건별 근거 문장을 연결합니다."],
    ["세계 지역 비교","국가 이름과 특산물만 외워 기후·지형·산업의 관계를 놓칩니다.","위치와 자연환경이 생활 방식에 미치는 영향을 공통 기준으로 비교합니다.","두 지역을 기후, 자원, 인구, 산업 열로 나누고 차이가 생긴 이유를 설명합니다."],
    ["문화 상대주의 범위","다름을 존중해야 한다는 말과 모든 행동을 인정한다는 말을 혼동합니다.","문화 이해의 맥락과 보편적 권리의 판단 기준을 함께 검토합니다.","사례에서 관찰 사실과 가치 판단을 분리하고 충돌하는 권리를 균형 있게 적습니다."],
    ["사회 조사 자료 평가","그래프가 제시되면 조사 대상과 질문 방식의 한계를 확인하지 않습니다.","표본, 조사 시점, 문항 표현이 결론의 범위에 미치는 영향을 살핍니다.","자료 출처와 모집단을 적고 같은 결과를 다르게 설명할 가능성을 두 가지 제시합니다."],
  ],
};

const loaded = new Map();
const subjectCounters = Object.fromEntries(Object.keys(subjectNames).map((key) => [key, 0]));
const records = [];

for (const [provinceSlug, sido, districtSlug, sigungu, townSlug, townName, sourceTownId, subjects] of places) {
  if (!loaded.has(provinceSlug)) {
    loaded.set(provinceSlug, {
      regions: JSON.parse(fs.readFileSync(`data/regions/${provinceSlug}.json`, "utf8")),
      schools: JSON.parse(fs.readFileSync(`data/schools/${provinceSlug}.json`, "utf8")),
    });
  }
  const { regions, schools } = loaded.get(provinceSlug);
  const district = regions.districts.find((item) => item.slug === districtSlug);
  const sourceTown = district?.towns.find((item) => item.id === sourceTownId);
  if (!district || !sourceTown) throw new Error(`Unknown source region: ${provinceSlug}/${districtSlug}/${sourceTownId}`);
  const school = schools.schools.find((item) => item.region.townId === sourceTownId && ["middle", "high"].includes(item.schoolType));
  if (!school || !sourceTown.schoolIds.includes(school.id)) throw new Error(`No verified school: ${townName}`);
  const grade = school.schoolType === "high" ? "고등" : "중등";

  for (const subjectSlug of subjects) {
    const subject = subjectNames[subjectSlug];
    const profile = banks[subjectSlug][subjectCounters[subjectSlug]++];
    const [theme, concern, unit, method] = profile;
    const url = `/tutoring/${provinceSlug}/${districtSlug}/${townSlug}/${subjectSlug}`;
    const canonical = base + url;
    const title = `${townName} ${grade} ${subject}과외 | ${theme} | 스터디하이`;
    const description = `${sido} ${sigungu} ${townName} ${grade} ${subject}과외에서 ${concern} ${theme} 진단과 ${method} 학교 자료를 확인해 학생별 학습 순서를 제안합니다.`;
    const imagePath = `/api/seo-thumbnail?dong=${encodeURIComponent(townName)}&subject=${subjectSlug}`;
    const exam = `${school.name}의 공개되지 않은 출제 경향을 단정하지 않고, 학생이 가진 최근 시험 범위표·교과서·오답 기록에서 ${theme} 관련 문항을 확인합니다.`;
    const parent = `${townName} 생활권의 실제 통학 일정과 ${school.name} 진도, 숙제 수행 기록을 함께 살펴 ${concern} 원인을 학습량과 이해 과정으로 나눕니다.`;
    const faq = [
      { question: `${townName} ${grade} ${subject}과외에서 ${theme} 학습은 어떻게 시작하나요?`, answer: `${unit} 상담에서는 최근 풀이 기록을 확인한 뒤 ${method}` },
      { question: `${school.name} ${subject} 내신 대비에 학교별 시험 정보가 필요한가요?`, answer: `${exam} 확인된 자료 안에서만 우선순위를 정하고 확인되지 않은 난이도나 출제 비율은 만들지 않습니다.` },
    ];
    records.push({
      id: `page:national:20260903:${String(records.length + 1).padStart(3, "0")}`,
      status: "validated", createdAt,
      region: { sido, sigungu, eupmyeondong: townName, provinceSlug, districtSlug, townSlug, townId: `representative:${districtSlug}:${townSlug}`, sourceTownId },
      school: { id: school.id, name: school.name, type: school.schoolType, typeName: school.schoolTypeName, address: school.address.road, addressDetail: school.address.detail, source: schools.meta.source, sourceDate: schools.meta.sourceDate },
      page: { url, canonical, title, description, grade, subject, subjectSlug },
      content: {
        theme,
        introduction: `${townName} ${grade} ${subject} 학습은 현재 성적보다 최근 풀이 과정에서 출발합니다. ${concern}`,
        regionContext: `${sido} ${sigungu} ${townName} 생활권에서 ${school.name} 학생의 통학 시간과 학교 진도, 가능한 수업 일정을 확인한 뒤 ${theme} 계획을 세웁니다.`,
        schoolAnalysis: `${school.name}은 프로젝트 학교 기본정보에서 ${sido} ${sigungu} 소재 ${school.schoolTypeName}로 확인됩니다. 주소는 ${school.address.road}이며 학교별 시험 특징은 실제 자료가 있을 때만 반영합니다.`,
        exam, examCaveat: "학교별 최근 출제 경향은 공개 자료로 확인되지 않으면 단정하지 않습니다.", concern, difficultUnit: unit, studyMethod: method, parentConcern: parent,
        workedExample: `${unit} 먼저 한 문제의 조건과 풀이를 말로 설명하고, 같은 개념을 다른 표현으로 바꾼 문제에 적용합니다. 이후 오답 원인을 기록해 다음 복습 시점에 다시 확인합니다.`,
        lesson: `${method} 학생이 혼자 재현할 수 있는지 확인한 뒤 다음 단계로 이동합니다.`, faq,
      },
      seo: { title, description, canonical, ogTitle: title, ogDescription: description, ogImage: base + imagePath, keywords: [`${townName} ${grade} ${subject}과외`, `${school.name} ${subject} 내신`, `${sigungu} 1:1 학습관리`, theme] },
      aeo: { questions: faq.map((item) => item.question), answers: faq.map((item) => item.answer), faqPageSchema: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } },
      geo: { region: `${sido} ${sigungu} ${townName}`, school: school.name, grade, subject, localLearningContext: `${townName} 생활권에서 ${school.name}의 실제 진도와 학생의 ${concern} 상황을 연결해 ${theme} 학습 순서를 조정합니다.` },
      image: { masterImage: "/thumbnails/studyhigh-official-template.png", imagePath, imageUrl: base + imagePath, alt: `${townName} ${grade} ${subject}과외 대표 이미지`, regionText: townName, subjectText: `${subject}과외`, width: 1200, height: 1200 },
      provenance: { regionFile: `data/regions/${provinceSlug}.json`, schoolFile: `data/schools/${provinceSlug}.json`, schoolId: school.id, sourceTownId, teachingAdvice: "editorial-general-guidance", verifiedSchoolExamPattern: false },
    });
  }
}

if (records.length !== 50) throw new Error(`Expected 50, got ${records.length}`);
for (const field of ["url", "title", "description", "canonical"]) {
  const values = records.map((record) => field === "description" ? record.page.description : record.page[field]);
  if (new Set(values).size !== records.length) throw new Error(`Duplicate ${field}`);
}
for (const [subject, count] of Object.entries(subjectCounters)) if (count !== 10) throw new Error(`${subject}: ${count}`);

fs.mkdirSync("data/manifests/national", { recursive: true });
fs.writeFileSync("data/manifests/national/expansion-50-20260903.json", JSON.stringify({ version: 1, batch: "national-expansion-50-20260903", expansionStage: ["서울", "경기", "부산", "울산"], records }, null, 2) + "\n");
console.log(JSON.stringify({ count: records.length, regions: Object.fromEntries([...new Set(records.map((record) => record.region.provinceSlug))].map((slug) => [slug, records.filter((record) => record.region.provinceSlug === slug).length])), subjects: subjectCounters }, null, 2));
