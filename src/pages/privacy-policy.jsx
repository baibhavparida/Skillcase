import LegalDocument from "../components/LegalDocument.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { legalPages } from "../data/legalContent";
import BaseLayout from "../layouts/BaseLayout.jsx";
export default function PrivacyPolicy(props) {
  return (
    <>
      <BaseLayout
        title="Privacy Policy | Skillcase"
        description="Skillcase privacy policy explaining data collection, use, security, storage, and user rights."
      >
        <div className="site-shell">
          <SiteHeader />
          <LegalDocument page={legalPages.privacy} />
          <SiteFooter />
        </div>
      </BaseLayout>
    </>
  );
}
