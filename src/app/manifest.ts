import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StudyHigh",
    short_name: "StudyHigh",
    description: "학생의 현재 상황에 맞는 학습 방향과 과외 상담을 제공하는 교육 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8ff",
    theme_color: "#6736c8",
    lang: "ko-KR",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "256x256",
        type: "image/x-icon",
      },
    ],
  };
}
