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

    // Format order items for HTML
    const itemsHtml = orderItems.split('\n').map((item: string) => 
      `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;">${item}</td></tr>`
    ).join('');

    await resend.emails.send({
      from: 'CasaWood <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `New Order from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #5D4E37; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">CasaWood</h1>
            <p style="color: #d4c4b0; margin: 5px 0 0;">New Order Received</p>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0;">
            <h2 style="color: #5D4E37; margin-top: 0;">Customer Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
              </tr>
            </table>

            <h2 style="color: #5D4E37;">Shipping Address</h2>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; color: #333;">
              ${address}<br>
              ${city}, ${state} - ${postalCode}
            </div>

            ${notes ? `
            <h2 style="color: #5D4E37;">Special Notes</h2>
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 20px; color: #856404;">
              ${notes}
            </div>
            ` : ''}

            <h2 style="color: #5D4E37;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${itemsHtml}
            </table>

            <div style="background-color: #5D4E37; padding: 20px; border-radius: 5px; color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0;">Subtotal:</td>
                  <td style="text-align: right;">${subtotal}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">Shipping:</td>
                  <td style="text-align: right;">${shipping}</td>
                </tr>
                <tr style="font-size: 18px; font-weight: bold;">
                  <td style="padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.3);">Total:</td>
                  <td style="text-align: right; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.3);">${total}</td>
                </tr>
              </table>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
            <p>Payment Method: Cash on Delivery</p>
            <p>This order was placed on the CasaWood website.</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend checkout error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
