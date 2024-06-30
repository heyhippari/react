import { MovieImage, MovieWithImages } from '@/queries/types';
import { ImageUploadUrl } from './types';

type DirectUploadResponse = {
  result: {
    id: string;
    uploadUrl: string;
  };
  errors: Array<{
    code: string;
    message: string;
  }>;
  messages: Array<{
    code: number;
    message: string;
  }>;
  success: boolean;
};

export function getFrontCover(movie: MovieWithImages): string | null {
  if (!movie?.movie_images) {
    return null;
  }

  return (
    movie.movie_images?.find((movie_image: MovieImage) => {
      return movie_image.image?.type === 'front_cover';
    })?.image?.uuid ?? null
  );
}

export function getFullCover(movie: MovieWithImages): string | null {
  if (!movie?.movie_images) {
    return null;
  }

  return (
    movie.movie_images?.find((movie_image: MovieImage) => {
      return movie_image.image?.type === 'full_cover';
    })?.image?.uuid ?? null
  );
}

export function getProfile(person: any): string | null {
  if (!person?.person_images) {
    return null;
  }

  return (
    person.person_images?.find((person_image: any) => {
      return person_image.image?.type === 'profile';
    })?.image?.uuid ?? null
  );
}

export function getFrontCoverUrl(movie: MovieWithImages): string | null {
  const uuid = getFrontCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/public`
    : null;
}

export function getFullCoverUrl(movie: MovieWithImages): string | null {
  const uuid = getFullCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/public`
    : null;
}

export function getProfileUrl(person: any): string | null {
  const uuid = getProfile(person);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/public`
    : null;
}

// Returns a Cloudflare Images upload URL by calling the Cloudflare direct upload API.
// This function is only available on the server.
export async function getImageUploadUrl(): Promise<ImageUploadUrl> {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`);

  // Call the Cloudflare direct upload API
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to contact Cloudflare API');
  }

  // Convert the response to JSON
  const json: DirectUploadResponse = await response.json();

  // Check if the response is successful
  if (!json.success) {
    throw new Error('Failed to get image upload URL');
  }

  return {
    id: json.result.id,
    uploadUrl: json.result.uploadUrl,
  };
}
