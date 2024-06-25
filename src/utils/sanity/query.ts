import { groq } from 'next-sanity';
import { client } from './lib/client';

export async function getChangelogs() {
  return client.fetch(
    groq`
            *[_type == "changelog"] | order(date desc) {
            _id,
            date,
            changes
            }
        `,
  );
}
