import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
      from: 'CasaWood <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #5D4E37; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">CasaWood</h1>
            <p style="color: #d4c4b0; margin: 5px 0 0;">New Contact Form Submission</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0;">
            <h2 style="color: #5D4E37; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Subject:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${subject}</td>
              </tr>
            </table>
            <h3 style="color: #5D4E37; margin-top: 25px;">Message</h3>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; color: #333;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
            <p>This email was sent from the CasaWood website contact form.</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend contact error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
