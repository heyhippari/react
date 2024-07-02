const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  //return `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${src}/public`;
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');

  const origin = process.env.VERCEL_URL ? '' : 'https://kanojodb.com';

  return `${origin}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
