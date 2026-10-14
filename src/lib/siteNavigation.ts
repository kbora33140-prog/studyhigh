export type MenuItem = {
  label: string;
  href: string;
};

export type MainMenuItem = MenuItem & {
  children: MenuItem[];
};

export const mainMenu: MainMenuItem[] = [
  {
    label: "스터디하이 소개",
    href: "/about",
    children: [
      { label: "브랜드 소개", href: "/about#brand" },
      { label: "교육 철학", href: "/about#philosophy" },
      { label: "1:1 맞춤 교육 시스템", href: "/about#personal-system" },
      { label: "전문 선생님 소개", href: "/about#teachers" },
      { label: "방문·화상과외 안내", href: "/about#class-methods" },
      { label: "선생님 매칭 과정", href: "/about#matching-process" },
    ],
  },
  {
    label: "초등 과외",
    href: "/elementary",
    children: [
      { label: "초등 국어", href: "/elementary#korean" },
      { label: "초등 영어", href: "/elementary#english" },
      { label: "초등 수학", href: "/elementary#math" },
      { label: "기초학습 및 공부습관", href: "/elementary#study-habits" },
      { label: "선행학습", href: "/elementary#advance" },
      { label: "심화학습", href: "/elementary#deep-learning" },
    ],
  },
  {
    label: "중등 과외",
    href: "/middle",
    children: [
      { label: "중등 국어", href: "/middle#korean" },
      { label: "중등 영어", href: "/middle#english" },
      { label: "중등 수학", href: "/middle#math" },
      { label: "중등 과학", href: "/middle#science" },
      { label: "중학교 내신대비", href: "/middle#school-exam" },
      { label: "고등 선행학습", href: "/middle#high-advance" },
    ],
  },
  {
    label: "고등 과외",
    href: "/high",
    children: [
      { label: "고등 국어", href: "/high#korean" },
      { label: "고등 영어", href: "/high#english" },
      { label: "고등 수학", href: "/high#math" },
      { label: "고등 과학", href: "/high#science" },
      { label: "고1·고2·고3 맞춤 과외", href: "/high#grade-program" },
      { label: "내신대비", href: "/high#school-exam" },
      { label: "수능 및 모의고사 대비", href: "/high#csat" },
      { label: "수행평가 및 서술형 대비", href: "/high#performance" },
    ],
  },
  {
    label: "학습관리",
    href: "/learning-management",
    children: [
      { label: "맞춤형 학습관리", href: "/learning-management#personal-management" },
      { label: "자기주도학습 코칭", href: "/learning-management#self-directed" },
      { label: "숙제 및 오답관리", href: "/learning-management#homework-errors" },
      { label: "취약 유형 분석", href: "/learning-management#weakness-analysis" },
      { label: "AI 수학 학습", href: "/learning-management#ai-math" },
      { label: "월간 학습 리포트", href: "/learning-management#monthly-report" },
    ],
  },
  {
    label: "수업 후기",
    href: "/reviews",
    children: [
      { label: "학부모 후기", href: "/reviews#parent-reviews" },
      { label: "학생 후기", href: "/reviews#student-reviews" },
      { label: "성적 향상 사례", href: "/reviews#score-cases" },
      { label: "학습 변화 사례", href: "/reviews#change-cases" },
      { label: "교육 정보 및 칼럼", href: "/reviews#columns" },
    ],
  },
];

export const footerLinks: MenuItem[] = [
  ...mainMenu.map(({ label, href }) => ({ label, href })),
  { label: "지역별 과외", href: "/regions" },
  { label: "자주 묻는 질문", href: "/faq" },
];
