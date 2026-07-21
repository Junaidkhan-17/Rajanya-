import "./ContactUs.css";

import ContactHeroSection from "../../PagesComponents/ContactUsComponents/ContactHeroSection";
import ContactGetInTouchSection from "../../PagesComponents/ContactUsComponents/ContactGetInTouchSection";
import ContactShowroomSection from "../../PagesComponents/ContactUsComponents/ContactShowroomSection";
import ContactFAQSection from "../../PagesComponents/ContactUsComponents/ContactFAQSection";

const ContactUs = () => {
  return (
    <main className="contact-us-page">
      {/* ==========================
          CONTACT HERO SECTION
      ========================== */}

      <ContactHeroSection />

      <section className="contact-main-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <ContactGetInTouchSection />
            </div>

            <div className="col-lg-6">
              <ContactShowroomSection />
            </div>
          </div>
          <ContactFAQSection />
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
