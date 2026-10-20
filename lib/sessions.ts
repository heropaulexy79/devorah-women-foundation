import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Stateless HMAC-signed admin sessions that work reliably across
 * any serverless function / region in Vercel.
 */

const SESSION_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecretKey(): string {
  return process.env.ADMIN_PASSKEY || 'devorah-admin-default-secret-salt-2026';
}

/**
 * Generate a cryptographically signed session token.
 */
export function createSignedSession(): string {
  const payload = {
    auth: true,
    exp: Date.now() + SESSION_EXPIRY_MS,
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', getSecretKey()).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

/**
 * Verify a session token statelessly.
 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;

  // Verify HMAC signature in constant time
  const expectedSig = createHmac('sha256', getSecretKey()).update(payloadStr).digest('base64url');
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSig);

  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const raw = Buffer.from(payloadStr, 'base64url').toString('utf-8');
    const payload = JSON.parse(raw);
    if (!payload.auth || typeof payload.exp !== 'number') return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

// In-memory fallback map for backwards compatibility
declare global {
  // eslint-disable-next-line no-var
  var __devorahSessions: Map<string, { createdAt: number; expiresAt: number }> | undefined;
}

if (!global.__devorahSessions) {
  global.__devorahSessions = new Map<string, { createdAt: number; expiresAt: number }>();
}

export const activeSessions = global.__devorahSessions;
