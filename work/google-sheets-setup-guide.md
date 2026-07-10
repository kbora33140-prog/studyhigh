# 스터디하이 무료상담신청 구글시트 연결

구글시트 주소:
https://docs.google.com/spreadsheets/d/1AaGyDbOmdleXppqS_2J9FWSlvPeGPCQCf7hdHF0Bcb4/edit?gid=0#gid=0

## 1. Apps Script 만들기

1. 구글시트를 엽니다.
2. 상단 메뉴에서 `확장 프로그램` > `Apps Script`를 클릭합니다.
3. 기본 코드를 모두 지우고 `work/google-sheets-consultation-apps-script.js` 내용을 붙여넣습니다.
4. 저장합니다.

## 2. 웹 앱으로 배포

1. 우측 상단 `배포` > `새 배포`를 클릭합니다.
2. 유형 선택에서 `웹 앱`을 선택합니다.
3. 실행 권한은 `나`로 선택합니다.
4. 액세스 권한은 `모든 사용자`로 선택합니다.
5. 배포 후 권한 승인을 완료합니다.
6. 생성된 웹 앱 URL을 복사합니다.

## 3. 사이트 환경변수에 넣기

프로젝트 루트에 `.env.local` 파일을 만들고 아래처럼 입력합니다.

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL="복사한 웹 앱 URL"
```

저장 후 개발 서버를 재시작하면 무료상담신청 제출 시 구글시트 `무료상담신청` 탭에 데이터가 추가됩니다.
