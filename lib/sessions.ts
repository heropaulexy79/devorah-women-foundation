/**
 * Shared in-memory session store.
 *
 * Uses the Node.js `global` object as the true singleton carrier so the Map
 * survives Next.js hot-module-replacement in development and is shared across
 * all API route modules that import this file.
 *
 * Without this, each route module gets its own Map instance, so a token
 * written by /api/admin/auth is invisible to /api/upload and /api/content.
 */

declare global {
  // eslint-disable-next-line no-var
  var __devorahSessions: Map<string, { createdAt: number; expiresAt: number }> | undefined;
}

if (!global.__devorahSessions) {
  global.__devorahSessions = new Map<string, { createdAt: number; expiresAt: number }>();
}

export const activeSessions = global.__devorahSessions;
