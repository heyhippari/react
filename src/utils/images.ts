import { MovieWithImages, PersonWithImage } from '@/queries/types';

export function getFrontCover(movie: MovieWithImages): string | null {
  if (!movie?.front_cover_url) {
    return null;
  }

  return movie.front_cover_url;
}

export function getFullCover(movie: MovieWithImages): string | null {
  if (!movie?.full_cover_url) {
    return null;
  }

  return movie.full_cover_url;
}

export function getProfile(person: PersonWithImage): string | null {
  if (!person?.profile_url) {
    return null;
  }

  return person.profile_url;
}

export function getFrontCoverUrl(
  movie: MovieWithImages,
  variant = 'public',
): string | null {
  const uuid = getFrontCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}

export function getFullCoverUrl(
  movie: MovieWithImages,
  variant = 'public',
): string | null {
  const uuid = getFullCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}

export function getProfileUrl(
  person: PersonWithImage,
  variant = 'public',
): string | null {
  const uuid = getProfile(person);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}
