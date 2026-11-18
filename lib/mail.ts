import nodemailer from 'nodemailer';

const ZOHO_USER = process.env.ZOHO_EMAIL_USER || 'info@devorahwomenfoundation.org';
const ZOHO_PASS = process.env.ZOHO_EMAIL_PASS;
const NOTIFICATION_RECIPIENT = process.env.NOTIFICATION_EMAIL || 'info@devorahwomenfoundation.org';

export function isMailConfigured(): boolean {
  return !!(ZOHO_PASS && ZOHO_PASS.trim().length > 0);
}

export function getMailTransporter() {
  return nodemailer.createTransport({
    host: 'smtppro.zoho.com', // Zoho Professional / Workplace SMTP
    port: 465,
    secure: true, // SSL
    auth: {
      user: ZOHO_USER,
      pass: ZOHO_PASS,
    },
  });
}

export interface ContactMailData {
  fullName: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}

export interface PartnershipMailData {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  partnershipType: string;
  message: string;
}

export async function sendContactNotification(data: ContactMailData) {
  if (!isMailConfigured()) {
    console.warn('[MAIL] ZOHO_EMAIL_PASS not configured in environment variables.');
    return { sent: false, reason: 'unconfigured' };
  }

  const transporter = getMailTransporter();

  const mailOptions = {
    from: `"Devorah Website Contact" <${ZOHO_USER}>`,
    to: NOTIFICATION_RECIPIENT,
    replyTo: `${data.fullName} <${data.email}>`,
    subject: `[Website Contact] ${data.reason} - ${data.fullName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FCFCF7; border: 1px solid #E8DDF0; border-radius: 16px;">
        <div style="border-bottom: 2px solid #642B80; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #3B214F; margin: 0; font-size: 20px;">New Contact Inquiry Received</h2>
          <p style="color: #716A73; margin: 4px 0 0 0; font-size: 13px;">Submitted through devorahwomenfoundation.org contact form</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #242024;">
          <tr>
            <td style="padding: 8px 0; width: 140px; color: #716A73; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px 0; color: #3B214F; font-weight: 600;">${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #642B80; text-decoration: underline;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #3B214F;">${data.phone ? escapeHtml(data.phone) : '<em>Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Reason:</td>
            <td style="padding: 8px 0;"><span style="background-color: #F4ECF7; color: #642B80; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">${escapeHtml(data.reason)}</span></td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-radius: 12px; border: 1px solid #E8DDF0;">
          <strong style="color: #3B214F; display: block; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
          <p style="margin: 0; line-height: 1.6; color: #3B214F; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DDF0; font-size: 11px; color: #A088B0; text-align: center;">
          <p style="margin: 0;">Devorah Women's Leadership & Empowerment Initiative</p>
          <p style="margin: 4px 0 0 0;">You can reply directly to this email to respond to ${escapeHtml(data.fullName)}.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

export async function sendPartnershipNotification(data: PartnershipMailData) {
  if (!isMailConfigured()) {
    console.warn('[MAIL] ZOHO_EMAIL_PASS not configured in environment variables.');
    return { sent: false, reason: 'unconfigured' };
  }

  const transporter = getMailTransporter();

  const mailOptions = {
    from: `"Devorah Partnership Desk" <${ZOHO_USER}>`,
    to: NOTIFICATION_RECIPIENT,
    replyTo: `${data.fullName} <${data.email}>`,
    subject: `[Partnership Inquiry] ${data.organization || data.fullName} - ${data.partnershipType}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FCFCF7; border: 1px solid #E8DDF0; border-radius: 16px;">
        <div style="border-bottom: 2px solid #642B80; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #3B214F; margin: 0; font-size: 20px;">New Institutional Partnership Enquiry</h2>
          <p style="color: #716A73; margin: 4px 0 0 0; font-size: 13px;">Submitted through devorahwomenfoundation.org partnership portal</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #242024;">
          <tr>
            <td style="padding: 8px 0; width: 140px; color: #716A73; font-weight: bold;">Contact Name:</td>
            <td style="padding: 8px 0; color: #3B214F; font-weight: 600;">${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Organization:</td>
            <td style="padding: 8px 0; color: #642B80; font-weight: bold;">${escapeHtml(data.organization)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #642B80; text-decoration: underline;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #3B214F;">${data.phone ? escapeHtml(data.phone) : '<em>Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #716A73; font-weight: bold;">Partnership Type:</td>
            <td style="padding: 8px 0;"><span style="background-color: #F4ECF7; color: #642B80; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">${escapeHtml(data.partnershipType)}</span></td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-radius: 12px; border: 1px solid #E8DDF0;">
          <strong style="color: #3B214F; display: block; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Partnership Proposal / Note:</strong>
          <p style="margin: 0; line-height: 1.6; color: #3B214F; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DDF0; font-size: 11px; color: #A088B0; text-align: center;">
          <p style="margin: 0;">Devorah Women's Leadership & Empowerment Initiative</p>
          <p style="margin: 4px 0 0 0;">You can reply directly to this email to respond to ${escapeHtml(data.fullName)} (${escapeHtml(data.organization)}).</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

