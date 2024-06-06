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
      thumb_url
    `,
    )
    .order('release_date', { ascending: false })
    .lte('release_date', new Date().toDateString())
    .limit(25)
    .throwOnError();
}

export function getOnThisDay(client: TypedSupabaseClient) {
  return client.from('onthisday').select('*').throwOnError();
}

export function getInformationNeeded(client: TypedSupabaseClient) {
  return client
    .from('movies')
    .select(
      `
      id,
      original_name,
      dvd_id,
      thumb_url,
      release_date
    `,
    )
    .eq('release_date', '0001-01-01')
    .limit(25)
    .throwOnError();
}
