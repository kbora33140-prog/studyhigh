import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";

export const revalidate = 86400;
const route = {"province":"seoul","district":"jongno-gu","town":"samcheong-dong","school":"duksung-girls-high-school-7010148","grade":"high-1","subject":"math"} as const;
export function generateMetadata() { return metadataForNationwideStaticRoute(route); }
export default function Page() { return <NationwideStaticTutoringPage route={route} />; }
