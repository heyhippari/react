import { MovieWithImagesStudioAndRoles, RoleWithPerson } from '@/queries/types';
import { getFrontCoverUrl, getFullCoverUrl } from './images';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Replacers need to be any
export function omitNulls(this: any, key: string, value: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Replacers need to return any
  return value ?? undefined;
}

export function getApiMovieObject(movie: any) {
  return {
    id: movie.id,
    title: movie.name,
    original_title: movie.original_name,
    dvd_id: movie.dvd_id,
    release_date: movie.release_date,
    runtime: movie.length,
    studio: movie.studio
      ? {
          id: movie.studio.id,
          name: movie.studio.name,
          original_name: movie.studio.original_name,
        }
      : undefined,
    roles: movie.roles.map((role: RoleWithPerson) => ({
      id: role.person?.id,
      name: role.person?.name,
      original_name: role.person?.original_name,
      age: role.age,
      age_string: role.age ? `${role.age} years old` : 'Unknown',
    })),
    thumb_url: getFrontCoverUrl(movie),
    art_url: getFullCoverUrl(movie),
  };
}
