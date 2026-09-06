import BaseLayout from "../layouts/BaseLayout.jsx";
import CandidateSignup from "../components/CandidateSignup";
export default function Signup(props) {
  return (
    <>
      <BaseLayout
        title="Skillcase | Nurse Signup"
        description="Create your Skillcase nurse profile and get a guided Germany pathway with German learning, job eligibility, and advisor support."
      >
        <CandidateSignup />
      </BaseLayout>
    </>
  );
}
