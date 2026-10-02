/**
 * Shared in-memory session store.
 * Kept in lib/ so it can be imported by multiple API routes
 * without violating Next.js route-file export constraints.
 */
export const activeSessions = new Map<string, { createdAt: number; expiresAt: number }>();
