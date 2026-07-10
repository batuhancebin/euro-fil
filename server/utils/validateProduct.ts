// Returns a Turkish error message if the admin product form payload is malformed, or null if OK.
// Guards against the jsonb columns (images/specsTr/En/Ar/Ru/variants) being written with the
// wrong shape and required text columns being silently set to empty strings.
export function validateProductBody(body: any): string | null {
  if (!body || typeof body !== 'object') return 'Geçersiz veri'
  if (typeof body.slug !== 'string' || !body.slug.trim()) return 'Slug zorunludur'
  if (typeof body.nameTr !== 'string' || !body.nameTr.trim()) return 'Türkçe ürün adı zorunludur'
  if (typeof body.category !== 'string' || !body.category.trim()) return 'Kategori zorunludur'

  for (const field of ['images', 'specsTr', 'specsEn', 'specsAr', 'specsRu'] as const) {
    if (body[field] === undefined || body[field] === null) continue
    if (!Array.isArray(body[field]) || !body[field].every((v: unknown) => typeof v === 'string')) {
      return `${field} sadece metinlerden oluşan bir dizi olmalıdır`
    }
  }

  if (body.variants !== undefined && body.variants !== null) {
    const isValidVariant = (v: any) =>
      v && typeof v === 'object' &&
      typeof v.code === 'string' && typeof v.cins === 'string' && typeof v.connection === 'string'
    if (!Array.isArray(body.variants) || !body.variants.every(isValidVariant)) {
      return 'variants içindeki her öğe code/cins/connection alanlarını (metin) içermelidir'
    }
  }

  if (body.price !== undefined && body.price !== null && typeof body.price !== 'string') {
    return 'price bir metin olmalıdır'
  }
  if (body.isFeatured !== undefined && typeof body.isFeatured !== 'boolean') {
    return 'isFeatured boolean olmalıdır'
  }
  if (body.isActive !== undefined && typeof body.isActive !== 'boolean') {
    return 'isActive boolean olmalıdır'
  }
  if (body.sortOrder !== undefined && body.sortOrder !== null && typeof body.sortOrder !== 'number') {
    return 'sortOrder bir sayı olmalıdır'
  }

  return null
}
