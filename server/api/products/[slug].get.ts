import { db, products } from '#db'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const [product] = await db.select().from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
  if (!product) throw createError({ statusCode: 404 })

  // Housings are sold as a standard/gauge pair. Hand the page both slugs so it can offer the
  // switch — but only once the sibling row is confirmed present and active, because the pairing
  // is a slug convention, not a foreign key. A renamed slug drops the toggle instead of linking
  // to a 404.
  const sibling = siblingSlug(product.slug, product.category)
  let variantGroup: { key: 'standard' | 'gauge'; slug: string }[] | null = null

  if (sibling) {
    const [siblingRow] = await db.select({ slug: products.slug }).from(products)
      .where(and(eq(products.slug, sibling), eq(products.isActive, true)))

    if (siblingRow) {
      const gauge = isGauge(product.category)
      variantGroup = [
        { key: 'standard', slug: gauge ? siblingRow.slug : product.slug },
        { key: 'gauge', slug: gauge ? product.slug : siblingRow.slug },
      ]
    }
  }

  return { ...product, variantGroup }
})
