import emailjs from '@emailjs/browser';

// EmailJS configuration - User needs to set these up
// Go to https://www.emailjs.com/ to create an account and get these values
export const EMAILJS_SERVICE_ID = 'service_casawood'; // Replace with your service ID
export const EMAILJS_CHECKOUT_TEMPLATE_ID = 'template_checkout'; // Replace with your checkout template ID
export const EMAILJS_CONTACT_TEMPLATE_ID = 'template_contact'; // Replace with your contact template ID
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your public key

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

interface CheckoutEmailData {
  to_email: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  postal_code: string;
  order_notes: string;
  order_items: string;
  subtotal: string;
  shipping: string;
  total: string;
}

interface ContactEmailData {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendCheckoutEmail = async (data: CheckoutEmailData) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CHECKOUT_TEMPLATE_ID,
      data as unknown as Record<string, unknown>,
      EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
};

export const sendContactEmail = async (data: ContactEmailData) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      data as unknown as Record<string, unknown>,
      EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
};
