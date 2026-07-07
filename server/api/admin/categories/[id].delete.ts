import { db, categories } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  try {
    await db.delete(categories).where(eq(categories.id, id))
  } catch (err: any) {
    // Postgres FK violation — this category still has products referencing it.
    if (err?.code === '23503') {
      throw createError({ statusCode: 409, statusMessage: 'Bu kategoriye bağlı ürünler var. Önce ürünleri başka bir kategoriye taşıyın veya silin.' })
    }
    throw err
  }
  return { ok: true }
})
