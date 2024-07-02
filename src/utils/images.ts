import { MovieImage, MovieWithImages } from '@/queries/types';

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
