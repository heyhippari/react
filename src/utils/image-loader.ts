import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

/**
 * Load images from Cloudflare.
 * @param props The image loader props.
 * @param props.quality The quality of the image.
 * @param props.src The source of the image.
 * @param props.width The width of the image.
 * @returns The URL of the image.
 */
export default function cloudflareLoader({
  quality,
  src,
  width,
}: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");

  const origin = process.env.VERCEL_URL ? "" : "https://kanojodb.com";

  return `${origin}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
