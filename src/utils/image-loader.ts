import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');

  const origin = process.env.VERCEL_URL ? '' : 'https://kanojodb.com';

  return `${origin}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
