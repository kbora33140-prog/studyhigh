import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";

export const revalidate = 86400;
const route = {"province":"seoul","district":"jung-gu","town":"sindang-dong","school":"sungdong-high-school-7010089","grade":"high-1","subject":"korean"} as const;
export function generateMetadata() { return metadataForNationwideStaticRoute(route); }
export default function Page() { return <NationwideStaticTutoringPage route={route} />; }
