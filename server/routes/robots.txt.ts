export default defineEventHandler((event) => {
  const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://eurofilwater.com').replace(/\/$/, '')

  const body = `User-Agent: *
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return body
})
