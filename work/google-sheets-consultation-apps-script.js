/* eslint-disable */

const SPREADSHEET_ID = "1AaGyDbOmdleXppqS_2J9FWSlvPeGPCQCf7hdHF0Bcb4";
const SHEET_NAME = "무료상담신청";

const HEADERS = [
  "신청일시",
  "이름",
  "연락처",
  "지역",
  "학교명",
  "학년",
  "희망 과목",
  "수업 방식",
  "요청 수업",
  "상담 내용",
  "유입페이지",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(spreadsheet);
    ensureHeaders_(sheet);

    const params = e.parameter || {};
    const row = HEADERS.map((header) => params[header] || "");
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("스터디하이 무료상담신청 접수 API").setMimeType(
    ContentService.MimeType.TEXT,
  );
}

function getOrCreateSheet_(spreadsheet) {
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => firstRow[index] === header);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}
