import { S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

export function isR2Configured(): boolean {
  return !!(
    accountId &&
    accessKeyId &&
    secretAccessKey &&
    process.env.CLOUDFLARE_R2_BUCKET_NAME
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

export const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || '';
export const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || '';

