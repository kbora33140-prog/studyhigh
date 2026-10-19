export type MenuItem = { label: string; href: string; previewOnly?: boolean };

export type MainMenuItem = MenuItem & { children: MenuItem[] };

export const mainMenu: MainMenuItem[] = [
  {
    label: "지역별 수업",
    href: "/regions",
    children: [
      { label: "서울", href: "/regions/seoul" },
      { label: "경기", href: "/regions/gyeonggi" },
      { label: "인천", href: "/regions/incheon" },
      { label: "부산", href: "/regions/busan" },
      { label: "대구", href: "/regions/daegu" },
      { label: "대전", href: "/regions/daejeon" },
      { label: "광주", href: "/regions/gwangju" },
      { label: "울산", href: "/regions/ulsan" },
      { label: "세종", href: "/regions/sejong" },
      { label: "강원", href: "/regions/gangwon" },
      { label: "충북", href: "/regions/chungbuk" },
      { label: "충남", href: "/regions/chungnam" },
      { label: "전북", href: "/regions/jeonbuk" },
      { label: "전남", href: "/regions/jeonnam" },
      { label: "경북", href: "/regions/gyeongbuk" },
      { label: "경남", href: "/regions/gyeongnam" },
      { label: "제주", href: "/regions/jeju" },
    ],
  },
  {
    label: "학년별 수업",
    href: "/grades",
    children: [
      { label: "초등학생", href: "/elementary" },
      { label: "중학생", href: "/middle" },
      { label: "고등학생", href: "/high" },
      { label: "N수생", href: "/high#csat" },
    ],
  },
  {
    label: "과목별 수업",
    href: "/subjects",
    children: [
      { label: "국어", href: "/subjects#korean" },
      { label: "영어", href: "/subjects#english" },
      { label: "수학", href: "/subjects#math" },
      { label: "과학", href: "/subjects#science" },
      { label: "사회", href: "/subjects#social" },
      { label: "한국사", href: "/subjects#history" },
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
    label: "학습후기",
    href: "/reviews",
    children: [
      { label: "학부모 후기", href: "/reviews#parent-reviews" },
      { label: "학생 후기", href: "/reviews#student-reviews" },
      { label: "성적 향상 사례", href: "/reviews#score-cases" },
      { label: "학습 변화 사례", href: "/reviews#change-cases" },
      { label: "Q&A", href: "/faq" },
    ],
  },
];

export const footerLinks: MenuItem[] = [
  { label: "스터디하이 소개", href: "/about" },
  ...mainMenu.map(({ label, href }) => ({ label, href })),
  { label: "자주 묻는 질문", href: "/faq" },
];
