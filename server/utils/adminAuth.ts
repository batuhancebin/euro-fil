import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const session = await getUserSession(event)
  if (!session?.user?.admin) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
