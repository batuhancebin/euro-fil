import { db } from '#db'
import { products } from '#db'
import { eq, asc } from 'drizzle-orm'

// Card/grid views (homepage, /urunler listing) only need summary fields — the heavier
// jsonb columns (specsTr/En, variants) and long-form desc are only used on the product
// detail page (server/api/products/[slug].get.ts), so they're excluded here to avoid
// shipping the full catalog's spec/variant payload just to render a few product cards.
export default defineEventHandler(async () => {
  return db.select({
    id:         products.id,
    slug:       products.slug,
    nameTr:     products.nameTr,
    nameEn:     products.nameEn,
    category:   products.category,
    images:     products.images,
    price:      products.price,
    priceNote:  products.priceNote,
    seoDescTr:  products.seoDescTr,
    seoDescEn:  products.seoDescEn,
    isFeatured: products.isFeatured,
    sortOrder:  products.sortOrder,
    createdAt:  products.createdAt,
  }).from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.sortOrder), asc(products.createdAt))
})
