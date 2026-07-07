// In-memory brute-force guard for the single-password admin login. Fine for this project's
// single-instance deployment; state resets on redeploy/restart and isn't shared across
// instances, but that's an acceptable trade-off given the scale — no need for Redis here.
const attempts = new Map<string, { count: number; windowStart: number; lockedUntil: number }>()

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

export function isLoginLocked(ip: string): boolean {
  const entry = attempts.get(ip)
  return !!entry && entry.lockedUntil > Date.now()
}

export function recordLoginFailure(ip: string) {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now, lockedUntil: 0 })
    return
  }
  entry.count++
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS
  }
}

export function recordLoginSuccess(ip: string) {
  attempts.delete(ip)
}
