import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";

type LinkTuple = [label: string, path: string];
type SeoLinkEntry = {
  title: string;
  description: string;
  pageType: "region" | "school";
  region: string;
  school: string | null;
  grade: string;
  subject: string;
  contextualLinks: LinkTuple[];
  bottomSubjectLinks: LinkTuple[];
};

const entries = JSON.parse(
  readFileSync(path.join(process.cwd(), "src", "data", "seo-internal-links.json"), "utf8"),
) as Record<string, SeoLinkEntry>;

function normalizePath(value: string) {
  if (!value.startsWith("http")) return value;
  return new URL(value).pathname;
}

function InlineLink({ link }: { link?: LinkTuple }) {
  if (!link) return null;
  return <Link href={link[1]} className="rounded-sm font-extrabold text-[#6736C8] underline decoration-[#cbb9ee] underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6736C8]">{link[0]}</Link>;
}

export function SeoInternalLinksContent({ path }: { path: string }) {
  const currentPath = normalizePath(path);
  const entry = entries[currentPath];
  if (!entry) return null;

  const [first, second, third] = entry.contextualLinks;
  const audience = entry.school ? `${entry.school} ${entry.grade}` : `${entry.region} ${entry.grade}`;
  const locationLabel = entry.school ? `${entry.region} ${entry.school}` : entry.region;

  return <section className="bg-white py-20 lg:py-28" aria-labelledby="seo-learning-guide-title">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      {entry.bottomSubjectLinks.length > 0 ? <nav aria-labelledby="related-subjects-title">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">RELATED SUBJECTS</p>
        <h2 id="related-subjects-title" className="mt-4 text-3xl font-black sm:text-5xl">같은 지역의 다른 과목도 알아보세요</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {entry.bottomSubjectLinks.map(([label, href]) => <Link key={href} href={href} className="flex min-h-12 items-center justify-center rounded-xl border border-[#DCCFFC] bg-white px-4 py-3 text-center text-sm font-extrabold text-[#452080] hover:border-[#6736C8] hover:bg-[#F4EFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6736C8]">{label}</Link>)}
        </div>
      </nav> : null}

      <article className="mt-14 rounded-[30px] border border-[#e5dcf5] bg-[#fcfaff] p-7 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">LOCAL STUDY GUIDE</p>
        <h2 id="seo-learning-guide-title" className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{entry.title} 학습 안내</h2>
        <div className="mt-8 space-y-5 text-[15px] leading-[1.95] text-black/65">
          <p>{entry.description} {audience} 학생의 수업 방향은 같은 학년과 과목이라도 최근 시험에서 막힌 단계, 혼자 공부한 기록, 목표와 가능한 학습 시간에 따라 달라집니다. 문제 수를 늘리기 전에 개념 이해, 조건 해석, 풀이 과정, 복습 실행 가운데 어디에서 흐름이 끊기는지 구체적으로 확인하는 것이 우선입니다.</p>
          <p>{entry.subject} 학습은 수업 시간에 이해했다는 느낌보다 다음 날 학생이 같은 과정을 스스로 재현할 수 있는지가 중요합니다. 최근 시험지와 오답, 사용 중인 교재를 함께 살피고 틀린 이유를 개념 부족·문제 해석·계산 또는 표현·시간 관리로 구분하면 보완 순서를 명확하게 정할 수 있습니다. 학습량은 학교 일정과 집중 시간을 고려해 실제로 실행할 수 있는 범위로 계획합니다.</p>
          <p>한 과목에서 드러난 읽기와 정리 습관은 다른 과목에도 영향을 줍니다. 관련 학습 방향을 비교하려면 <InlineLink link={first}/> 안내를 함께 확인해 보세요. 개념을 문장과 자료에서 해석하는 과정까지 점검하고 싶다면 <InlineLink link={second}/> 페이지도 참고할 수 있습니다. 연결된 안내는 모두 현재 공개 중이며 목적지를 바로 알 수 있는 지역·학교·학년·과목 앵커를 사용했습니다.</p>
          <p>수업 후에는 숙제 완료 여부만 확인하지 않고, 오답을 다시 풀었는지, 풀이 근거를 설명할 수 있는지, 비슷한 문제에서 같은 실수가 반복되는지를 기록해야 합니다. 이 기록을 다음 수업의 출발점으로 삼으면 학생과 선생님이 같은 목표를 확인할 수 있고 학부모도 막연한 점수 변화가 아니라 실제 학습 행동을 기준으로 진행 상황을 살펴볼 수 있습니다.</p>
          <p>{third ? <>과목 간 학습 습관을 더 넓게 비교하려면 <InlineLink link={third}/> 안내도 확인할 수 있습니다. </> : null}{locationLabel}에서 가능한 방문·화상 수업, 일정, 교육비와 선생님 배정은 학생의 상황과 지역별 가능 여부에 따라 달라질 수 있습니다. 페이지의 내용은 학습 방향을 이해하기 위한 안내이며, 확인되지 않은 학교별 출제 경향이나 수업 조건을 단정하지 않습니다. 구체적인 수업 범위와 진행 방식은 기존 무료 상담을 통해 확인해 주세요.</p>
        </div>
      </article>
    </div>
  </section>;
}

export function hasSeoInternalLinks(path: string) {
  return Boolean(entries[normalizePath(path)]);
}
