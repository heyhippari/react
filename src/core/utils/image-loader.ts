import type { ImageLoaderProps } from "next/image";

const normalizeSource = (source: string) => {
  return source.startsWith("/") ? source.slice(1) : source;
};

/**
 * Load images from Cloudflare.
 * @param properties The image loader properties.
 * @param properties.quality The quality of the image.
 * @param properties.src The source of the image.
 * @param properties.width The width of the image.
 * @returns The URL of the image.
 */
export default function cloudflareLoader({
  quality,
  src,
  width,
}: ImageLoaderProps) {
  const parameters = [`width=${width}`];
  if (quality) {
    parameters.push(`quality=${quality}`);
  }
  const parametersString = parameters.join(",");

  const origin = process.env.VERCEL_URL ? "" : "https://kanojodb.com";

  return `${origin}/cdn-cgi/image/${parametersString}/${normalizeSource(src)}`;
}
