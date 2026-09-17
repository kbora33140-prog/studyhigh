import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";

export const revalidate = 86400;
const route = {"province":"seoul","district":"yeongdeungpo-gu","town":"yangpyeong--dong","school":"kwanak-high-school-7010065","grade":"high-2","subject":"korean"} as const;
export function generateMetadata() { return metadataForNationwideStaticRoute(route); }
export default function Page() { return <NationwideStaticTutoringPage route={route} />; }
