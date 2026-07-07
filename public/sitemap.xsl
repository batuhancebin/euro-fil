<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
<title>Sitemap — Euro Fil</title>
<meta charset="utf-8" />
<meta name="robots" content="noindex" />
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #18181b; color: #e4e4e7; margin: 0; padding: 40px 24px; }
  .wrap { max-width: 1100px; margin: 0 auto; }
  h1 { color: #fff; font-size: 22px; margin: 0 0 4px; }
  .count { color: #71717a; font-size: 13px; margin: 0 0 24px; }
  table { width: 100%; border-collapse: collapse; background: #1f1f23; border: 1px solid #3f3f46; border-radius: 12px; overflow: hidden; }
  th { text-align: left; padding: 12px 14px; background: #27272a; color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  td { padding: 10px 14px; border-top: 1px solid #27272a; font-size: 13px; color: #d4d4d8; vertical-align: top; }
  tr:hover td { background: #232327; }
  a { color: #4d7bff; text-decoration: none; word-break: break-all; }
  a:hover { text-decoration: underline; }
  .muted { color: #71717a; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #2254f4; color: #fff; font-size: 11px; margin-left: 6px; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Euro Fil — Sitemap</h1>
  <p class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> URL — arama motorları için otomatik oluşturulur</p>
  <table>
    <tr>
      <th>URL</th>
      <th>Son Güncelleme</th>
      <th>Sıklık</th>
      <th>Öncelik</th>
    </tr>
    <xsl:for-each select="sitemap:urlset/sitemap:url">
      <tr>
        <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
        <td class="muted"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)" /></td>
        <td class="muted"><xsl:value-of select="sitemap:changefreq" /></td>
        <td class="muted"><xsl:value-of select="sitemap:priority" /></td>
      </tr>
    </xsl:for-each>
  </table>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
