# StudyHigh 전국 SEO 데이터 스키마

이 디렉터리는 페이지를 생성하지 않는 데이터 계약만 정의한다. 기존 앱 라우트, 기존 URL, sitemap, MASTER 이미지에는 영향을 주지 않는다.

## 파일

- `national-seo-page.schema.json`: 페이지 한 건의 지역·학교·페이지·콘텐츠·SEO·AEO·GEO·이미지·품질 구조
- `national-seo-manifest.schema.json`: 최대 500건 단위의 검증·승인용 페이지 묶음

## ID 규칙

원본 엔티티 ID는 현재 전국 JSON의 행정코드 및 학교코드를 유지한다.

```text
province:{행정코드}
district:{행정코드}
town:{행정코드}
school:{학교코드}
grade:{학년 slug}
subject:{과목 slug}
```

페이지 ID는 URL이 아니라 원본 엔티티 조합으로 만든다.

```text
page:{provinceCode}:{districtCode}:{townCode}:{schoolCode-or-region}:{gradeSlug}:{subjectSlug}:{variantKey}
```

`variantKey`에는 학교, 시험 준비 유형, 학생 고민, 공부법 조합을 식별하는 안정적인 키를 사용한다. 랜덤 값과 생성 시각은 사용하지 않는다.

## URL 규칙

기존 URL은 `legacyCompatibility.mustPreserve=true`로 표시하고 그대로 사용한다. 기존 URL과 canonical은 재작성하지 않는다.

신규 지역 페이지 후보:

```text
/regions/{기존 provinceSlug}/{기존 districtSlug}/{기존 townSlug}/{gradeSlug}/{subjectSlug}
```

신규 학교 페이지 후보는 기존 페이지와 충돌 검사가 끝난 뒤에만 승인한다.

```text
/schools/{schoolSlug}/{gradeSlug}/{subjectSlug}
```

URL 생성 전에 다음 순서로 검사한다.

1. Production 회귀 기준 URL과 충돌하는지 확인
2. 현재 sitemap URL과 충돌하는지 확인
3. manifest 내부 URL 중복 확인
4. 같은 엔티티 조합에 두 canonical이 배정됐는지 확인

## 원본과 생성 결과 분리

페이지 레코드는 원본 내용을 복사해 사실처럼 만들지 않고 `sourceRefs`로 연결한다.

- 지역 원본: `data/regions/*.json`
- 학교 원본: `data/schools/*.json`
- 학교 사실: `data/content/schoolFeatures.json`
- 일반 시험 유형: `data/content/examPatterns.json`
- 학생 고민: `data/content/students.json`
- 학부모 고민: `data/content/parents.json`
- 공부법: `data/content/studyMethods.json`
- FAQ 후보: `data/content/faq.json`
- 생성 결과: 향후 `data/manifests/{province}/{batch}.json`

원본 변경 시 manifest 전체를 자동 덮어쓰지 않는다. 영향받는 `sourceRefs`를 가진 레코드만 재검증 대상으로 표시한다.

## 사실성 규칙

모든 콘텐츠 블록은 다음 중 하나의 `factStatus`를 가진다.

- `verified`: 원본 데이터로 확인됨
- `general-guidance`: 특정 학교 사실이 아닌 일반 학습 안내
- `needs-verification`: 공개 금지, 검토 필요

`examPatterns.json`의 일반 유형은 특정 학교 출제 경향으로 표현하지 않는다. 학교 기출이나 공식 시험 자료가 없으면 "학교별 실제 시험 범위를 확인해 대비한다"와 같은 안전한 문장을 사용한다.

## 중복 및 유사도 규칙

고유 키는 다음 조합이다.

```text
townId + schoolId + gradeId + subjectId + contentVariantId
```

manifest 검증 시 다음 필드는 완전 중복을 허용하지 않는다.

- `id`
- `page.url`
- `page.title`
- `page.description`
- `page.canonical`
- `image.imagePath`
- FAQ 질문

콘텐츠 유사도는 공통 브랜드 문구와 구조화 데이터 값을 제외하고 아래 본문을 합쳐 계산한다.

```text
regionIntro + schoolAnalysis + examCharacteristics + difficultUnits
+ learningConcerns + studyMethod + consultationType + FAQ 질문/답변
```

정규화된 단어 3-gram 또는 문장 shingle의 Jaccard 유사도를 사용한다. 어느 한 쌍이라도 `0.20`을 초과하면 `quality.indexable=false`로 두고 승인 대상에서 제외한다. 지역명이나 학교명만 바꾼 문장은 고유 콘텐츠로 인정하지 않는다.

## 이미지 연결 규칙

MASTER 원본 경로와 해시는 스키마 상수로 고정한다.

```text
/thumbnails/studyhigh-official-template.png
FBD599FE2121CF5EEF8138316B5BF1E44718CFE72A5F83366986C4ADF639F4C6
```

MASTER 파일은 읽기 전용이며 덮어쓰지 않는다. 페이지별 파생 이미지에는 읍면동·학년·과목과 승인된 학교명 또는 학습 주제만 입력한다. 화면 이미지와 `seo.ogImage`는 동일한 `image.imageUrl`을 사용해야 한다.

이미지 경로는 페이지 ID에서 결정적으로 생성하고, 다른 페이지가 같은 경로를 사용하면 중복 오류로 처리한다.

## manifest 운영 규칙

- manifest 한 파일은 최대 500건
- 기본 상태는 `draft`
- 중복·사실성·유사도·이미지 검사를 모두 통과하면 `validated`
- 사용자 승인 후에만 `approved`
- 페이지 렌더링 및 sitemap 대상은 `approved` 또는 `published`만 허용
- 스키마 작성만으로 페이지가 생성되거나 sitemap에 추가되지 않음
