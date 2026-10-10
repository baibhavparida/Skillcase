import images from "../../data/responsiveImages.json";

const srcSetFor = (src) =>
  images[src]?.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");

// A <picture> that swaps to a differently framed image on phones, so a wide
// desktop composition does not get cropped down to one face on mobile.
export default function ArtDirectedImage({
  src,
  mobileSrc,
  mobileMedia = "(max-width: 760px)",
  alt,
  sizes = "100vw",
  loading = "lazy",
  className,
  ...props
}) {
  const image = images[src];
  return (
    <picture className={className}>
      {mobileSrc && (
        <source media={mobileMedia} srcSet={srcSetFor(mobileSrc) || mobileSrc} sizes="100vw" />
      )}
      <img
        src={image ? image.variants.at(-1).src : src}
        srcSet={srcSetFor(src)}
        sizes={sizes}
        width={image?.width}
        height={image?.height}
        alt={alt}
        loading={loading}
        decoding="async"
        {...props}
      />
    </picture>
  );
}
