import "../styles/global.css";
import "../styles/mobile.css";

export default function BaseLayout({
  title = "Skillcase | Healthcare Jobs in Germany",
  description = "Skillcase helps Indian healthcare professionals find jobs in Germany with profile guidance, interview preparation, visa documentation, and transparent recruitment support.",
  robots,
  children,
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <link
        rel="stylesheet"
        precedence="default"
        href="/vendor/phosphor/bold/style.css"
      />
      <link
        rel="stylesheet"
        precedence="default"
        href="/vendor/phosphor/fill/style.css"
      />
      {children}
    </>
  );
}
