import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CasaWood</title>
        <meta
          name="description"
          content="Read the CasaWood privacy policy to learn how we collect, use and protect your information."
        />
      </Helmet>
      <div className="min-h-screen bg-[#FFFDF7] px-4 py-12 flex justify-center">
        <div className="max-w-4xl w-full text-[#262626] text-base md:text-lg leading-relaxed">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Privacy policy</h1>
          <h1>Privacy policy</h1>

          <p>
            CasaWood ("we", "us", "our") respects your privacy and is committed to protecting the personal
            information you share with us when you browse our website, create an account, or place an order.
          </p>

          <h2 className="mt-8 text-xl font-semibold">1. Information we collect</h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul>
            <li>Account details such as your name, email address and password.</li>
            <li>Contact details such as billing and shipping addresses and phone number.</li>
            <li>
              Order information including products purchased, payment status and transaction details (payment
              details are processed securely by our payment partners and are not stored in full on our servers).
            </li>
            <li>
              Usage information such as pages visited, time on site and interactions with our content, collected via
              cookies and similar technologies.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">2. How we use your information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and deliver your orders and provide customer support.</li>
            <li>Manage your CasaWood account, wishlist and order history.</li>
            <li>Improve our website, products and services based on how visitors use the site.</li>
            <li>
              Send service emails about your orders and, if you choose, marketing updates about new collections and
              offers.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">3. Cookies and tracking</h2>
          <p>
            We use cookies and similar technologies to remember your preferences, keep you signed in, and understand
            how visitors use CasaWood. You can control cookies through your browser settings, but some features of the
            site may not function properly if cookies are disabled.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Sharing of information</h2>
          <p>
            We may share your information with trusted third parties who help us operate our website, process
            payments, deliver orders, or provide analytics. These partners are only allowed to use your information as
            needed to perform these services for CasaWood and must protect it appropriately.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Data security</h2>
          <p>
            We take reasonable technical and organizational measures to safeguard your personal information. However,
            no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of the personal information we hold about you,
            subject to applicable law. To make a request or ask a question about this Privacy Policy, please contact us
            using the details provided on our Contact page.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
            updated revision date. Your continued use of CasaWood after changes are posted constitutes your acceptance
            of the updated policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

