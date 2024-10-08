import { MovieWithImages } from '@/queries/types';
import { TypedSupabaseClient } from '@/utils/types';

export function getMovieCount(client: TypedSupabaseClient) {
  return client
    .from('movies')
    .select('id', { count: 'exact', head: true })
    .throwOnError();
}

export function getPersonCount(client: TypedSupabaseClient) {
  return client
    .from('persons')
    .select('id', { count: 'exact', head: true })
    .throwOnError();
}

export function getMostRecentMovies(client: TypedSupabaseClient) {
  return client
    .from('movies')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .order('release_date', { ascending: false })
    .lte('release_date', new Date().toDateString())
    .limit(25)
    .throwOnError();
}

export function getReleasedOnThisDay(client: TypedSupabaseClient) {
  return client
    .from('movies_released_today')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .returns<MovieWithImages[]>()
    .throwOnError();
}

export function getInformationNeeded(client: TypedSupabaseClient) {
  return client
    .from('movies_missing_info')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      release_date,
      front_cover_url
    `,
    )
    .limit(25)
    .returns<MovieWithImages[]>()
    .throwOnError();
}
