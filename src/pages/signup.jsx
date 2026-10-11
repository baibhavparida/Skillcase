import BaseLayout from "../layouts/BaseLayout.jsx";
import CandidateSignup from "../components/CandidateSignup";
export default function Signup(props) {
  return (
    <>
      <BaseLayout
        title="Skillcase | Get started"
        description="Answer a few quick questions and see what the Skillcase app has ready for your German level, from guided lessons and exam practice to job screening."
      >
        <CandidateSignup />
      </BaseLayout>
    </>
  );
}
