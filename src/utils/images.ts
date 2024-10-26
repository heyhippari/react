import { MovieWithImages, PersonWithImage } from "@/queries/types";

/**
 * Get the front cover image of a movie.
 * @param movie The movie to get the front cover image from.
 * @returns The front cover image of the movie.
 */
export function getFrontCover(movie: MovieWithImages): null | string {
  if (!movie?.front_cover_url) {
    return null;
  }

  return movie.front_cover_url;
}

/**
 * Get the full cover image of a movie.
 * @param movie The movie to get the full cover image from.
 * @returns The full cover image of the movie.
 */
export function getFullCover(movie: MovieWithImages): null | string {
  if (!movie?.full_cover_url) {
    return null;
  }

  return movie.full_cover_url;
}

/**
 * Get the profile image of a person.
 * @param person The person to get the profile image from.
 * @returns The profile image of the person.
 */
export function getProfile(person: PersonWithImage): null | string {
  if (!person?.profile_url) {
    return null;
  }

  return person.profile_url;
}

/**
 * Get the URL of the front cover image of a movie.
 * @param movie The movie to get the front cover image URL from.
 * @param variant The variant of the image URL, defaults to 'public'.
 * @returns The URL of the front cover image of the movie.
 */
export function getFrontCoverUrl(
  movie: MovieWithImages,
  variant = "public",
): null | string {
  const uuid = getFrontCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}

/**
 * Get the URL of the full cover image of a movie.
 * @param movie The movie to get the full cover image URL from.
 * @param variant The variant of the image URL, defaults to 'public'.
 * @returns The URL of the full cover image of the movie.
 */
export function getFullCoverUrl(
  movie: MovieWithImages,
  variant = "public",
): null | string {
  const uuid = getFullCover(movie);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}

/**
 * Get the URL of the profile image of a person.
 * @param person The person to get the profile image URL from.
 * @param variant The variant of the image URL, defaults to 'public'.
 * @returns The URL of the profile image of the person.
 */
export function getProfileUrl(
  person: PersonWithImage,
  variant = "public",
): null | string {
  const uuid = getProfile(person);

  return uuid
    ? `https://kanojodb.com/cdn-cgi/imagedelivery/unbW_XNL55BgTGEc_h7RQA/${uuid}/${variant}`
    : null;
}
