"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";

const grades = [
  "초등 1학년",
  "초등 2학년",
  "초등 3학년",
  "초등 4학년",
  "초등 5학년",
  "초등 6학년",
  "중등 1학년",
  "중등 2학년",
  "중등 3학년",
  "고등 1학년",
  "고등 2학년",
  "고등 3학년",
  "검정고시",
];

const subjects = ["국어", "수학", "영어", "사회", "과학", "한국사", "전과목", "기타"];
const classTypes = ["방문과외", "화상과외", "상담 후 결정"];
const goals = ["내신대비", "수행평가", "정시대비", "검정고시", "학습관리", "기타"];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const openModal = () => {
      setIsOpen(true);
      setSubmitState("idle");
      setMessage("");
    };

    window.addEventListener("studyhigh:open-consultation", openModal);

    return () => {
      window.removeEventListener("studyhigh:open-consultation", openModal);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      setSubmitState("error");
      setMessage("Google Apps Script URL이 아직 설정되지 않았습니다.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    if (String(formData.get("website") || "").trim()) {
      return;
    }

    formData.append("신청일시", new Date().toLocaleString("ko-KR"));
    formData.append("유입페이지", window.location.href);

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, String(value));
    });

    setSubmitState("submitting");
    setMessage("");

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      event.currentTarget.reset();
      setSubmitState("success");
      setMessage("상담 신청이 접수되었습니다. 빠르게 연락드리겠습니다.");
    } catch {
      setSubmitState("error");
      setMessage("전송 중 문제가 발생했습니다. 잠시 후 다시 신청해주세요.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/55 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <button
        type="button"
        aria-label="상담 신청 창 닫기"
        className="absolute inset-0 cursor-default"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative max-h-[calc(100vh-32px)] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
              FREE CONSULT
            </p>
            <h2 id="consultation-modal-title" className="mt-3 text-3xl font-black text-black">
              무료 상담 신청
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-black/55">
              학생 상황을 남겨주시면 맞춤 수업 방향을 안내드립니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f7fa] text-black transition hover:bg-black hover:text-white"
            aria-label="닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="학생 이름" name="이름" placeholder="이름을 입력하세요" required />
            <FormInput label="연락처" name="연락처" placeholder="010-0000-0000" required />
            <FormInput label="지역" name="지역" placeholder="예: 대전 서구 둔산동" required />
            <FormInput label="학교명" name="학교명" placeholder="학교명을 입력하세요" />
            <FormSelect label="학년" name="학년" options={grades} required />
            <FormSelect label="희망 과목" name="희망 과목" options={subjects} required />
            <FormSelect label="수업 방식" name="수업 방식" options={classTypes} required />
            <FormSelect label="요청 수업" name="요청 수업" options={goals} required />
          </div>

          <label className="grid gap-2 text-sm font-bold text-black">
            상담 내용
            <textarea
              name="상담 내용"
              rows={5}
              placeholder="학생의 현재 상황, 희망 수업, 고민되는 부분을 적어주세요."
              className="resize-none rounded-2xl bg-[#f7f7fa] px-4 py-3 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
            />
          </label>

          {message ? (
            <p
              className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                submitState === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#2b105f] px-7 text-base font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitState === "submitting" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : submitState === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : null}
            신청하기
          </button>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
      />
    </label>
  );
}

function FormSelect({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black">
      {label}
      <select
        name={name}
        required={required}
        defaultValue=""
        className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
      >
        <option value="" disabled>
          선택하세요
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
