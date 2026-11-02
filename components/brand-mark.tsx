import Image from "next/image";

/** The silver LF monogram. It is light, so always place it on a dark background. */
export function BrandMark({ className = "" }: { className?: string }) {
  return <Image src="/icons/mark.png" alt="" width={234} height={187} className={className} aria-hidden="true" />;
}
