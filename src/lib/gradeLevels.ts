export const gradeGroups = [
  { name: "초등", slug: "elementary" },
  { name: "중등", slug: "middle" },
  { name: "고등", slug: "high" },
];

export const gradeOptions = [
  { label: "초등 1학년", value: "elementary" },
  { label: "초등 2학년", value: "elementary" },
  { label: "초등 3학년", value: "elementary" },
  { label: "초등 4학년", value: "elementary" },
  { label: "초등 5학년", value: "elementary" },
  { label: "초등 6학년", value: "elementary" },
  { label: "중등 1학년", value: "middle" },
  { label: "중등 2학년", value: "middle" },
  { label: "중등 3학년", value: "middle" },
  { label: "고등 1학년", value: "high" },
  { label: "고등 2학년", value: "high" },
  { label: "고등 3학년", value: "high" },
];

export function getGradeGroup(slug: string) {
  return gradeGroups.find((grade) => grade.slug === slug);
}
