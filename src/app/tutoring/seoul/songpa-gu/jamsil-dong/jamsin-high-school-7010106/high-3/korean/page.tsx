import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";

export const revalidate = 86400;
const route = {"province":"seoul","district":"songpa-gu","town":"jamsil-dong","school":"jamsin-high-school-7010106","grade":"high-3","subject":"korean"} as const;
export function generateMetadata() { return metadataForNationwideStaticRoute(route); }
export default function Page() { return <NationwideStaticTutoringPage route={route} />; }
