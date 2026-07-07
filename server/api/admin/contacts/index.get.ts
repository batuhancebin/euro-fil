import { db, contactRequests } from '#db'
import { desc, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 200)
  const offset = Math.max(Number(query.offset) || 0, 0)

  const [items, totalRows] = await Promise.all([
    db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt)).limit(limit).offset(offset),
    db.select({ total: count() }).from(contactRequests),
  ])

  return { items, total: Number(totalRows[0]?.total ?? 0) }
})
