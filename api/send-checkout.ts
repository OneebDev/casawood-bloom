import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    fullName,
    email,
    phone,
    address,
    city,
    state,
    postalCode,
    notes,
    orderItems,
    subtotal,
    shipping,
    total,
  } = req.body || {};

  if (!fullName || !email || !phone || !address || !city || !state || !postalCode || !orderItems || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const toEmail = 'oneeb593@gmail.com';

    await resend.emails.send({
      from: 'CasaWood <no-reply@your-domain.com>', // replace with a verified domain/sender in Resend
      to: toEmail,
      reply_to: email,
      subject: `New order from ${fullName}`,
      text:
        `New order from ${fullName} (${email})\n` +
        `Phone: ${phone}\n` +
        `Address: ${address}, ${city}, ${state} - ${postalCode}\n\n` +
        `Notes: ${notes || 'No special notes'}\n\n` +
        `Items:\n${orderItems}\n\n` +
        `Subtotal: ${subtotal}\nShipping: ${shipping}\nTotal: ${total}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend checkout error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
