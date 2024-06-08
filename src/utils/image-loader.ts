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
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];

  return `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${src}/public`;
}
