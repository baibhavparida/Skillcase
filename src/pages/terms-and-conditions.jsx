import BaseLayout from "../layouts/BaseLayout.jsx";
export default function TermsAndConditions(props) {
  return (
    <>
      <BaseLayout title="Terms and Conditions | Skillcase">
        <main className="redirect-page">
          <p>Opening Skillcase terms and conditions…</p>
          <a href="/terms-and-condition">Continue to terms</a>
        </main>
      </BaseLayout>
    </>
  );
}
export function initPage() {
  window.location.replace("/terms-and-condition");
}
