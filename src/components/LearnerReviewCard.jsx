import { SealCheckIcon as SealCheck } from "@phosphor-icons/react/ssr";

function GoogleReviewMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Google"
    >
      <path
        fill="#4285f4"
        d="M21.35 11.1h-9.18v3.8h5.28a4.5 4.5 0 0 1-1.95 2.94v2.44h3.16c1.85-1.7 2.91-4.22 2.91-7.22 0-.68-.06-1.34-.22-1.96Z"
      />
      <path
        fill="#34a853"
        d="M12.17 21.5c2.64 0 4.86-.87 6.49-2.36L15.5 16.7c-.88.59-2 .94-3.33.94-2.55 0-4.7-1.72-5.48-4.03H3.43v2.52a9.79 9.79 0 0 0 8.74 5.37Z"
      />
      <path
        fill="#fbbc05"
        d="M6.69 13.61a5.88 5.88 0 0 1 0-3.77V7.32H3.43a9.8 9.8 0 0 0 0 8.81l3.26-2.52Z"
      />
      <path
        fill="#ea4335"
        d="M12.17 5.81c1.44 0 2.73.49 3.74 1.46l2.81-2.81c-1.7-1.58-3.92-2.54-6.55-2.54a9.79 9.79 0 0 0-8.74 5.4l3.26 2.52c.77-2.31 2.93-4.03 5.48-4.03Z"
      />
    </svg>
  );
}

export default function LearnerReviewCard({
  avatarAlt,
  avatarSrc,
  className = "",
  initials,
  name,
  quote,
  source = "Posted on Google",
  showGoogle = true,
  verifiedLabel = "Verified review",
}) {
  return (
    <figure className={`learner-review ${className}`.trim()}>
      <div className="learner-review-card-top">
        <span
          className="learner-review-stars"
          role="img"
          aria-label="5 out of 5 stars"
        >
          ★★★★★
        </span>
        {showGoogle ? (
          <GoogleReviewMark className="learner-review-google-icon" />
        ) : null}
      </div>
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        {avatarSrc ? (
          <img
            className="learner-review-avatar learner-review-avatar-image"
            src={avatarSrc}
            alt={avatarAlt || `Portrait of ${name}`}
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="learner-review-avatar" aria-hidden="true">
            {initials}
          </span>
        )}
        <span className="learner-review-person">
          <strong>{name}</strong>
          <small>{source}</small>
        </span>
        <span
          className="learner-review-verified"
          role="img"
          aria-label={verifiedLabel}
        >
          <SealCheck size={16} weight="fill" aria-hidden="true" />
        </span>
      </figcaption>
    </figure>
  );
}

export { GoogleReviewMark };
