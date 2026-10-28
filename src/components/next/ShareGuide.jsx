import { useEffect, useState } from "react";
import Icon from "../healthcare/Icon.jsx";

// The end of a guide: share it on WhatsApp (where most of our learners pass
// things on) or copy its link. The page's address is only known in the
// browser, so the WhatsApp text gains the link after hydration.
export default function ShareGuide({ title }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href.split("#")[0]);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bx-share">
      <p>Found this useful? Share it with a friend.</p>
      <div className="bx-share-actions">
        <a
          className="bx-share-btn"
          href={`https://wa.me/?text=${encodeURIComponent(url ? `${title} ${url}` : title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp-logo" size={18} />
          WhatsApp
        </a>
        <button className="bx-share-btn" type="button" onClick={copy}>
          <Icon name={copied ? "check" : "link-simple"} size={16} />
          <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
