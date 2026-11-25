"use client";

import type { MouseEvent } from "react";
import "./studyhigh-home.css";

const sections = {
  "question": {
    "cls": "sh-question",
    "h": "<div class=\"sh-early-wrap\"><p class=\"sh-early-eyebrow\">LEARNING QUESTION</p><h2>공부를 해도 왜 제자리일까요?</h2><p class=\"sh-early-lead\">공부 시간을 늘리기 전에, 아이가 어디에서 막히는지 먼저 살펴봅니다.</p><div class=\"sh-question-grid\"><div class=\"sh-question-circle\"><span></span><strong>열심히 하는데<br>어디서 막힌 걸까?</strong></div><div><div class=\"sh-thoughts\"><b>자기주도학습</b><b>공부방법</b><b>집중력</b><b>성적향상</b><b>제자리 성적</b><b>공부계획</b><b>학습관리</b><b>진로</b><b>목표</b><b>공부가 어려워요</b></div><p class=\"sh-question-answer\">학생의 성향과 설명 방식이 맞아야 수업을 이해하고,<br>꾸준히 실행하면서 성적 변화로 연결할 수 있습니다.</p></div></div></div>"
  },
  "why": {
    "cls": "sh-why",
    "h": "<div class=\"sh-early-wrap\"><p class=\"sh-early-eyebrow\">WHY STUDYHIGH</p><h2>왜 스터디하이 과외여야 할까요?</h2><p class=\"sh-early-lead\"><strong>스터디하이는 수업보다 먼저 학생의 입장을 고려합니다.</strong></p><div class=\"sh-why-panel\"><div class=\"sh-fit\"><small>STUDENT FIRST</small><h3>아이와 선생님이 맞아야<br><em>배움이 앞으로 나아갑니다</em></h3><p>같은 설명도 아이의 성향과 질문 방식에 따라 다르게 받아들여집니다. 아이가 편하게 질문하고 이해할 수 있는 선생님을 만날 때 수업 참여와 학습 실행이 자연스럽게 이어집니다.</p><div><b>학생 성향</b><b>선생님 수업 방식</b><b>맞춤 수업</b></div></div><div class=\"sh-benefits\"><article><span>01</span><h3>경력 인증 선생님</h3><p>확인된 경력과 수업 경험을 바탕으로 학생에게 맞는 선생님을 추천합니다.</p></article><article><span>02</span><h3>1:1 맞춤 커리큘럼</h3><p>현재 수준과 목표, 학교 진도에 맞춰 학생만의 학습 순서를 설계합니다.</p></article><article class=\"sh-benefit-focus\"><span>03</span><h3>비수업일 학습관리</h3><p>수업이 없는 날에도 계획과 과제, 복습 흐름을 체계적으로 점검합니다.</p></article><article><span>04</span><h3>학부모 정기 피드백</h3><p>수업 진행과 학습 변화, 다음 관리 방향을 학부모님께 정기적으로 안내합니다.</p></article></div></div><div class=\"sh-why-cta\"><div><strong>방문과외와 화상과외 모두 학생 중심으로</strong><p>상담과 체험수업으로 아이와 선생님의 수업 궁합을 직접 확인한 뒤 결정할 수 있습니다.</p></div><a href=\"#contact\">무료 상담 신청</a></div></div>"
  },
  "subjects": {
    "cls": "sh-subjects",
    "id": "subjects",
    "h": "<div class=\"sh-early-wrap\"><div class=\"sh-subject-head\"><div><p class=\"sh-early-eyebrow\">SUBJECT LESSONS</p><h2>과목별 수업</h2><p class=\"sh-early-lead\">과목마다 막히는 지점을 찾아 아이에게 맞는 순서로 가르칩니다.</p></div><p>과목을 선택하면 학습 고민과 초·중·고 맞춤 커리큘럼을 확인할 수 있습니다.</p></div><div class=\"sh-subject-grid\"><a class=\"sh-subject-medium\" href=\"/subjects/korean\"><small>SUBJECT 01</small><b>국어</b><span>독해 과정과 답의 근거</span><em>→</em></a><a class=\"sh-subject-medium\" href=\"/subjects/english\"><small>SUBJECT 02</small><b>영어</b><span>어휘·문장 구조·독해</span><em>→</em></a><a class=\"sh-subject-hot\" href=\"/subjects/math\"><small>SUBJECT 03</small><strong>FOCUS</strong><b>수학</b><span>개념 이해와 풀이 과정</span><em>→</em></a><a class=\"sh-subject-hot\" href=\"/subjects/science\"><small>SUBJECT 04</small><strong>FOCUS</strong><b>과학</b><span>현상과 원리의 연결</span><em>→</em></a><a href=\"/subjects/social\"><small>SUBJECT 05</small><b>사회</b><span>핵심 개념과 자료 해석</span><em>→</em></a><a href=\"/subjects/history\"><small>SUBJECT 06</small><b>한국사</b><span>시대 흐름과 사건의 인과관계</span><em>→</em></a><a href=\"/subjects/coding\"><small>SUBJECT 07</small><b>코딩</b><span>논리적 사고와 문제 해결</span><em>→</em></a></div></div>"
  },
  "change": {
    "cls": "sh-study-change",
    "id": "study-changes",
    "h": "\n  <div class=\"sh-early-wrap\">\n    <h2 id=\"study-changes-title\">혼자 공부하는 방식이 달라집니다</h2>\n    <div class=\"sh-change-grid\">\n      <h3 class=\"sh-change-before\">혼자 공부할 때</h3><span aria-hidden=\"true\"></span><h3 class=\"sh-change-after\">함께 관리하면</h3>\n      <p class=\"sh-change-before\">계획이 자주 끊겨요</p><span aria-hidden=\"true\">→</span><p class=\"sh-change-after\">이번 주 목표를 함께 정하고 점검해요</p>\n      <p class=\"sh-change-before\">왜 틀렸는지 모르겠어요</p><span aria-hidden=\"true\">→</span><p class=\"sh-change-after\">틀린 이유를 찾아 적고 다시 풀어요</p>\n      <p class=\"sh-change-before\">질문을 미루게 돼요</p><span aria-hidden=\"true\">→</span><p class=\"sh-change-after\">막힌 부분을 묻고 피드백을 받아요</p>\n    </div>\n  </div>\n"
  },
  "matching": {
    "cls": "sh-matching",
    "h": "<div class=\"sh-matching-wrap\"><p class=\"sh-matching-eyebrow\">MATCHING PROCESS</p><h2>선생님을 만나는 3단계</h2><p class=\"sh-matching-lead\">상담으로 아이의 상황을 살피고, 30분 체험수업 후 결정할 수 있습니다.</p><div class=\"sh-matching-panel\"><ol><li><i>01</i><div><span>STEP 01</span><h3>상담</h3><p>학생의 현재 상황과 원하는 수업 방향을 듣습니다.</p></div></li><li><i>02</i><div><span>STEP 02</span><h3>선생님 추천</h3><p>학생 상황에 맞는 수업 방향과 선생님을 추천하고 안내합니다.</p></div></li><li><i>03</i><div><span>STEP 03</span><h3>30분 체험수업 후 결정</h3><p>추천 선생님과 30분 체험수업을 진행한 뒤 결정합니다.</p></div></li></ol><div class=\"sh-recommend\">↻ 체험수업이 만족스럽지 않다면 다른 선생님을 다시 추천받아 체험수업을 진행할 수 있습니다.</div></div></div>"
  },
  "weekly": {
    "cls": "sh-weekly-care",
    "id": "learning-management",
    "h": "\n  <div class=\"sh-weekly-wrap\">\n    <div class=\"sh-weekly-heading\">\n      <div>\n        <p class=\"sh-weekly-eyebrow\">WEEKLY LEARNING CARE</p>\n        <h2>주 2회 수업 비용으로<br><span>최대 주 7일 학습관리</span></h2>\n        <p class=\"sh-weekly-lead\">선생님과 만나는 수업에 스스로 공부하는 날의 학습관리를 더해 일주일의 공부 흐름을 이어갑니다.</p>\n        <div class=\"sh-mode-tags\"><b>방문수업</b><b>화상수업</b><b class=\"sh-mode-all\">두 수업 모두 적용</b></div>\n      </div>\n      <div class=\"sh-weekly-number\"><small>ONE WEEK, ONE FLOW</small><div><strong>7</strong><b>DAYS<br>CARE</b></div><dl><dt>수업 방식</dt><dd>방문수업 · 화상수업</dd><dt>관리 범위</dt><dd>수업일부터 다음 수업 전까지</dd></dl></div>\n    </div>\n    <div class=\"sh-studyroom\">\n      <div class=\"sh-studyroom-main\"><div><small>SELF-DIRECTED STUDY</small><h3>자율학습<br><span>온라인 독서실</span></h3><p>스스로 공부하기 어렵거나 학습관리가 필요한 아이가 비수업일에도 공부 흐름을 이어가도록 돕습니다.</p><ul><li>오늘 공부할 범위와 목표 확인</li><li>가능한 시간에 온라인 독서실 입실</li><li>학습 기록을 다음 계획에 반영</li></ul><strong>아이의 일정에 따라 자율적으로 공부하고,<br>비수업일에도 스스로 공부하는 습관을 만듭니다.</strong></div>\n      <div class=\"sh-room-guide\" id=\"study-room-guide\">\n        <h4>학습 계획부터 자습까지 함께 관리합니다</h4>\n        <dl>\n          <div><dt>희망 과목 선생님 <span>학습 설계</span></dt><dd>1:1 수업 내용을 바탕으로 아이와 함께 공부할 범위와 우선순위를 정합니다.</dd></div>\n          <div><dt>자습 담당 선생님 <span>실시간 관리</span></dt><dd>온라인 독서실 입실부터 자습 중 집중 상태까지 확인합니다.</dd></div>\n        </dl>\n        <p><b>운영시간 · 한국시간</b><br>평일 20:00–24:00<br>주말 10:00–12:00, 14:00–18:00</p>\n      </div></div>\n      <div class=\"sh-studyroom-foot\"><p><b>비수업일도 체계적으로</b> 수업과 수업 사이에도 학습 흐름이 끊기지 않게 관리합니다.</p><a href=\"#contact\">온라인 독서실 이용 상담</a></div>\n    </div>\n    <div class=\"sh-weekly-cta\"><div><strong>우리 아이의 일주일 학습 흐름을 확인해 보세요</strong><p>학생 일정과 관리 편성에 따라 주 4회부터 최대 주 7회까지 운영됩니다.</p></div><a href=\"#contact\">무료 상담 신청</a></div>\n  </div>\n"
  },
  "reviews": {
    "cls": "sh-reviews",
    "id": "reviews",
    "h": "<div class=\"sh-early-wrap\"><h2>수업 후 달라진 점</h2><p>“숙제하라는 말이 줄었어요.” “이제 어디서 막혔는지 말할 수 있어요.”</p><p>집에서 보인 변화와 공부할 때 느낀 변화를 함께 살펴보세요.</p><small>미리보기용 가상 후기</small>\n<div class=\"sh-review-group\"><div class=\"sh-review-head\"><h3>학부모가 본 변화</h3><div><button type=\"button\" data-review=\"-1\" aria-label=\"학부모가 본 변화 이전\">←</button> <button type=\"button\" data-review=\"1\" aria-label=\"학부모가 본 변화 다음\">→</button></div></div><ul class=\"sh-review-track\" tabindex=\"0\" aria-label=\"학부모가 본 변화 예시 5건\"><li><h4>서울시 · 초4 · 학부모 · 수학</h4><p><b>Before · 수업 전</b><br>문장제만 나오면 어디서 시작할지 몰라 했어요.<br>숫자만 보고 식을 쓰는 일이 잦았어요.</p><p><b>After · 수업 후</b><br>선생님이 구하는 것부터 밑줄 긋게 해주셨어요.<br>이제는 문제 조건을 자기 말로 설명해요.<br>제가 옆에서 식을 알려주지 않아도 첫 줄은 혼자 써요.</p></li><li><h4>부산시 · 중2 · 학부모 · 영어</h4><p><b>Before · 수업 전</b><br>단어는 외우는데 긴 문장은 읽기 싫어했어요.<br>모르는 단어가 나오면 해석을 멈췄어요.</p><p><b>After · 수업 후</b><br>선생님이 주어와 동사부터 찾도록 도와주셨어요.<br>이제 긴 문장도 짧게 나눠 읽어요.<br>복습할 때도 구조를 먼저 표시하더라고요.</p></li><li><h4>인천시 · 초6 · 학부모 · 학습관리</h4><p><b>Before · 수업 전</b><br>수업 없는 날엔 숙제를 자꾸 미뤘어요.<br>제가 먼저 말해야 책을 펴곤 했어요.</p><p><b>After · 수업 후</b><br>자습 전에 할 일을 두 가지로 정해주셨어요.<br>이제는 온라인 독서실에 들어가 먼저 시작해요.<br>요즘은 제가 묻기 전에 먼저 오늘 할 일을 다 끝냈다고 알려줘요.</p></li><li><h4>대전시 · 고1 · 학부모 · 국어</h4><p><b>Before · 수업 전</b><br>긴 글은 끝까지 읽어도 내용을 설명하기 어려워했어요.<br>핵심과 예시를 구분하지 못했어요.</p><p><b>After · 수업 후</b><br>문단마다 핵심을 한 문장으로 적게 해주셨어요.<br>요즘은 글의 흐름을 짚어가며 읽어요.<br>다른 과목 문제에서도 조건을 다시 살펴봐요.</p></li><li><h4>수원시 · 중1 · 학부모 · 과학</h4><p><b>Before · 수업 전</b><br>개념을 외워도 실험 문제에서 막혔어요.<br>표에 나온 숫자가 무엇을 뜻하는지 몰랐어요.</p><p><b>After · 수업 후</b><br>선생님이 바꾼 조건과 결과를 나눠 보게 했어요.<br>이제는 표에서 비교할 항목부터 찾아요.<br>결과가 왜 달라졌는지도 말해줘요.</p></li></ul></div>\n<div class=\"sh-review-group\"><div class=\"sh-review-head\"><h3>학생이 느낀 변화</h3><div><button type=\"button\" data-review=\"-1\" aria-label=\"학생이 느낀 변화 이전\">←</button> <button type=\"button\" data-review=\"1\" aria-label=\"학생이 느낀 변화 다음\">→</button></div></div><ul class=\"sh-review-track\" tabindex=\"0\" aria-label=\"학생이 느낀 변화 예시 5건\"><li><h4>대구시 · 고2 · 학생 · 수학</h4><p><b>Before · 수업 전</b><br>기본 문제는 풀어도 심화 문제에서 자꾸 틀렸어요.<br>해설을 보고 나면 안다고 생각했어요.</p><p><b>After · 수업 후</b><br>선생님과 풀이가 어긋난 지점을 표시했어요.<br>이제 조건을 바꾼 문제를 다시 풀어봐요.<br>예전엔 그냥 모르겠다고 했는데, 이제는 여기서 이 조건을 왜 쓰는지 물어봐요.</p></li><li><h4>광주시 · 중3 · 학생 · 사회</h4><p><b>Before · 수업 전</b><br>개념은 외웠는데 그래프 문제는 막막했어요.<br>숫자가 큰 쪽만 보고 답을 골랐어요.</p><p><b>After · 수업 후</b><br>선생님이 축과 단위부터 확인하는 순서를 알려주셨어요.<br>이제는 비교 기준을 적고 문제를 풀어요.<br>답을 고른 이유도 설명할 수 있어요.</p></li><li><h4>성남시 · 고1 · 학생 · 한국사</h4><p><b>Before · 수업 전</b><br>사건 이름은 아는데 순서를 자꾸 헷갈렸어요.<br>연도만 따로 외우다 보니 금방 잊었어요.</p><p><b>After · 수업 후</b><br>선생님이 사건을 원인과 결과로 묶어주셨어요.<br>이제 사료의 단서로 시대를 먼저 찾아요.<br>비슷한 사건도 앞뒤 흐름을 보고 구분해요.</p></li><li><h4>세종시 · 초5 · 학생 · 코딩</h4><p><b>Before · 수업 전</b><br>예제는 따라 했는데 화면이 멈추면 포기했어요.<br>어떤 블록이 문제인지 몰랐어요.</p><p><b>After · 수업 후</b><br>선생님이 한 부분씩 실행해 보자고 하셨어요.<br>이제는 오류가 난 부분을 좁혀서 다시 고쳐요.<br>간단한 게임 규칙도 직접 바꿔봤어요.</p></li><li><h4>울산시 · 중2 · 학생 · 학습관리</h4><p><b>Before · 수업 전</b><br>계획표를 꽉 채워도 끝낸 일이 적었어요.<br>하루 밀리면 그 주 계획을 포기했어요.</p><p><b>After · 수업 후</b><br>선생님이 과제와 복습을 짧게 나눠주셨어요.<br>지금은 못 한 일을 다음 날로 옮겨요.<br>어제 못 했다고 이번 주를 통째로 포기하는 일이 줄었어요.</p></li></ul></div>\n</div>"
  }
};

export function StudyhighHomeSection({ name }: { name: keyof typeof sections }) {
  const section = sections[name];
  function moveReview(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-review]");
    const track = button?.closest(".sh-review-group")?.querySelector("ul");
    const card = track?.firstElementChild;
    if (!button || !track || !card) return;
    track.scrollBy({
      left: Number(button.dataset.review) * (card.getBoundingClientRect().width + 16),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return <section id={"id" in section ? section.id : undefined} className={section.cls}
    onClick={name === "reviews" ? moveReview : undefined}
    dangerouslySetInnerHTML={{ __html: section.h }} />;
}
