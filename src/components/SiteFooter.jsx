export default function SiteFooter(props) {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-brand-panel">
              <a className="brand footer-brand" href="/">
                <img
                  alt="Skillcase"
                  className="brand-logo"
                  src="/assets/images/SKILLCASE_logo_footer.svg"
                />
              </a>
              <p>
                Empowering professionals for global careers. We simplify
                international recruitment through expert guidance, language
                training, and end-to-end relocation support.
              </p>
              <a className="footer-cta" href="/signup/">
                Get started
                <span data-icon="arrow-right" data-size="13"></span>
              </a>
            </div>
            <div className="footer-column">
              <h3>Contact Us</h3>
              <a href="tel:+919731462667">
                <span data-icon="phone-call" data-size="14"></span>
                +91 97314 62667
              </a>
              <a href="mailto:info@skillcase.in">
                <span data-icon="mail" data-size="14"></span>
                info@skillcase.in
              </a>
              <a href="/#top">
                <span data-icon="map-pin" data-size="14"></span>
                Mon - Sat | 10:00 AM - 8:00 PM
              </a>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <a href="/about/">About Us</a>
              <a href="/blog/">Blog</a>
              <a href="/#faq">FAQ</a>
              <a href="/privacy-policy/">Privacy Policy</a>
            </div>
            <div className="footer-column footer-pathways">
              <h3>Skillcase Pathway</h3>
              <span>Language training</span>
              <span>Profile assessment</span>
              <span>Interview preparation</span>
              <span>Visa documentation</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-note">
              © 2026 Skillcase All Rights Reserved.
            </p>
            <div>
              <a href="/terms-and-condition/">Terms &amp; Conditions</a>
              <a href="/privacy-policy/">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
