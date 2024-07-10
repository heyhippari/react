import Cloudflare from 'cloudflare';
import 'server-only';

export const cloudflare = new Cloudflare({
  apiEmail: process.env.CLOUDFLARE_EMAIL,
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
});
