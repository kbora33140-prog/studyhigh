import sampleManifest from "../../data/manifests/nationwide/official-school-sample-20.json";
import type { AdditionalTutoringRecord } from "@/lib/additionalTutoring";

type Sample = (typeof sampleManifest.records)[number];

export function getOfficialSchoolSample(params: { city: string; dong: string; subject: string; detail: string; grade: string; course: string }) {
  const url = `/tutoring/${params.city}/${params.dong}/${params.subject}/${params.detail}/${params.grade}/${params.course}`;
  return sampleManifest.records.find((record) => record.page.url === url) || null;
}

export function officialSampleRecord(sample: Sample): AdditionalTutoringRecord {
  const canonical = sample.page.canonical;
  const imageUrl = `https://studyhigh.co.kr${sample.image.path}`;
  return {
    id: sample.id,
    status: "draft",
    createdAt: sampleManifest.generatedAt.slice(0, 10),
    region: {
      sido: sample.region.sido,
      sigungu: sample.region.sigungu,
      eupmyeondong: sample.region.representativeRegion,
      provinceSlug: sample.region.provinceSlug,
      districtSlug: sample.region.districtSlug,
      townSlug: sample.region.townSlug,
      townId: sample.source.schoolId,
    },
    school: {
      id: sample.source.schoolId,
      name: sample.school.name,
      type: sample.school.level,
      typeName: sample.school.level === "elementary" ? "초등학교" : sample.school.level === "middle" ? "중학교" : "고등학교",
      address: sample.school.address,
      addressDetail: "",
      source: sample.source.name,
      sourceDate: sample.source.syncedAt,
    },
    page: {
      url: sample.page.url,
      canonical,
      title: sample.page.title,
      description: sample.page.description,
      grade: sample.page.grade,
      subject: sample.page.subject,
      subjectSlug: sample.page.subjectSlug,
    },
    content: {
      theme: `${sample.page.grade} ${sample.page.subject} 학습관리`,
      introduction: sample.content.paragraphs[0],
      regionContext: sample.content.paragraphs[1],
      schoolAnalysis: sample.content.coreParagraphs[0],
      exam: sample.content.paragraphs[4],
      examCaveat: "공식 데이터에 없는 학교별 시험 난이도·범위·출제 경향은 단정하지 않습니다.",
      concern: sample.content.subjectDifficulty,
      difficultUnit: sample.content.subjectDifficulty,
      studyMethod: sample.content.studyMethod,
      parentConcern: sample.content.paragraphs[6],
      workedExample: sample.content.paragraphs[3],
      lesson: sample.content.learningGoal,
      longForm: sample.content.paragraphs,
      faq: sample.content.faq,
    },
    seo: {
      title: sample.page.title,
      description: sample.page.description,
      canonical,
      ogTitle: sample.page.title,
      ogDescription: sample.page.description,
      ogImage: imageUrl,
      keywords: [
        `${sample.region.representativeRegion} ${sample.page.grade} ${sample.page.subject}과외`,
        `${sample.school.name} ${sample.page.subject}`,
        `${sample.region.sigungu} 1:1 과외`,
      ],
    },
    image: {
      masterImage: "/thumbnails/studyhigh-official-template.png",
      imagePath: sample.image.path,
      imageUrl,
      alt: sample.image.alt,
      regionText: sample.region.representativeRegion,
      subjectText: `${sample.page.subject}과외`,
      width: 1200,
      height: 1200,
    },
    provenance: {
      regionFile: "data/schools/national-schools.json",
      schoolFile: "data/schools/national-schools.json",
      schoolId: sample.source.schoolId,
      teachingAdvice: "grade-and-subject-general-guidance",
      verifiedSchoolExamPattern: false,
    },
  } as AdditionalTutoringRecord;
}
