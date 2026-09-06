import LegalDocument from "../components/LegalDocument.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { legalPages } from "../data/legalContent";
import BaseLayout from "../layouts/BaseLayout.jsx";
export default function TermsAndCondition(props) {
  return (
    <>
      <BaseLayout
        title="Terms and Conditions | Skillcase"
        description="Skillcase terms and conditions for using the Skillcase platform and services."
      >
        <div className="site-shell">
          <SiteHeader />
          <LegalDocument page={legalPages.terms} />
          <SiteFooter />
        </div>
      </BaseLayout>
    </>
  );
}
