import StudyhighRenewalPreview, { renewalFaqs } from "@/components/StudyhighRenewalPreview";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "스터디하이",
    url: "https://studyhigh.co.kr",
    logo: "https://studyhigh.co.kr/studyhigh-logo.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "스터디하이",
    url: "https://studyhigh.co.kr",
    areaServed: "대한민국",
    description: "학생 성향 분석을 바탕으로 수업 방향과 선생님 매칭을 설계하는 프리미엄 1:1 맞춤 교육 브랜드입니다.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: renewalFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StudyhighRenewalPreview preview={false} />
    </>
  );
}
