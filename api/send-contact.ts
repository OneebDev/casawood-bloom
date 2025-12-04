import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const toEmail = 'oneeb593@gmail.com';

    await resend.emails.send({
      from: 'CasaWood <no-reply@your-domain.com>', // replace with a verified domain/sender in Resend
      to: toEmail,
      replyTo: email,
      subject: `New contact message: ${subject}`,
      text: `New contact message from ${name} (${email})\n\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend contact error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
