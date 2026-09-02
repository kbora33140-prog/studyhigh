import aliases from "../../data/config/canonical-tutoring-aliases.json";

export type CanonicalTutoringAlias = (typeof aliases)[number];

const nameMap = new Map(aliases.map((alias) => [alias.sourceName, alias.targetName]));
const pathMap = new Map(aliases.map((alias) => [alias.source, alias.target]));

/**
 * Only normalizes aliases explicitly verified in the regional source data.
 * It intentionally does not remove numeric suffixes with a broad regex.
 */
export function normalizeRegionName(regionName: string) {
  return nameMap.get(regionName) ?? regionName;
}

export function normalizeTutoringPath(pathname: string) {
  return pathMap.get(pathname) ?? pathname;
}

export function isNumericTutoringAlias(pathname: string) {
  return pathMap.has(pathname);
}

export const canonicalTutoringAliases = aliases;
