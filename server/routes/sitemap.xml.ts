import { db, products } from '#db'
import { eq } from 'drizzle-orm'

const LOCALES = ['tr', 'en']

const STATIC_PAGES = [
  { path: '',           changefreq: 'weekly',  priority: '1.0' },
  { path: '/urunler',   changefreq: 'weekly',  priority: '0.9' },
  { path: '/kurumsal',  changefreq: 'monthly', priority: '0.6' },
  { path: '/iletisim',  changefreq: 'monthly', priority: '0.6' },
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://eurofil.com.tr').replace(/\/$/, '')

  const activeProducts = await db.select({
    slug:      products.slug,
    updatedAt: products.updatedAt,
  }).from(products).where(eq(products.isActive, true))

  const entries = [
    ...STATIC_PAGES,
    ...activeProducts.map(p => ({
      path:        `/urunler/${p.slug}`,
      lastmod:     p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
      changefreq:  'weekly',
      priority:    '0.8',
    })),
  ]

  const urlBlocks = entries.flatMap((entry) =>
    LOCALES.map((locale) => {
      const loc = `${siteUrl}/${locale}${entry.path}`
      const alternates = LOCALES
        .map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(`${siteUrl}/${l}${entry.path}`)}" />`)
        .join('\n')
      const lastmodTag = 'lastmod' in entry && entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates}
${lastmodTag}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    })
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks.join('\n')}
</urlset>
`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return xml
})
