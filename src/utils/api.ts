import { MovieWithImagesStudioAndRoles, RoleWithPerson } from '@/queries/types';
import { getFrontCoverUrl, getFullCoverUrl } from './images';

export const omitNulls = (_: string, value: any) =>
  value === null ? undefined : value;

export function getApiMovieObject(movie: MovieWithImagesStudioAndRoles) {
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
