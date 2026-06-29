import { db, contactRequests } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  await db.delete(contactRequests).where(eq(contactRequests.id, id))
  return { ok: true }
})
