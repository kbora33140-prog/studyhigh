import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";

export const revalidate = 86400;
const route = {"province":"seoul","district":"jungnang-gu","town":"myeonmok3--dong","school":"myeonmok-high-school-7010077","grade":"high-3","subject":"math"} as const;
export function generateMetadata() { return metadataForNationwideStaticRoute(route); }
export default function Page() { return <NationwideStaticTutoringPage route={route} />; }
