export type TutoringArticle = {
  city: string;
  cityName: string;
  dong: string;
  dongName: string;
  subject: string;
  subjectName: string;
  keyword: string;
  title: string;
  description: string;
  lead: string;
  detailTopic: string;
  detailBody: string;
  concern: string;
  parentConcern: string;
  method: string;
  image: string;
  imageAlt: string;
  faq: Array<{ question: string; answer: string }>;
};

export const tutoringArticles: TutoringArticle[] = [
  {
    city: "daejeon",
    cityName: "대전",
    dong: "gwanpyeong-dong",
    dongName: "관평동",
    subject: "math",
    subjectName: "수학",
    keyword: "관평동 고등 수학과외",
    title: "관평동 고등 수학과외 | 내신 대비와 오답 관리",
    description:
      "대전 관평동 고등학생을 위한 수학과외 상담 정보와 개념 진단, 내신 대비, 오답 관리 방법을 안내합니다.",
    lead:
      "관평동 고등 수학과외를 알아볼 때는 수업 횟수보다 학생이 개념, 조건 해석, 계산, 시간 관리 중 어디에서 막히는지 먼저 확인해야 합니다.",
    detailTopic: "수학 내신 대비와 오답 관리",
    detailBody:
      "학교에서 안내한 시험 범위를 기준으로 개념, 대표 유형, 변형 문제, 오답 복습 순서로 계획합니다. 틀린 문제는 개념 부족, 조건 누락, 계산 실수, 시간 부족으로 원인을 분류하고 풀이를 가린 상태에서 다시 해결합니다.",
    concern: "문제를 많이 풀어도 계산 실수와 조건 누락이 반복되는 학생",
    parentConcern: "시험 직전에 공부가 몰리고 오답을 확인할 시간이 부족한 상황",
    method:
      "시험 범위를 4주로 나누고 매주 개념, 유형, 오답의 완료 여부를 기록합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "관평동 고등학생 수학과외 상담과 내신 학습 장면",
    faq: [
      {
        question: "관평동 고등 수학과외 상담 전에 무엇을 준비해야 하나요?",
        answer:
          "최근 시험 또는 오답, 사용하는 교재, 가능한 수업 시간, 가장 어려운 단원을 정리하면 상담에 도움이 됩니다.",
      },
      {
        question: "수학 문제집은 여러 권을 풀어야 하나요?",
        answer:
          "여러 권을 빠르게 푸는 것보다 한 권의 핵심 유형과 오답을 다시 해결하는 편이 우선입니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "dunsan-dong",
    dongName: "둔산동",
    subject: "english",
    subjectName: "영어",
    keyword: "둔산동 고등 영어과외",
    title: "둔산동 고등 영어과외 | 어휘·독해 공부 방법",
    description:
      "대전 둔산동 고등학생을 위한 영어과외 상담 정보와 어휘, 문장 구조, 독해 공부 방법을 안내합니다.",
    lead:
      "둔산동 고등 영어과외를 찾을 때는 단어 암기량만 보기보다 어휘가 문장 해석과 독해로 연결되는지 확인해야 합니다.",
    detailTopic: "어휘와 독해를 연결하는 공부 방법",
    detailBody:
      "새 단어는 문장 속 쓰임과 함께 익히고 당일, 다음 날, 3일 후, 1주 후에 복습합니다. 긴 문장은 주어와 동사를 먼저 찾고 문단의 중심 내용을 정리합니다.",
    concern: "단어를 외워도 지문에서 뜻이 바로 떠오르지 않는 학생",
    parentConcern: "영어 공부 시간에 비해 어휘와 독해가 연결되지 않는 상황",
    method:
      "어휘 확인, 문장 구조 분석, 문단 요약, 간격 복습의 네 단계를 짧게 반복합니다.",
    image: "/hero-tutor.png",
    imageAlt: "둔산동 고등학생 영어과외의 어휘와 독해 학습 장면",
    faq: [
      {
        question: "둔산동 고등 영어과외는 어휘와 독해를 함께 지도하나요?",
        answer:
          "학생의 현재 상태에 따라 어휘, 문장 구조, 독해 가운데 우선순위를 정하고 구체적인 범위는 상담 후 결정합니다.",
      },
      {
        question: "영어과외 상담에는 어떤 자료가 필요한가요?",
        answer:
          "최근 시험지나 오답, 사용하는 교과서와 부교재, 어휘 학습 기록이 있으면 현재 상태를 파악하는 데 도움이 됩니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "doan-dong",
    dongName: "도안동",
    subject: "korean",
    subjectName: "국어",
    keyword: "도안동 고등 국어과외",
    title: "도안동 고등 국어과외 | 독해와 자기주도학습",
    description:
      "대전 도안동 고등학생을 위한 국어과외 상담 정보와 지문 독해, 근거 찾기, 자기주도 복습 방법을 안내합니다.",
    lead:
      "도안동 고등 국어과외를 알아볼 때는 문제 점수뿐 아니라 학생이 지문의 중심 내용과 답의 근거를 설명할 수 있는지 확인해야 합니다.",
    detailTopic: "독해와 자기주도 복습을 연결하는 방법",
    detailBody:
      "지문을 읽은 뒤 중심 내용을 한 문장으로 정리하고 선택한 답의 근거를 표시합니다. 틀린 이유와 낯선 어휘를 기록하고 며칠 뒤 다시 확인합니다.",
    concern: "국어 문제를 풀고도 정답의 근거를 설명하지 못하는 학생",
    parentConcern: "국어 복습을 자주 미루고 혼자 공부하기 어렵다고 느끼는 상황",
    method:
      "매일 지문 하나를 읽고 중심 내용, 답의 근거, 틀린 이유를 직접 기록합니다.",
    image: "/hero-background-premium.png",
    imageAlt: "도안동 고등학생 국어과외의 독해와 자기주도학습 장면",
    faq: [
      {
        question: "도안동 고등 국어과외에서는 문학과 비문학을 모두 공부하나요?",
        answer:
          "학생의 현재 상태와 학교 학습 범위에 따라 우선 영역을 정하고 상담 후 구체적인 수업 순서를 결정합니다.",
      },
      {
        question: "국어과외로 자기주도학습도 도울 수 있나요?",
        answer:
          "지문 요약, 답의 근거 표시, 오답 기록처럼 학생이 혼자 반복할 수 있는 학습 행동을 만드는 방향으로 계획할 수 있습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "tanbang-dong",
    dongName: "탄방동",
    subject: "math",
    subjectName: "수학",
    keyword: "탄방동 고등 수학과외",
    title: "탄방동 고등 수학과외 | 학습 진단과 공부 방향",
    description:
      "대전 탄방동 고등학생을 위한 수학과외 상담 정보와 개념, 유형, 계산, 시간 관리 진단 방법을 안내합니다.",
    lead:
      "탄방동 고등 수학과외를 찾을 때는 문제집을 먼저 정하기보다 학생의 오답 원인을 확인하는 것이 중요합니다.",
    detailTopic: "개념, 유형, 계산, 시간 관리 진단",
    detailBody:
      "공식을 설명할 수 있는지, 문제 조건을 빠짐없이 표시하는지, 계산 과정이 안정적인지, 제한 시간 안에 해결하는지 확인합니다. 같은 점수라도 원인이 다르면 필요한 수업 방향도 달라집니다.",
    concern: "개념과 문제 풀이 중 무엇을 먼저 보완해야 할지 모르는 학생",
    parentConcern: "문제집과 학습 방법을 자주 바꿔도 약점이 해결되지 않는 상황",
    method:
      "최근 오답을 개념, 조건 해석, 계산, 시간으로 분류하고 가장 많은 원인부터 한 달간 보완합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "탄방동 고등학생 수학과외의 학습 진단 상담 장면",
    faq: [
      {
        question: "탄방동 고등 수학과외 상담에서 수준을 어떻게 확인하나요?",
        answer:
          "최근 시험과 오답, 개념 설명 가능 여부, 문제별 풀이 과정과 소요 시간을 함께 확인합니다.",
      },
      {
        question: "수학 기초가 부족해도 과외 상담이 가능한가요?",
        answer:
          "현재 학년의 선수 개념부터 확인할 수 있으며 구체적인 학습 범위와 가능 여부는 상담 후 결정합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "noeun-dong",
    dongName: "노은동",
    subject: "english",
    subjectName: "영어",
    keyword: "노은동 고등 영어과외",
    title: "노은동 고등 영어과외 | 내신과 입시 기초",
    description:
      "대전 노은동 고등학생을 위한 영어과외 상담 정보와 어휘, 내신, 독해, 입시 기초 학습 방향을 안내합니다.",
    lead:
      "노은동 고등 영어과외를 알아볼 때는 내신 점수뿐 아니라 새로운 지문에서도 어휘와 문장 구조를 이해하는지 확인해야 합니다.",
    detailTopic: "내신과 입시 학습의 공통 기반",
    detailBody:
      "학교 내신은 교과서와 부교재, 수업 자료를 우선하고 평소에는 새로운 짧은 지문으로 독해를 연습합니다. 어휘와 문장 구조는 두 학습의 공통 기반입니다.",
    concern: "내신 영어는 공부하지만 새로운 지문에서 해석이 느린 학생",
    parentConcern: "학교 영어 학습이 장기적인 입시 준비로 연결되지 않는 상황",
    method:
      "교과서 어휘와 문장 구조를 정확히 익힌 뒤 매주 새로운 짧은 지문으로 적용 범위를 넓힙니다.",
    image: "/hero-tutor.png",
    imageAlt: "노은동 고등학생 영어과외의 내신과 독해 학습 장면",
    faq: [
      {
        question: "노은동 고등 영어과외는 내신과 입시를 함께 준비할 수 있나요?",
        answer:
          "학생의 학년과 시기에 따라 학교 시험 범위와 기초 독해의 비중을 조정할 수 있습니다.",
      },
      {
        question: "영어 내신과 수능 공부를 따로 해야 하나요?",
        answer:
          "자료와 출제 방식은 다르지만 어휘와 문장 해석은 공통 기반입니다. 내신 기간에는 학교 범위를 우선합니다.",
      },
    ],
  },
];

export function getTutoringArticle(city: string, dong: string, subject: string) {
  return tutoringArticles.find(
    (article) =>
      article.city === city && article.dong === dong && article.subject === subject,
  );
}
