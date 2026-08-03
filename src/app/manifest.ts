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
        src: "/web-app-manifest-192x192.png?v=studyhigh-sh-20260803",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png?v=studyhigh-sh-20260803",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
