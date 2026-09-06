import images from "../data/responsiveImages.json";

export default function ResponsiveImage({
  src,
  alt,
  loading = "lazy",
  sizes = "(max-width: 760px) calc(100vw - 40px), (max-width: 1040px) 50vw, 600px",
  ...props
}) {
  const image = images[src];
  if (!image)
    return (
      <img src={src} alt={alt} loading={loading} decoding="async" {...props} />
    );
  return (
    <img
      src={image.variants.at(-1).src}
      srcSet={image.variants
        .map((variant) => `${variant.src} ${variant.width}w`)
        .join(", ")}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
