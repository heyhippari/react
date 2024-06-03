import { TypedSupabaseClient } from '@/lib/types';

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
    .select('*')
    .order('release_date', { ascending: false })
    .lte('release_date', new Date().toDateString())
    .limit(25)
    .throwOnError();
}

export function getRecentlyAddedMovies(client: TypedSupabaseClient) {
  return client
    .from('movies')
    .select('*')
    .order('create_time', { ascending: false })
    .limit(100)
    .throwOnError();
}

export function getRecentlyUpdatedMovies(client: TypedSupabaseClient) {
  return client
    .from('movies')
    .select('*')
    .order('update_time', { ascending: false })
    .limit(25)
    .throwOnError();
}
