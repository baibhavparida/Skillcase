import BaseLayout from "../layouts/BaseLayout.jsx";
export default function BlogView(props) {
  return (
    <>
      <BaseLayout title="Skillcase Blog">
        <main className="redirect-page">
          <p>Opening the requested Skillcase guide…</p>
          <noscript>
            <a href="/blog">View all Skillcase blogs</a>
          </noscript>
        </main>
      </BaseLayout>
    </>
  );
}
export function initPage() {
  const routes = {
    13: "/blog/nursing-in-germany-guide",
    14: "/blog/nursing-salaries-germany-foreign-professionals",
    15: "/blog/moving-to-germany-as-a-foreign-doctor",
  };
  const id = new URLSearchParams(window.location.search).get("id");
  window.location.replace(routes[id] || "/blog");
}
