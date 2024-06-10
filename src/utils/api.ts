import { getFrontCoverUrl, getFullCoverUrl } from './images';

export const omitNulls = (_: string, value: any) =>
  value === null ? undefined : value;

export function getApiMovieObject(movie: any) {
  return {
    id: movie.id,
    title: movie.name,
    original_title: movie.original_name,
    dvd_id: movie.dvd_id,
    release_date: movie.release_date,
    runtime: movie.length,
    studio: {
      id: movie.studio_id,
      name: movie.studios.name,
      original_name: movie.studios.original_name,
    },
    roles: movie.roles.map((role: any) => ({
      id: role.persons.id,
      name: role.persons.name,
      original_name: role.persons.original_name,
      birth_date: role.persons.birth_date,
      age: role.age,
      age_string: role.age ? `${role.age} years old` : 'Unknown',
    })),
    thumb_url: getFrontCoverUrl(movie),
    art_url: getFullCoverUrl(movie),
  };
}
