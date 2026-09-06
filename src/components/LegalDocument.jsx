import { formatInline } from "../utils/text";
export default function LegalDocument(props) {
  const { page } = props;
  const blocks = page.blocks.slice(1);
  const sections = blocks
    .map((block, index) => ({ ...block, id: `legal-section-${index}` }))
    .filter((block) => /^h[1-4]$/.test(block.type));
  return (
    <>
      <main className="page-main legal-page">
        <section className="page-hero legal-hero page-hero-rich">
          <div className="page-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>
              The original Skillcase policy content has been preserved and
              formatted into a cleaner, easier-to-scan document.
            </p>
          </div>
          <div
            className="legal-command-card"
            aria-label="Skillcase policy overview"
          >
            <div className="legal-command-top">
              <span data-icon="shield-check" data-size="20"></span>
              <strong>Policy console</strong>
            </div>
            <div className="legal-command-grid">
              <span>
                <span data-icon="lock-key" data-size="15"></span>Security
              </span>
              <span>
                <span data-icon="database" data-size="15"></span>Data use
              </span>
              <span>
                <span data-icon="user-circle-check" data-size="15"></span>
                Candidate rights
              </span>
              <span>
                <span data-icon="file-check-2" data-size="15"></span>Platform
                terms
              </span>
            </div>
            <p>
              Official Skillcase content, redesigned for easier scanning without
              changing the source copy.
            </p>
          </div>
        </section>

        <section className="section legal-shell">
          <aside className="legal-sidebar" aria-label="Document details">
            <span>Document</span>
            <strong>{page.title}</strong>
            <small>Source: skillcase.in</small>
            <details className="legal-contents">
              <summary>Jump to a section</summary>
              <nav
                aria-label="Policy sections"
                onClick={(event) => {
                  if (
                    event.target.closest("a") &&
                    window.matchMedia("(max-width: 760px)").matches
                  )
                    event.currentTarget.closest("details").open = false;
                }}
              >
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.text.replace(/\*\*/g, "")}
                  </a>
                ))}
              </nav>
            </details>
          </aside>
          <article className="legal-content">
            {blocks.map((block, index) => {
              if (block.type === "h1") {
                return (
                  <h2
                    key={index}
                    id={`legal-section-${index}`}
                    dangerouslySetInnerHTML={{
                      __html: formatInline(block.text),
                    }}
                  />
                );
              }
              if (
                block.type === "h2" ||
                block.type === "h3" ||
                block.type === "h4"
              ) {
                return (
                  <h3
                    key={index}
                    id={`legal-section-${index}`}
                    dangerouslySetInnerHTML={{
                      __html: formatInline(block.text),
                    }}
                  />
                );
              }
              if (block.type === "li") {
                return (
                  <p
                    key={index}
                    className="legal-list-item"
                    dangerouslySetInnerHTML={{
                      __html: formatInline(block.text),
                    }}
                  />
                );
              }
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: formatInline(block.text),
                  }}
                />
              );
            })}
          </article>
        </section>
      </main>
    </>
  );
}
