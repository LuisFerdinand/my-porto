import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (position: relative) parent. Local files and Cloudinary go through next/image;
 * any other https URL pasted into the admin is shown as-is because next/image only
 * optimises hosts listed in next.config.ts.
 */
export function SmartImage({ src, alt, sizes, priority, className }: Props) {
  const optimisable = src.startsWith("/") || src.startsWith("https://res.cloudinary.com/");
  if (optimisable) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
