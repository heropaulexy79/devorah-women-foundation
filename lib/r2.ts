import { S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim();

export function isR2Configured(): boolean {
  return !!(
    accountId &&
    accessKeyId &&
    secretAccessKey
  );
}

// Cloudflare R2 is an S3-compatible API:
// Endpoint format: https://<account_id>.r2.cloudflarestorage.com
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
});

export const R2_BUCKET_NAME =
  process.env.CLOUDFLARE_R2_BUCKET_NAME?.trim() || 'devorah-media';
export const R2_PUBLIC_URL =
  process.env.CLOUDFLARE_R2_PUBLIC_URL?.trim() ||
  'https://pub-f377fcca5af74b0aba10a5c94a73ac6a.r2.dev';


