import { useEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { resolveRoute } from "./routes.js";

async function start() {
  const route = await resolveRoute(window.location.pathname);
  const { Page, props } = route;
  let initialized = false;

  function App() {
    useEffect(() => {
      // Initialize the existing page interactions after React has mounted.
      if (initialized) return;
      initialized = true;
      route.initPage?.();
      if (route.sharedScript) {
        const script = document.createElement("script");
        script.src = "/site.js";
        document.body.appendChild(script);
      }
    }, []);
    return <Page {...props} />;
  }

  const container = document.getElementById("root");
  if (container.dataset.prerendered === "true") {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
}

start().catch((error) => {
  console.error("Unable to load Skillcase", error);
  document.getElementById("root").textContent =
    "The page could not load. Please refresh to try again.";
});
