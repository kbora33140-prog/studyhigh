export type TutoringArticle = {
  city: string;
  cityName: string;
  dong: string;
  dongName: string;
  subject: string;
  subjectName: string;
  gradeName?: "고등" | "중등";
  gradeSlug?: "high" | "middle";
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
  nearbySchools?: string[];
  faq: Array<{ question: string; answer: string }>;
};

const highTutoringArticles: TutoringArticle[] = [
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
  {
    city: "daejeon",
    cityName: "대전",
    dong: "wolpyeong-dong",
    dongName: "월평동",
    subject: "math",
    subjectName: "수학",
    keyword: "월평동 고등 수학과외",
    title: "월평동 고등 수학과외 | 등급을 가르는 서술형 대비",
    description:
      "대전 월평동 고등학생을 위한 수학과외 정보와 서술형 풀이, 내신 범위 분석, 단계별 복습 방법을 안내합니다.",
    lead:
      "월평동 고등 수학과외를 찾는 학생이라면 답만 맞히는 연습에서 벗어나 풀이의 근거를 순서대로 설명하는 힘을 먼저 점검해야 합니다.",
    detailTopic: "서술형에서 감점되지 않는 풀이 구성",
    detailBody:
      "학교 시험 범위를 단원별로 나눈 뒤 정의와 공식의 적용 조건을 한 문장으로 정리합니다. 문제를 풀 때는 식을 바로 쓰기보다 주어진 조건, 사용할 개념, 계산 과정, 결론을 구분해 적습니다. 틀린 문제는 정답을 외우지 않고 어느 단계에서 논리가 끊겼는지 표시해 같은 유형에 다시 적용합니다.",
    concern: "객관식은 풀지만 서술형에서 풀이 과정이 빠져 점수를 잃는 학생",
    parentConcern: "문제집 진도는 빠른데 학교 시험에서 예상보다 낮은 점수가 반복되는 상황",
    method:
      "주 1회 서술형 미니 테스트를 진행하고 감점 원인을 개념, 조건, 식, 계산, 결론으로 나누어 기록합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "월평동 고등학생이 수학 서술형 풀이 과정을 점검하는 학습 장면",
    faq: [
      {
        question: "월평동 고등 수학과외에서 서술형 답안도 첨삭하나요?",
        answer:
          "정답 여부뿐 아니라 조건 사용, 식의 연결, 단위와 결론까지 확인해 실제 시험에서 감점될 부분을 구체적으로 고칩니다.",
      },
      {
        question: "수학 내신 대비는 시험 몇 주 전부터 시작하는 것이 좋나요?",
        answer:
          "평소 개념 복습을 유지하면서 시험 약 4주 전부터 학교 범위와 부교재를 기준으로 계획을 세우는 것이 안정적입니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "jeonmin-dong",
    dongName: "전민동",
    subject: "english",
    subjectName: "영어",
    keyword: "전민동 고등 영어과외",
    title: "전민동 고등 영어과외 | 어법과 문장 구조 완성",
    description:
      "대전 전민동 고등학생을 위한 영어과외 정보와 문장 구조 분석, 어법 오답 정리, 학교별 내신 준비 방향을 안내합니다.",
    lead:
      "전민동 고등 영어과외는 문법 용어를 많이 외우는 수업보다 한 문장에서 주어, 동사, 수식 관계를 스스로 찾아내는 훈련이 중요합니다.",
    detailTopic: "어법 문제를 해석과 연결하는 공부법",
    detailBody:
      "어법 항목을 시제나 관계사처럼 따로 암기하지 않고 실제 시험 지문 속 문장으로 확인합니다. 먼저 문장의 중심 동사를 찾고 절의 경계를 나눈 다음, 선택지가 묻는 문법 요소를 판단합니다. 오답 노트에는 규칙만 적지 않고 틀린 문장과 고친 문장, 판단 근거를 함께 남깁니다.",
    concern: "문법 개념은 외웠지만 긴 문장에 적용하면 정답 근거를 찾지 못하는 학생",
    parentConcern: "단어 시험 성적은 괜찮은데 학교 어법과 서술형 점수가 불안정한 상황",
    method:
      "매일 세 문장을 구조 분석하고 주말에는 그 문장을 변형한 어법 문제로 이해 여부를 확인합니다.",
    image: "/hero-tutor.png",
    imageAlt: "전민동 고등학생이 영어 문장 구조와 어법을 분석하는 학습 장면",
    faq: [
      {
        question: "전민동 고등 영어과외는 문법 기초가 약해도 시작할 수 있나요?",
        answer:
          "간단한 문장의 주어와 동사를 찾는 단계부터 진단한 뒤 학교 시험에 필요한 어법 항목으로 범위를 넓힐 수 있습니다.",
      },
      {
        question: "영어 어법 오답 노트에는 무엇을 적어야 하나요?",
        answer:
          "틀린 선택지, 적용한 규칙, 문장 속 판단 근거와 올바르게 고친 표현을 함께 적어야 재학습에 도움이 됩니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "songchon-dong",
    dongName: "송촌동",
    subject: "korean",
    subjectName: "국어",
    keyword: "송촌동 고등 국어과외",
    title: "송촌동 고등 국어과외 | 문학 작품 분석과 내신 정리",
    description:
      "대전 송촌동 고등학생을 위한 국어과외 정보와 문학 작품 분석, 표현법 정리, 학교 내신 복습 방법을 안내합니다.",
    lead:
      "송촌동 고등 국어과외를 알아볼 때는 작품 해설을 외우는지보다 낯선 부분을 읽고 화자, 상황, 정서, 표현의 효과를 직접 설명할 수 있는지 확인해야 합니다.",
    detailTopic: "문학 해설 암기에서 작품 분석으로 전환하기",
    detailBody:
      "작품을 처음 읽을 때 제목과 화자의 상황을 확인하고 정서가 변하는 지점을 표시합니다. 비유나 반복 같은 표현법은 이름만 외우지 않고 그 표현이 의미와 분위기에 어떤 영향을 주는지 연결합니다. 교과서와 수업 필기는 하나의 작품 분석표로 합쳐 시험 직전에도 빠르게 복습할 수 있게 만듭니다.",
    concern: "작품 해설은 외우지만 새로운 선지의 참과 거짓을 판단하기 어려운 학생",
    parentConcern: "국어 공부를 시험 직전에만 시작해 작품과 수업 필기가 정리되지 않는 상황",
    method:
      "작품마다 화자, 상황, 정서, 핵심 표현, 주제를 한 장에 정리하고 변형 선지로 근거 찾기를 반복합니다.",
    image: "/hero-background-premium.png",
    imageAlt: "송촌동 고등학생이 국어 문학 작품과 표현법을 정리하는 학습 장면",
    faq: [
      {
        question: "송촌동 고등 국어과외에서 학교 프린트도 함께 정리하나요?",
        answer:
          "교과서 작품과 수업 필기, 학교 프린트의 내용을 비교해 중복 내용과 추가 설명을 하나의 복습 자료로 정리합니다.",
      },
      {
        question: "문학 작품을 전부 암기해야 내신 점수가 오르나요?",
        answer:
          "핵심 내용은 기억해야 하지만 작품 속 근거를 찾아 선지를 판단하는 연습이 함께 이루어져야 변형 문제에 대응할 수 있습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "gao-dong",
    dongName: "가오동",
    subject: "math",
    subjectName: "수학",
    keyword: "가오동 고등 수학과외",
    title: "가오동 고등 수학과외 | 개념 연결과 준킬러 접근법",
    description:
      "대전 가오동 고등학생을 위한 수학과외 정보와 개념 연결, 준킬러 문제 접근, 풀이 시간 관리 방법을 안내합니다.",
    lead:
      "가오동 고등 수학과외에서는 어려운 문제를 무작정 많이 푸는 것보다 문제의 조건을 이미 배운 개념과 연결하는 과정을 익히는 것이 우선입니다.",
    detailTopic: "막히는 문제의 첫 줄을 찾는 사고 훈련",
    detailBody:
      "문제를 읽고 단원명부터 떠올리는 대신 조건이 의미하는 관계를 그림, 식, 표 중 적절한 형태로 바꿉니다. 이후 사용할 수 있는 개념 후보를 두세 개 적고 가장 직접적인 조건부터 적용합니다. 해설을 본 문제는 그대로 끝내지 않고 숫자나 조건을 바꾼 유사 문제를 풀어 접근법이 자신의 것이 되었는지 확인합니다.",
    concern: "개념 문제는 해결하지만 조금만 변형되면 첫 풀이를 시작하지 못하는 학생",
    parentConcern: "어려운 문제에 오래 매달리면서도 비슷한 문제에서 같은 막힘이 반복되는 상황",
    method:
      "문제마다 조건 변환, 개념 후보, 첫 식, 검산의 네 단계를 기록하고 제한 시간 안에 접근 순서를 연습합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "가오동 고등학생이 수학 준킬러 문제의 조건을 분석하는 학습 장면",
    faq: [
      {
        question: "가오동 고등 수학과외는 어려운 문제만 집중해서 풀나요?",
        answer:
          "기본 개념과 대표 유형이 안정적인지 먼저 확인한 뒤 현재 수준에 맞는 변형 문제와 준킬러 문제로 확장합니다.",
      },
      {
        question: "풀이를 오래 봐도 비슷한 문제를 못 푸는 이유는 무엇인가요?",
        answer:
          "해설의 계산만 따라가고 첫 접근을 선택한 이유를 정리하지 않았을 가능성이 큽니다. 조건과 개념의 연결을 다시 설명해보는 과정이 필요합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "munhwa-dong",
    dongName: "문화동",
    subject: "english",
    subjectName: "영어",
    keyword: "문화동 고등 영어과외",
    title: "문화동 고등 영어과외 | 빈칸 추론과 독해 속도 개선",
    description:
      "대전 문화동 고등학생을 위한 영어과외 정보와 빈칸 추론, 문단 요약, 독해 속도 개선을 위한 학습 방법을 안내합니다.",
    lead:
      "문화동 고등 영어과외를 찾을 때는 해석을 전부 하고도 답을 틀리는지, 시간 때문에 지문을 끝까지 읽지 못하는지 원인을 나누어 살펴봐야 합니다.",
    detailTopic: "문단의 흐름으로 빈칸 근거 찾기",
    detailBody:
      "빈칸 앞뒤 한 문장만 보는 습관을 줄이고 각 문단의 역할을 짧게 요약합니다. 역접, 예시, 인과를 나타내는 연결 표현을 표시한 뒤 글 전체의 주장과 빈칸에 필요한 의미 방향을 먼저 정합니다. 선택지는 단어가 비슷한지보다 글의 논리와 같은 방향인지 비교합니다.",
    concern: "지문 해석은 가능하지만 빈칸과 순서 문제에서 근거 없이 답을 고르는 학생",
    parentConcern: "영어 문제를 풀 때 시간이 오래 걸리고 시험 후반부를 급하게 처리하는 상황",
    method:
      "하루 한 지문을 문단별 한 문장으로 요약하고, 정답 선택 전 근거 문장과 오답 제외 이유를 말로 설명합니다.",
    image: "/hero-tutor.png",
    imageAlt: "문화동 고등학생이 영어 빈칸 추론과 문단 흐름을 학습하는 장면",
    faq: [
      {
        question: "문화동 고등 영어과외에서 독해 속도는 어떻게 높이나요?",
        answer:
          "모든 문장을 같은 속도로 읽기보다 중심 문장과 예시를 구분하고 문단의 역할을 요약하는 연습으로 불필요한 재독을 줄입니다.",
      },
      {
        question: "빈칸 문제는 단어를 많이 외우면 해결되나요?",
        answer:
          "어휘는 기본이지만 글의 주장, 연결 관계, 선택지의 의미 방향을 함께 판단해야 안정적으로 정답을 고를 수 있습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "gwanjeo-dong",
    dongName: "관저동",
    subject: "math",
    subjectName: "수학",
    keyword: "관저동 고등 수학과외",
    title: "관저동 고등 수학과외 | 학교 내신과 개념 빈틈 보완",
    description:
      "대전 관저동 고등학생을 위한 수학과외 정보입니다. 학교 내신 범위 분석, 개념 빈틈 진단, 오답 복습과 서술형 대비 방법을 안내합니다.",
    lead:
      "관저동은 여러 중·고등학교 생활권이 이어져 있어 같은 학년이라도 학교 진도와 시험 준비 방식이 다를 수 있습니다. 학생의 최근 시험지와 현재 이해도를 먼저 확인한 뒤 내신 대비와 부족한 단원 보완의 비중을 정해야 합니다.",
    detailTopic: "학교 진도와 개인의 개념 속도를 함께 맞추기",
    detailBody:
      "시험 범위를 교과서, 학교 프린트, 부교재 순서로 정리하고 최근 오답을 개념 부족, 조건 해석, 계산 실수, 시간 부족으로 분류합니다. 기본 문제에서 막히면 선수 개념으로 돌아가고, 개념은 알지만 점수가 나오지 않으면 학교형 변형 문제와 서술형 풀이를 집중적으로 연습합니다.",
    concern: "수업 진도는 따라가지만 단원이 바뀔 때마다 이전 개념이 흔들리는 학생",
    parentConcern: "학교와 학원 진도는 빠른데 아이가 실제로 이해했는지 확인하기 어려운 상황",
    method:
      "주간 학습표에 학교 진도, 보완 단원, 오답 재시험을 구분해 기록하고 시험 4주 전부터 내신 범위의 완성도를 점검합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "관저동 학교 생활권 고등학생의 수학 내신 대비와 개념 보완 장면",
    nearbySchools: ["대전관저고등학교", "대전구봉고등학교", "대전관저중학교", "대전구봉중학교"],
    faq: [
      {
        question: "관저동 고등 수학과외는 학교별 내신 범위를 반영하나요?",
        answer:
          "학생이 사용하는 교과서와 부교재, 학교 프린트, 최근 시험지를 확인해 실제 시험 범위를 중심으로 계획을 조정합니다.",
      },
      {
        question: "수학 기초가 부족하면 내신 대비부터 시작해도 되나요?",
        answer:
          "시험에 필요한 선수 개념을 먼저 선별해 보완하면서 현재 시험 범위와 연결하므로 기초와 내신을 함께 준비할 수 있습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "galma-dong",
    dongName: "갈마동",
    subject: "english",
    subjectName: "영어",
    keyword: "갈마동 고등 영어과외",
    title: "갈마동 고등 영어과외 | 본문 암기를 넘어 변형 문제까지",
    description:
      "대전 갈마동 고등학생을 위한 영어과외 정보입니다. 교과서 본문, 학교 프린트, 어법과 서술형 변형 문제 대비 방법을 안내합니다.",
    lead:
      "갈마동 고등 영어 내신은 본문을 외우는 것만으로 안정적인 점수를 만들기 어렵습니다. 학생이 문장 구조와 핵심 어법을 이해하는지 확인하고 학교 자료의 변형 가능 부분까지 준비해야 합니다.",
    detailTopic: "교과서 본문을 변형 문제에 적용하는 방법",
    detailBody:
      "본문의 핵심 어휘와 문장 구조를 먼저 분석하고, 동의어 교체, 어순 배열, 빈칸, 어법, 영작으로 문제 형태를 바꿔봅니다. 해석이 느린 학생은 문장 단위로 구조를 보완하고, 암기는 잘하지만 점수가 불안정한 학생은 선택지의 근거를 설명하는 훈련을 강화합니다.",
    concern: "본문은 외웠지만 문장이 조금만 바뀌면 해석과 어법 판단이 흔들리는 학생",
    parentConcern: "영어 공부 시간에 비해 학교 서술형과 변형 문제 점수가 낮게 나오는 상황",
    method:
      "시험 범위 문장을 구조, 어휘, 어법, 영작 네 가지 형태로 바꾸어 복습하고 매주 누적 테스트를 진행합니다.",
    image: "/hero-tutor.png",
    imageAlt: "갈마동 학교 생활권 고등학생의 영어 본문과 변형 문제 학습 장면",
    nearbySchools: ["대전둔산여자고등학교", "한밭고등학교", "갈마중학교", "대전둔원중학교"],
    faq: [
      {
        question: "갈마동 고등 영어과외에서 학교 프린트도 수업하나요?",
        answer:
          "교과서뿐 아니라 학교에서 배부한 프린트와 부교재를 함께 확인해 시험 비중이 높은 자료부터 준비합니다.",
      },
      {
        question: "본문 암기가 느린 학생은 어떻게 준비하나요?",
        answer:
          "의미 단위로 문장을 나누고 핵심 구조와 어휘를 먼저 익힌 뒤 빈칸과 순서 배열로 암기 상태를 확인합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "boksu-dong",
    dongName: "복수동",
    subject: "korean",
    subjectName: "국어",
    keyword: "복수동 고등 국어과외",
    title: "복수동 고등 국어과외 | 지문 근거와 서술형 답안 훈련",
    description:
      "대전 복수동 고등학생을 위한 국어과외 정보입니다. 교과서 작품 정리, 지문 근거 찾기, 서술형 답안과 내신 오답 보완 방법을 안내합니다.",
    lead:
      "복수동 고등 국어과외는 작품 해설을 대신 외워주는 수업이 아니라 학생이 지문에서 근거를 찾고 자신의 말로 답을 구성하도록 도와야 합니다. 최근 시험의 오답 원인을 먼저 확인하는 것이 중요합니다.",
    detailTopic: "국어 내신에서 근거를 남기는 읽기 습관",
    detailBody:
      "문학은 화자와 상황, 정서 변화, 표현의 효과를 연결하고 비문학은 문단별 핵심 주장과 정보 관계를 정리합니다. 서술형은 채점 요소를 짧게 나눈 뒤 지문 표현을 활용해 답을 완성합니다. 오답 선지는 어느 단어 때문에 틀렸는지 표시해 판단 기준을 분명히 합니다.",
    concern: "국어를 감으로 풀어 맞을 때와 틀릴 때의 차이를 설명하지 못하는 학생",
    parentConcern: "국어는 단기간에 올리기 어렵다고 생각해 시험 직전까지 공부가 미뤄지는 상황",
    method:
      "매일 한 지문의 핵심 문장과 선택지 근거를 기록하고 주말에는 학교 범위의 서술형 답안을 첨삭합니다.",
    image: "/hero-background-premium.png",
    imageAlt: "복수동 학교 생활권 고등학생의 국어 지문 근거와 서술형 학습 장면",
    nearbySchools: ["대전대신고등학교", "대전복수고등학교", "대전대신중학교"],
    faq: [
      {
        question: "복수동 고등 국어과외는 문학과 비문학을 함께 진행하나요?",
        answer:
          "학교 시험 범위와 학생의 취약 영역을 확인해 시험 기간에는 내신 범위를 우선하고 평소에는 독해 훈련을 병행합니다.",
      },
      {
        question: "국어 서술형 답안은 어떻게 연습하나요?",
        answer:
          "질문이 요구하는 핵심어를 찾고 지문 근거를 포함해 제한된 문장 수 안에서 답을 완성한 뒤 첨삭합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "gayang-dong",
    dongName: "가양동",
    subject: "math",
    subjectName: "수학",
    keyword: "가양동 고등 수학과외",
    title: "가양동 고등 수학과외 | 계산 실수와 오답 반복 줄이기",
    description:
      "대전 가양동 고등학생을 위한 수학과외 정보입니다. 계산 실수 분석, 개념 복습, 학교 내신 오답 관리와 시험 시간 배분을 안내합니다.",
    lead:
      "가양동 고등 수학에서 점수가 오르지 않는 이유가 어려운 문제 때문만은 아닙니다. 학생이 자주 놓치는 부호, 조건, 계산 순서를 확인하면 같은 실수를 반복하지 않는 구체적인 보완 계획을 세울 수 있습니다.",
    detailTopic: "틀린 문제보다 틀린 이유를 관리하는 수학 공부",
    detailBody:
      "오답을 단순히 다시 풀지 않고 개념 착각, 조건 누락, 계산 실수, 시간 부족으로 구분합니다. 계산 과정은 중간 식을 생략하지 않고 검산 위치를 정합니다. 시험 전에는 쉬운 문제의 정확도를 먼저 확보한 뒤 중간 난도와 서술형으로 범위를 넓힙니다.",
    concern: "아는 문제에서도 부호와 계산 실수가 반복되어 등급이 불안정한 학생",
    parentConcern: "아이가 시험 후에는 안다고 말하지만 다음 시험에서도 같은 실수가 되풀이되는 상황",
    method:
      "오답마다 실수 유형과 재시험 날짜를 기록하고 일주일 뒤 풀이를 보지 않은 상태에서 다시 확인합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "가양동 학교 생활권 고등학생의 수학 계산 실수와 오답 관리 장면",
    nearbySchools: ["명석고등학교", "대전대성여자고등학교", "대전가양중학교", "동대전중학교"],
    faq: [
      {
        question: "가양동 고등 수학과외에서 계산 실수도 줄일 수 있나요?",
        answer:
          "실수 발생 위치와 습관을 기록하고 중간 식, 검산 순서, 시간 배분을 일정하게 만들어 반복 횟수를 줄입니다.",
      },
      {
        question: "오답 노트는 모든 문제를 적어야 하나요?",
        answer:
          "모든 문제를 옮기기보다 다시 틀릴 가능성이 높은 문제와 실수 원인을 중심으로 간결하게 정리하는 것이 좋습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "doma-dong",
    dongName: "도마동",
    subject: "english",
    subjectName: "영어",
    keyword: "도마동 고등 영어과외",
    title: "도마동 고등 영어과외 | 어휘 부족부터 내신 독해까지",
    description:
      "대전 도마동 고등학생을 위한 영어과외 정보입니다. 어휘 진단, 문장 해석, 교과서 독해와 내신 문제 적용 방법을 안내합니다.",
    lead:
      "도마동 고등 영어과외를 시작할 때는 단어를 얼마나 외웠는지만 보지 않습니다. 학생이 단어를 문장 속에서 알아보는지, 긴 문장의 중심 구조를 찾는지, 시험 범위를 반복할 습관이 있는지를 함께 확인해야 합니다.",
    detailTopic: "어휘와 해석의 끊어진 연결을 다시 만들기",
    detailBody:
      "단어는 뜻 하나만 외우지 않고 시험 범위의 문장과 함께 익힙니다. 긴 문장은 주어와 동사를 먼저 찾고 수식어를 묶어 해석합니다. 이후 교과서 본문을 문단별로 요약하고 어법, 빈칸, 순서 배열 문제로 바꾸어 실제 내신에 적용합니다.",
    concern: "단어장을 반복해도 지문에서 단어 뜻이 바로 떠오르지 않는 학생",
    parentConcern: "영어 기초와 당장 다가오는 학교 시험을 어느 비중으로 준비할지 고민되는 상황",
    method:
      "매일 시험 범위 어휘와 세 문장 해석을 진행하고 주말에는 누적 어휘와 본문 변형 문제를 확인합니다.",
    image: "/hero-tutor.png",
    imageAlt: "도마동 학교 생활권 고등학생의 영어 어휘와 내신 독해 학습 장면",
    nearbySchools: ["대전제일고등학교", "대전도마중학교", "대전삼육중학교"],
    faq: [
      {
        question: "도마동 고등 영어과외는 중학교 어휘부터 보완할 수 있나요?",
        answer:
          "현재 학년 지문을 이해하는 데 필요한 기초 어휘를 선별해 학교 시험 범위와 함께 보완할 수 있습니다.",
      },
      {
        question: "영어 내신 준비에서 가장 먼저 확인할 것은 무엇인가요?",
        answer:
          "교과서, 부교재, 학교 프린트 중 실제 시험 범위를 확인하고 학생이 어휘와 문장 구조 중 어디에서 막히는지 진단해야 합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "daeheung-dong",
    dongName: "대흥동",
    subject: "korean",
    subjectName: "국어",
    keyword: "대흥동 고등 국어과외",
    title: "대흥동 고등 국어과외 | 학교 작품과 독해 기본기 연결",
    description:
      "대전 대흥동 고등학생을 위한 국어과외 정보입니다. 학교 작품 정리, 비문학 독해, 선지 분석과 내신 복습 방향을 안내합니다.",
    lead:
      "대흥동 학교 생활권의 국어 내신을 준비할 때는 수업 필기를 외우는 것과 스스로 지문을 읽는 힘을 함께 키워야 합니다. 학생의 현재 독해 속도와 근거 찾기 습관을 먼저 확인합니다.",
    detailTopic: "수업 필기를 실제 문제 해결력으로 바꾸기",
    detailBody:
      "교과서 작품은 수업 필기의 핵심 설명을 작품 속 표현과 연결합니다. 비문학은 문단의 역할과 중심 정보를 표시하고 선택지를 지문 근거와 비교합니다. 시험 후 오답은 정답 해설보다 자신이 놓친 표현과 판단 과정을 기록합니다.",
    concern: "수업 필기는 열심히 하지만 문제에서 어떤 부분을 근거로 써야 할지 모르는 학생",
    parentConcern: "국어 성적의 변동 폭이 크고 학생이 구체적인 공부 방법을 설명하지 못하는 상황",
    method:
      "학교 작품 정리와 주 2회 비문학 독해를 병행하고 선택지 판단 근거를 문장으로 남깁니다.",
    image: "/hero-background-premium.png",
    imageAlt: "대흥동 학교 생활권 고등학생의 국어 작품과 독해 학습 장면",
    nearbySchools: ["대전고등학교", "대전중학교", "대전성모여자고등학교", "대전여자중학교"],
    faq: [
      {
        question: "대흥동 고등 국어과외는 학교 내신과 모의고사를 같이 준비하나요?",
        answer:
          "시험 기간에는 학교 작품과 수업 자료를 우선하고 평소에는 비문학 독해와 문학 적용 문제를 병행합니다.",
      },
      {
        question: "국어 문제를 많이 풀어도 점수가 그대로인 이유는 무엇인가요?",
        answer:
          "정답만 확인하고 지문 근거와 오답 선지의 오류를 분석하지 않으면 같은 판단 실수가 반복될 수 있습니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "jungni-dong",
    dongName: "중리동",
    subject: "math",
    subjectName: "수학",
    keyword: "중리동 고등 수학과외",
    title: "중리동 고등 수학과외 | 진도보다 이해도를 먼저 확인",
    description:
      "대전 중리동 고등학생을 위한 수학과외 정보입니다. 학습 수준 진단, 학교 내신 범위, 개념 복구와 문제 풀이 계획을 안내합니다.",
    lead:
      "중리동 고등 수학과외는 빠른 선행보다 학생이 현재 단원을 설명하고 대표 문제를 스스로 해결할 수 있는지를 먼저 봐야 합니다. 이해하지 못한 채 넘어간 부분을 찾는 것이 성적 변화의 출발점입니다.",
    detailTopic: "진도와 이해도의 차이를 줄이는 수업",
    detailBody:
      "학생에게 개념을 말로 설명하게 하고 기본, 대표, 변형 문제의 풀이 과정을 차례로 확인합니다. 막히는 단계가 발견되면 필요한 선수 단원만 돌아가 보완합니다. 학교 시험 전에는 범위별 완성도를 표시해 남은 시간을 취약 단원에 집중합니다.",
    concern: "선행 진도는 나갔지만 현재 학교 단원의 기본 문제에서도 풀이가 불안한 학생",
    parentConcern: "진도를 늦추면 불안하고 계속 나가면 이해가 부족할 것 같아 방향을 정하기 어려운 상황",
    method:
      "매주 개념 설명, 대표 문제, 누적 복습을 확인하고 이해도가 확보된 단원만 다음 단계로 넘어갑니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "중리동 학교 생활권 고등학생의 수학 이해도 진단과 내신 학습 장면",
    nearbySchools: ["동대전고등학교", "중리중학교"],
    faq: [
      {
        question: "중리동 고등 수학과외는 선행보다 내신을 우선할 수 있나요?",
        answer:
          "학생의 목표와 시험 일정에 따라 학교 진도와 내신 범위를 우선하고 필요한 경우에만 다음 단원을 준비합니다.",
      },
      {
        question: "어느 단원부터 다시 공부해야 하는지 어떻게 찾나요?",
        answer:
          "최근 시험과 기본 문제 풀이, 개념 설명을 함께 확인해 현재 단원에 직접 영향을 주는 선수 개념부터 선별합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "guam-dong",
    dongName: "구암동",
    subject: "english",
    subjectName: "영어",
    keyword: "구암동 고등 영어과외",
    title: "구암동 고등 영어과외 | 어법 서술형과 수행평가 준비",
    description:
      "대전 구암동 고등학생을 위한 영어과외 정보입니다. 학교 어법, 영작 서술형, 수행평가와 부족한 문장 기초 보완 방법을 안내합니다.",
    lead:
      "구암동 고등 영어는 지필평가뿐 아니라 영작과 발표 같은 수행평가 준비도 필요할 수 있습니다. 학생이 말하기, 쓰기, 독해 중 무엇을 가장 부담스러워하는지 확인해 준비 순서를 정하는 것이 중요합니다.",
    detailTopic: "어법 지식을 영작 답안으로 연결하기",
    detailBody:
      "문법 규칙을 문제 선택지에서만 확인하지 않고 시험 범위 문장을 직접 변형해 씁니다. 자주 틀리는 시제, 수일치, 관계사, 준동사는 개인 오류표로 정리합니다. 수행평가는 초안을 짧게 작성한 뒤 표현의 정확성과 말하기 속도를 단계적으로 다듬습니다.",
    concern: "어법 객관식은 풀지만 영작과 수행평가에서 문장을 직접 만들기 어려운 학생",
    parentConcern: "지필평가와 수행평가 일정을 함께 관리하지 못해 준비가 시험 직전에 몰리는 상황",
    method:
      "주간 계획에 지필 범위와 수행평가 일정을 함께 표시하고 핵심 문장을 쓰기와 말하기로 반복합니다.",
    image: "/hero-tutor.png",
    imageAlt: "구암동 학교 생활권 고등학생의 영어 어법 서술형과 수행평가 학습 장면",
    nearbySchools: ["유성고등학교", "유성생명과학고등학교"],
    faq: [
      {
        question: "구암동 고등 영어과외에서 수행평가 준비도 가능한가요?",
        answer:
          "학교에서 안내한 평가 기준과 일정을 확인해 영작 초안, 표현 교정, 발표 연습 등 필요한 부분을 준비할 수 있습니다.",
      },
      {
        question: "영어 서술형에서 자꾸 감점되는 이유는 무엇인가요?",
        answer:
          "문장의 핵심 의미는 맞아도 시제, 수일치, 철자, 요구 어휘가 빠져 감점될 수 있어 개인 오류 유형을 관리해야 합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "mok-dong",
    dongName: "목동",
    subject: "korean",
    subjectName: "국어",
    keyword: "목동 고등 국어과외",
    title: "목동 고등 국어과외 | 문학 개념과 선택지 판단 보완",
    description:
      "대전 중구 목동 고등학생을 위한 국어과외 정보입니다. 문학 개념, 작품 근거, 선택지 판단과 학교 내신 대비 방법을 안내합니다.",
    lead:
      "대전 목동 고등 국어과외는 개념어를 외우는 데서 끝나지 않고 실제 작품의 어느 표현에 적용되는지 설명할 수 있게 해야 합니다. 학생이 틀린 선지를 고른 이유부터 확인해 판단 기준을 세웁니다.",
    detailTopic: "문학 개념을 작품 속 근거와 연결하기",
    detailBody:
      "화자, 시점, 갈등, 표현법 같은 개념을 짧게 정리한 뒤 학교 시험 작품에서 직접 찾습니다. 선택지는 맞는 부분과 틀린 부분을 나누어 읽고 과도한 해석이나 근거 없는 표현을 표시합니다. 서술형은 작품의 핵심어를 포함해 문장을 완성합니다.",
    concern: "문학 용어는 알지만 작품 문제에서 개념을 적용하지 못하는 학생",
    parentConcern: "학생이 국어는 답이 애매하다고 느껴 오답 복습을 피하는 상황",
    method:
      "작품별 핵심 개념과 근거 표현을 표로 정리하고 변형 선택지의 오류를 직접 고쳐봅니다.",
    image: "/hero-background-premium.png",
    imageAlt: "대전 목동 학교 생활권 고등학생의 국어 문학 개념과 선택지 분석 장면",
    nearbySchools: ["충남여자고등학교", "충남여자중학교", "대전대성고등학교", "대전대성중학교"],
    faq: [
      {
        question: "대전 목동 고등 국어과외에서 학교 작품을 중심으로 공부하나요?",
        answer:
          "내신 기간에는 교과서 작품과 학교 수업 자료를 중심으로 하고 평소에는 낯선 작품에 개념을 적용하는 연습을 병행합니다.",
      },
      {
        question: "문학 선택지를 볼 때 무엇을 먼저 확인해야 하나요?",
        answer:
          "선택지의 핵심 판단어가 작품 속 표현과 일치하는지 확인하고 지나치게 단정하거나 범위를 넓힌 부분이 없는지 살펴야 합니다.",
      },
    ],
  },
  {
    city: "daejeon",
    cityName: "대전",
    dong: "samseong-dong",
    dongName: "삼성동",
    subject: "math",
    subjectName: "수학",
    keyword: "삼성동 고등 수학과외",
    title: "삼성동 고등 수학과외 | 시험 시간 관리와 실전 점검",
    description:
      "대전 삼성동 고등학생을 위한 수학과외 정보입니다. 학교 내신 실전 연습, 시간 배분, 취약 유형 보완과 오답 재시험을 안내합니다.",
    lead:
      "삼성동 고등 수학에서 집에서는 풀리지만 시험장에서 시간이 부족하다면 지식보다 문제 선택 순서와 긴장 상황의 풀이 습관을 확인해야 합니다. 학생별 실전 문제를 통해 구체적인 원인을 찾습니다.",
    detailTopic: "아는 문제를 시험장에서 점수로 바꾸는 연습",
    detailBody:
      "학교 시험과 비슷한 문항 수와 제한 시간을 정해 실전 문제를 풉니다. 막힌 문제에 머문 시간, 검산하지 못한 문제, 쉬운 실수를 표시해 개인 시간 배분 규칙을 만듭니다. 실전 후에는 점수보다 취약 유형과 판단 순서를 먼저 보완합니다.",
    concern: "평소 문제는 풀지만 시험 시간 부족과 긴장으로 아는 문제까지 놓치는 학생",
    parentConcern: "공부한 양에 비해 시험 점수가 낮고 시험이 끝날 때마다 실수를 아쉬워하는 상황",
    method:
      "시험 3주 전부터 짧은 실전 세트를 반복하고 문제별 소요 시간과 검산 순서를 기록합니다.",
    image: "/high-school-math-tutoring.png",
    imageAlt: "삼성동 학교 생활권 고등학생의 수학 시험 시간 관리와 실전 점검 장면",
    nearbySchools: ["보문고등학교", "보문중학교", "계룡디지텍고등학교", "한밭중학교"],
    faq: [
      {
        question: "삼성동 고등 수학과외에서 실전 시험도 진행하나요?",
        answer:
          "학생의 학교 범위와 현재 수준에 맞는 문항으로 제한 시간 연습을 진행하고 시간 사용과 오답 원인을 함께 분석합니다.",
      },
      {
        question: "시험 시간 부족은 문제를 빨리 풀면 해결되나요?",
        answer:
          "속도만 높이기보다 풀 문제의 순서, 한 문제에 사용할 최대 시간, 검산할 문항을 미리 정하는 것이 더 안정적입니다.",
      },
    ],
  },
];

type MiddleSeed = {
  dong: string;
  dongName: string;
  subject: "math" | "english" | "korean";
  subjectName: "수학" | "영어" | "국어";
  focus: string;
  concern: string;
  parentConcern: string;
  custom?: {
    detailTopic: string;
    detailBody: string;
    method: string;
    faq: { question: string; answer: string }[];
  };
};

const middleSeeds: MiddleSeed[] = [
  { dong: "gwanpyeong-dong", dongName: "관평동", subject: "english", subjectName: "영어", focus: "교과서 본문과 어휘 복습", concern: "단어는 외우지만 긴 문장의 구조를 잡지 못해 해석이 끊기는 학생", parentConcern: "영어 공부 시간은 긴데 학교 시험 점수가 안정되지 않는 상황", custom: {
    detailTopic: "관평동 중학생의 영어 본문을 문장 구조로 이해하는 순서",
    detailBody: "외운 본문을 그대로 말하는 것과 낯선 변형 문장을 해석하는 것은 다릅니다. 먼저 한 문장에서 주어와 동사를 표시하고 수식어를 묶은 뒤, 핵심 어휘가 문맥에서 어떤 뜻으로 쓰였는지 확인합니다. 학교별 자료가 있다면 실제 범위와 수업 필기를 기준으로 다시 정리합니다.",
    method: "하루 분량을 어휘 확인, 두 문장 구조 분석, 짧은 영작으로 나누고 다음 수업에서 막힌 단계부터 보완합니다.",
    faq: [
      { question: "관평동 중등 영어과외는 본문 암기만 진행하나요?", answer: "본문 암기만 반복하지 않습니다. 문장의 뼈대를 찾고 핵심 표현을 다른 문장에 적용해 보면서 변형 문제와 서술형에 대응할 수 있는지 확인합니다." },
      { question: "관평동 중학생이 단어를 외워도 독해가 안 되면 무엇부터 하나요?", answer: "단어량과 문장 구조 중 어디에서 해석이 끊기는지 구분합니다. 짧은 문장부터 주어와 동사를 찾고 의미 단위로 읽는 연습을 한 뒤 긴 지문으로 확장합니다." },
    ],
  } },
  { dong: "dunsan-dong", dongName: "둔산동", subject: "math", subjectName: "수학", focus: "개념 연결과 서술형 풀이", concern: "공식은 기억하지만 문제 조건에 맞는 식을 세우기 어려운 학생", parentConcern: "학원 진도를 따라가도 틀린 문제의 원인을 설명하지 못하는 상황", custom: {
    detailTopic: "둔산동 중학생의 수학 풀이를 말과 식으로 연결하는 연습",
    detailBody: "정답을 맞힌 문제도 왜 그 공식을 선택했는지 설명하지 못하면 조건이 바뀔 때 다시 막힐 수 있습니다. 문제에서 주어진 값과 구할 것을 분리하고, 사용한 개념을 한 문장으로 말한 다음 식을 세웁니다. 확인되지 않은 학교별 경향을 단정하지 않고 실제 시험지와 범위를 받은 뒤 대비 순서를 정합니다.",
    method: "오답마다 계산, 조건 해석, 개념 선택 중 원인을 하나로 표시하고 같은 원인의 새 문제를 혼자 설명하며 다시 풉니다.",
    faq: [
      { question: "둔산동 중등 수학과외에서 서술형 풀이는 어떻게 점검하나요?", answer: "답만 확인하지 않고 문제 조건, 선택한 개념, 계산 과정이 이어지는지 봅니다. 빠진 근거를 학생이 직접 말로 보충한 뒤 식과 문장으로 정리합니다." },
      { question: "둔산동 중학생이 진도는 빠른데 응용문제를 못 풀면 어떻게 하나요?", answer: "새 진도를 늘리기 전에 최근 오답을 유형별로 나눕니다. 개념을 모르는지, 조건을 해석하지 못하는지 확인하고 필요한 단계만 돌아가 보완합니다." },
    ],
  } },
  { dong: "doan-dong", dongName: "도안동", subject: "english", subjectName: "영어", focus: "어휘·문법·독해 연결", concern: "문법 문제는 풀지만 실제 지문 해석에 적용하지 못하는 학생", parentConcern: "중학교 영어 난도가 높아진 뒤 자신감과 학습량이 함께 떨어진 상황" },
  { dong: "tanbang-dong", dongName: "탄방동", subject: "korean", subjectName: "국어", focus: "지문 근거와 서술형 답안", concern: "감으로 답을 고르고 정답의 근거를 지문에서 찾지 못하는 학생", parentConcern: "국어는 따로 공부하지 않아도 된다고 생각해 복습이 밀리는 상황" },
  { dong: "noeun-dong", dongName: "노은동", subject: "math", subjectName: "수학", focus: "연산 정확도와 유형 적용", concern: "풀이 방향은 맞지만 부호와 계산 실수로 점수를 잃는 학생", parentConcern: "숙제는 하지만 오답을 다시 풀지 않아 같은 실수가 반복되는 상황" },
  { dong: "wolpyeong-dong", dongName: "월평동", subject: "korean", subjectName: "국어", focus: "문학 개념과 독해 습관", concern: "문학 용어를 외워도 작품 속 표현과 연결하지 못하는 학생", parentConcern: "책을 읽어도 시험 문제에서는 핵심 내용을 놓치는 상황" },
  { dong: "wolpyeong-dong", dongName: "월평동", subject: "english", subjectName: "영어", focus: "학교 본문 분석과 서술형 영작", concern: "본문의 뜻은 이해하지만 핵심 문장을 직접 쓰거나 어법에 맞게 바꾸기 어려운 학생", parentConcern: "단어와 본문을 반복해서 외워도 서술형 답안에서 점수를 잃는 상황", custom: {
    detailTopic: "월평동 중학생의 영어 서술형 답안을 스스로 고치는 방법",
    detailBody: "영작은 완성 문장을 통째로 외우기보다 전달할 내용과 필수 표현을 먼저 정하는 것이 좋습니다. 초안을 쓴 뒤 동사의 형태, 주어와 수의 일치, 철자, 빠진 단어를 순서대로 확인합니다. 학교 시험은 제공된 교과서·프린트·시험 범위를 확인한 뒤 그 자료 안에서 준비합니다.",
    method: "주간 복습 때 틀린 영작을 정답과 바로 바꾸지 않고 오류 표시만 보고 한 번 더 고친 뒤 개인 실수 목록에 기록합니다.",
    faq: [
      { question: "월평동 중등 영어과외에서 서술형 영작도 준비할 수 있나요?", answer: "가능합니다. 현재 시험 범위의 핵심 표현을 확인하고, 문장 배열과 빈칸 영작부터 완전한 문장 쓰기까지 학생 수준에 맞춰 단계적으로 연습합니다." },
      { question: "월평동 중학생의 영어 오답은 어떻게 관리하나요?", answer: "어휘 부족, 문장 구조, 어법, 철자처럼 원인을 나눕니다. 정답을 베끼는 대신 같은 오류를 스스로 고친 문장을 남겨 다음 복습에서 다시 확인합니다." },
    ],
  } },
  { dong: "jeonmin-dong", dongName: "전민동", subject: "math", subjectName: "수학", focus: "취약 단원 복구와 내신 대비", concern: "앞 단원의 빈틈 때문에 새 단원 문제까지 연속해서 막히는 학생", parentConcern: "진도는 나가지만 기초 부족을 어디서부터 채워야 할지 모르는 상황" },
  { dong: "songchon-dong", dongName: "송촌동", subject: "english", subjectName: "영어", focus: "본문 암기보다 문장 이해", concern: "교과서 본문을 외워도 변형 문제에서 문장을 알아보지 못하는 학생", parentConcern: "시험 직전 암기에 의존해 영어 성적의 편차가 큰 상황" },
  { dong: "gao-dong", dongName: "가오동", subject: "korean", subjectName: "국어", focus: "비문학 구조와 핵심 문장", concern: "긴 설명문을 읽고도 문단별 핵심 내용을 정리하기 어려운 학생", parentConcern: "문제 풀이 속도가 느려 시험 후반 문항을 놓치는 상황" },
  { dong: "munhwa-dong", dongName: "문화동", subject: "math", subjectName: "수학", focus: "개념 확인과 오답 재시험", concern: "해설을 보면 이해하지만 혼자서는 첫 풀이를 시작하지 못하는 학생", parentConcern: "문제집 진도에 비해 실제로 풀 수 있는 문제가 적은 상황" },
  { dong: "gwanjeo-dong", dongName: "관저동", subject: "english", subjectName: "영어", focus: "학교별 본문과 서술형", concern: "단어 뜻은 알지만 문장 배열과 영작 서술형을 어려워하는 학생", parentConcern: "객관식보다 서술형에서 점수를 많이 잃는 상황" },
  { dong: "galma-dong", dongName: "갈마동", subject: "korean", subjectName: "국어", focus: "선택지 판단과 오답 설명", concern: "두 개의 선택지 사이에서 자주 흔들리고 판단 기준이 없는 학생", parentConcern: "국어 점수가 시험마다 달라 안정적인 공부법이 필요한 상황" },
  { dong: "boksu-dong", dongName: "복수동", subject: "math", subjectName: "수학", focus: "중학 수학 개념과 문제 해석", concern: "문제의 문장이 길어지면 무엇을 구해야 하는지 놓치는 학생", parentConcern: "기본 문제는 풀지만 응용 문제에서 바로 포기하는 상황" },
  { dong: "gayang-dong", dongName: "가양동", subject: "english", subjectName: "영어", focus: "매일 어휘와 짧은 독해", concern: "단어 복습 간격이 불규칙해 외운 내용을 빠르게 잊는 학생", parentConcern: "영어 공부를 시험 직전에만 몰아서 하는 상황" },
  { dong: "doma-dong", dongName: "도마동", subject: "korean", subjectName: "국어", focus: "교과서 작품과 수행평가", concern: "수업 필기를 외워도 작품의 주제와 표현법을 연결하지 못하는 학생", parentConcern: "지필평가와 수행평가 준비가 동시에 밀리는 상황" },
  { dong: "daeheung-dong", dongName: "대흥동", subject: "math", subjectName: "수학", focus: "학교 진도와 주간 복습", concern: "수업 시간에는 이해하지만 며칠 뒤 풀이 과정이 떠오르지 않는 학생", parentConcern: "복습 계획이 없어 단원평가 때마다 처음부터 다시 공부하는 상황" },
  { dong: "jungni-dong", dongName: "중리동", subject: "english", subjectName: "영어", focus: "문장 구조와 내신 어법", concern: "주어와 동사를 찾지 못해 긴 문장을 끝까지 해석하기 어려운 학생", parentConcern: "문법 개념을 배웠지만 실제 시험 문제에 적용하지 못하는 상황" },
  { dong: "guam-dong", dongName: "구암동", subject: "korean", subjectName: "국어", focus: "독해 속도와 근거 표시", concern: "지문을 여러 번 읽느라 제한 시간 안에 문제를 마치지 못하는 학생", parentConcern: "국어 시험에서 시간 부족과 실수가 반복되는 상황" },
  { dong: "mok-dong", dongName: "목동", subject: "math", subjectName: "수학", focus: "연산 기초와 단계별 응용", concern: "분수와 문자식 연산이 불안해 이후 단원의 풀이가 자주 끊기는 학생", parentConcern: "중학교 수학의 기초가 부족해 학년이 올라갈수록 부담이 커지는 상황" },
  { dong: "samseong-dong", dongName: "삼성동", subject: "english", subjectName: "영어", focus: "듣기·어휘·본문 균형", concern: "듣기와 독해 중 한 영역에만 치우쳐 전체 점수가 오르지 않는 학생", parentConcern: "영어 영역별 수준 차이가 커서 학습 우선순위를 정하기 어려운 상황" },
  ...[
    ["mannyeon-dong", "만년동"],
    ["sinseong-dong", "신성동"],
    ["wonsinheung-dong", "원신흥동"],
    ["gasuwon-dong", "가수원동"],
    ["jeongnim-dong", "정림동"],
    ["goejeong-dong", "괴정동"],
    ["yongjeon-dong", "용전동"],
    ["taepyeong-dong", "태평동"],
    ["sintanjin-dong", "신탄진동"],
    ["birae-dong", "비래동"],
  ].flatMap(([dong, dongName], dongIndex) =>
    ([
      {
        subject: "math" as const,
        subjectName: "수학" as const,
        focus: ["개념 연결과 서술형 풀이", "함수와 도형 유형 분석", "계산 정확도와 시험 시간 관리"][dongIndex % 3],
        concern: ["개념은 알지만 조건이 달라지면 풀이를 시작하지 못하는 학생", "계산 실수가 반복되어 아는 문제에서도 점수를 잃는 학생", "응용문제에서 필요한 공식을 고르기 어려운 학생"][dongIndex % 3],
        parentConcern: ["공부 시간에 비해 수학 내신 점수가 오르지 않는 상황", "오답을 다시 풀어도 같은 실수가 반복되는 상황", "중학교 수학 기초가 부족해 다음 단원까지 흔들리는 상황"][dongIndex % 3],
      },
      {
        subject: "english" as const,
        subjectName: "영어" as const,
        focus: ["교과서 본문과 어휘 복습", "문장 구조와 서술형 대비", "독해 속도와 학교 내신 관리"][dongIndex % 3],
        concern: ["단어는 외우지만 긴 문장의 구조를 잡지 못하는 학생", "본문은 외웠지만 변형 문제에서 정답을 찾기 어려운 학생", "독해 시간이 오래 걸려 시험 문제를 끝까지 풀지 못하는 학생"][dongIndex % 3],
        parentConcern: ["영어 공부 시간은 긴데 학교 시험 점수가 불안정한 상황", "문법과 독해 중 어느 부분부터 보완할지 모르는 상황", "시험 직전에만 본문을 외워 학습 내용이 오래 남지 않는 상황"][dongIndex % 3],
      },
      {
        subject: "korean" as const,
        subjectName: "국어" as const,
        focus: ["지문 근거와 선택지 판단", "문학 개념과 서술형 답안", "비문학 독해와 시험 시간 관리"][dongIndex % 3],
        concern: ["감으로 답을 골라 정답의 근거를 설명하기 어려운 학생", "문학 개념을 외워도 작품에 적용하지 못하는 학생", "긴 지문을 읽고 핵심 내용을 정리하기 어려운 학생"][dongIndex % 3],
        parentConcern: ["국어는 따로 공부하지 않아도 된다고 생각하는 상황", "시험마다 국어 점수 차이가 커 학습 방향이 필요한 상황", "독서량에 비해 학교 국어 성적이 오르지 않는 상황"][dongIndex % 3],
      },
    ]).map((subject) => ({ dong, dongName, ...subject })),
  ),
];

const subjectDetails = {
  math: {
    detailTopic: "중학 수학의 개념 빈틈을 찾아 내신으로 연결하는 방법",
    detailBody: "최근 시험과 교재에서 틀린 문제를 개념 부족, 문제 해석, 계산 실수로 나눕니다. 필요한 선수 개념을 짧게 복구한 뒤 기본 문제와 학교 시험형 문제를 순서대로 풀어 혼자 설명할 수 있는지 확인합니다.",
    method: "주 1회 취약 개념을 점검하고 같은 유형을 1일, 3일, 7일 간격으로 다시 풉니다.",
  },
  english: {
    detailTopic: "중학 영어의 어휘·문장·본문을 함께 공부하는 방법",
    detailBody: "학교 교과서와 부교재를 기준으로 핵심 어휘를 익히고 문장의 주어와 동사를 표시합니다. 본문을 의미 단위로 해석한 뒤 어법과 서술형 변형 문제로 연결해 암기만으로 끝나지 않게 합니다.",
    method: "매일 짧은 어휘 복습과 문장 두 개 분석을 하고 주말에 본문 변형 문제로 확인합니다.",
  },
  korean: {
    detailTopic: "중학 국어의 지문 이해와 답의 근거를 만드는 방법",
    detailBody: "교과서 작품과 설명문을 읽고 문단별 핵심을 한 문장으로 정리합니다. 선택지의 맞고 틀린 이유를 지문에서 표시하고 서술형은 핵심어가 포함됐는지 직접 점검합니다.",
    method: "지문 하나마다 중심 내용, 답의 근거, 틀린 이유를 기록하고 다음 주에 다시 설명합니다.",
  },
} as const;

const middleTutoringArticles: TutoringArticle[] = middleSeeds.map((seed, index) => {
  const detail = subjectDetails[seed.subject];
  const nearby = ["학교 진도 확인", "최근 시험 분석", "수행평가 일정", "학습 습관 점검"];
  return {
    city: "daejeon",
    cityName: "대전",
    ...seed,
    gradeName: "중등",
    gradeSlug: "middle",
    keyword: `${seed.dongName} 중등 ${seed.subjectName}과외`,
    title: `${seed.dongName} 중등 ${seed.subjectName}과외 | ${seed.focus}`,
    description: `대전 ${seed.dongName} 중학생을 위한 ${seed.subjectName}과외 상담 정보입니다. ${seed.focus}, 학교 내신 대비, 취약 부분 보완과 학습 관리를 안내합니다.`,
    lead: `${seed.dongName} 중등 ${seed.subjectName}과외는 진도를 먼저 정하기보다 최근 시험과 교재를 살펴 학생이 막히는 지점을 찾는 것에서 시작합니다. 중학교 시기는 개념과 공부 습관을 함께 잡아야 다음 학년에서도 흔들리지 않습니다.`,
    detailTopic: seed.custom?.detailTopic ?? detail.detailTopic,
    detailBody: seed.custom?.detailBody ?? `${detail.detailBody} ${seed.dongName} 학생의 학교 진도와 시험 일정을 반영해 학습량을 조절합니다.`,
    concern: seed.concern,
    parentConcern: seed.parentConcern,
    method: seed.custom?.method ?? `${detail.method} ${nearby[index % nearby.length]} 결과를 다음 수업 계획에 반영합니다.`,
    image: seed.subject === "math" ? "/high-school-math-tutoring.png" : seed.subject === "english" ? "/hero-tutor.png" : "/hero-background-premium.png",
    imageAlt: `${seed.dongName} 중학생 ${seed.subjectName}과외와 ${seed.focus} 학습 장면`,
    faq: seed.custom?.faq ?? [
      {
        question: `${seed.dongName} 중등 ${seed.subjectName}과외 상담 전에 무엇을 준비하나요?`,
        answer: `최근 ${seed.subjectName} 시험지나 오답, 사용하는 교과서와 문제집, 학교 진도와 가장 어려운 부분을 알려주시면 학생 상황을 구체적으로 확인할 수 있습니다.`,
      },
      {
        question: `중등 ${seed.subjectName} 내신과 기초 보완을 함께 할 수 있나요?`,
        answer: `가능합니다. 시험 일정을 기준으로 내신 범위를 준비하면서 반복해서 막히는 선수 개념은 별도 복습 계획으로 보완합니다.`,
      },
    ],
  };
});

export const tutoringArticles: TutoringArticle[] = [
  ...highTutoringArticles,
  ...middleTutoringArticles,
];

export function getTutoringArticle(city: string, dong: string, subject: string) {
  return tutoringArticles.find(
    (article) =>
      article.city === city && article.dong === dong && article.subject === subject,
  );
}
