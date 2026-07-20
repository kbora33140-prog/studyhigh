export const gradeGroups = [
  { name: "초등", slug: "elementary" },
  { name: "중등", slug: "middle" },
  { name: "고등", slug: "high" },
];

export const searchableGradeRoutes = [
  ...gradeGroups,
  { name: "고1", slug: "high-1", group: "high" },
  { name: "고2", slug: "high-2", group: "high" },
  { name: "고3", slug: "high-3", group: "high" },
];

export const gradeOptions = [
  { label: "초등 1학년", value: "elementary-1", group: "elementary" },
  { label: "초등 2학년", value: "elementary-2", group: "elementary" },
  { label: "초등 3학년", value: "elementary-3", group: "elementary" },
  { label: "초등 4학년", value: "elementary-4", group: "elementary" },
  { label: "초등 5학년", value: "elementary-5", group: "elementary" },
  { label: "초등 6학년", value: "elementary-6", group: "elementary" },
  { label: "중등 1학년", value: "middle-1", group: "middle" },
  { label: "중등 2학년", value: "middle-2", group: "middle" },
  { label: "중등 3학년", value: "middle-3", group: "middle" },
  { label: "고등 1학년", value: "high-1", group: "high" },
  { label: "고등 2학년", value: "high-2", group: "high" },
  { label: "고등 3학년", value: "high-3", group: "high" },
  { label: "N수생", value: "n-student", group: "high" },
  { label: "성인", value: "adult", group: "high" },
];

export function getGradeGroup(slug: string) {
  return gradeGroups.find((grade) => grade.slug === slug);
}

export function getSearchableGradeRoute(slug: string) {
  return searchableGradeRoutes.find((grade) => grade.slug === slug);
}

export function getGradeRouteSlug(value: string) {
  return gradeOptions.find((grade) => grade.value === value)?.group || value || "high";
}
