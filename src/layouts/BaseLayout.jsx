import "../styles/global.css";
import "../styles/mobile.css";

// The site's typeface is Poppins. The homepage variant pages use Manrope
// (font="manrope"); their stylesheet switches --font-sans to match.
const fontStylesheets = {
  poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  manrope: "https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&display=swap",
};

export default function BaseLayout({
  title = "Skillcase | Healthcare Jobs in Germany",
  description = "Skillcase helps Indian healthcare professionals find jobs in Germany with profile guidance, interview preparation, visa documentation, and transparent recruitment support.",
  robots,
  font = "poppins",
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
      <link href={fontStylesheets[font]} rel="stylesheet" precedence="default" />
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
