export type LocaleCode = 'tr' | 'en' | 'ar' | 'ru'

const SUFFIX: Record<LocaleCode, string> = { tr: 'Tr', en: 'En', ar: 'Ar', ru: 'Ru' }

// Non-Turkish content is optional per row, so each locale falls back down a chain rather
// than rendering an empty product name. Turkish is the source of truth and always populated.
const CHAIN: Record<LocaleCode, LocaleCode[]> = {
  tr: ['tr'],
  en: ['en', 'tr'],
  ar: ['ar', 'en', 'tr'],
  ru: ['ru', 'en', 'tr'],
}

/**
 * Reads `row[field + 'Ar' | 'En' | 'Tr']` for the active locale, skipping empty strings and empty
 * arrays on the way down the fallback chain.
 */
export function localized<T = string>(row: unknown, field: string, locale: string): T | undefined {
  const record = row as Record<string, unknown> | null | undefined
  if (!record) return undefined
  for (const code of CHAIN[locale as LocaleCode] ?? CHAIN.tr) {
    const value = record[field + SUFFIX[code]]
    if (Array.isArray(value) ? value.length > 0 : Boolean(value)) return value as T
  }
  return undefined
}
