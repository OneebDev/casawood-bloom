import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CasaWood</title>
        <meta
          name="description"
          content="Read the CasaWood terms of service covering use of our website and purchases."
        />
      </Helmet>
      <div className="min-h-screen bg-[#FFFDF7] px-4 py-12 flex justify-center">
        <div className="max-w-4xl w-full text-[#262626] text-base md:text-lg leading-relaxed">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Terms of service</h1>

          <p>
            These Terms of Service ("Terms") govern your use of the CasaWood website and services. By accessing or
            using this site you agree to be bound by these Terms, so please read them carefully.
          </p>

          <h2 className="mt-8 text-xl font-semibold">1. Online store terms</h2>
          <p>
            By placing an order with CasaWood you confirm that you are at least the age of majority in your region and
            that all information you provide is true and complete. You agree not to use our products for any unlawful
            purpose or to violate any laws in your jurisdiction.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. General conditions</h2>
          <p>
            We reserve the right to refuse service to anyone for any reason at any time. You understand that your
            content may be transferred unencrypted over various networks (excluding payment information, which is
            always encrypted by our payment partners).
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Accuracy, completeness and timeliness of information</h2>
          <p>
            We try to display product information, prices and availability as accurately as possible, but occasional
            errors may occur. We do not guarantee that all information on the site is always complete, current or
            error-free. We may correct errors or update information without prior notice.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Modifications to the service and prices</h2>
          <p>
            Product prices and availability are subject to change without notice. We may modify or discontinue any part
            of the Service at any time. We will not be liable to you or to any third-party for any modification,
            price change, suspension or discontinuance of the Service.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Products or services</h2>
          <p>
            Certain products or services may be available exclusively online through the CasaWood website. Returns and
            exchanges are handled in accordance with our Returns and Shipping policies.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. User accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Third‑party tools and links</h2>
          <p>
            Our site may provide access to third‑party tools or links to other websites. We are not responsible for the
            content or services provided by third parties and you use them at your own risk.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. The most current version will always be available on this
            page. By continuing to use CasaWood after changes are posted, you agree to the revised Terms.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;

