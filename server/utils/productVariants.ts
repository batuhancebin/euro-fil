// The 12 filter housings each exist twice in the catalogue: once plain, once with a pressure
// gauge. They are separate rows because they carry their own photos, copy, specs, SEO fields and
// part-code tables — but a shopper picks the housing first and the gauge second, so only the
// standard row is listed. Its detail page links across to the gauge row.
export const STANDARD_CATEGORY = 'standart-filtre-kabi'
export const GAUGE_CATEGORY = 'manometreli-filtre-kabi'

/** Categories whose products never appear in the public grids (still reachable by URL). */
export const UNLISTED_CATEGORIES = [GAUGE_CATEGORY]

const STANDARD_TOKEN = '-standart-'
const GAUGE_TOKEN = '-manometreli-'

/**
 * The sibling of a housing, by slug convention (`…-standart-…` <-> `…-manometreli-…`).
 *
 * Scoped to the two housing categories on purpose: several spare parts also say "manometreli"
 * (e.g. `eurofil-cift-manometreli-filtre-kafasi`) and must never be paired.
 *
 * Returns null when there is nothing to pair, and callers must treat a slug that resolves to no
 * row as "no variant switcher" — the convention is not enforced by the database, so a renamed
 * slug should quietly drop the toggle rather than link to a 404.
 */
export function siblingSlug(slug: string, category: string): string | null {
  if (category === STANDARD_CATEGORY && slug.includes(STANDARD_TOKEN)) {
    return slug.replace(STANDARD_TOKEN, GAUGE_TOKEN)
  }
  if (category === GAUGE_CATEGORY && slug.includes(GAUGE_TOKEN)) {
    return slug.replace(GAUGE_TOKEN, STANDARD_TOKEN)
  }
  return null
}

export function isGauge(category: string) {
  return category === GAUGE_CATEGORY
}
