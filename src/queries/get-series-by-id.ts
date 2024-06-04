import { TypedSupabaseClient } from '@/utils/types';

export function getSeriesById(client: TypedSupabaseClient, seriesId: number) {
  return client
    .from('series')
    .select(
      `
        *,
        movies(*)
      `,
    )
    .eq('id', seriesId)
    .order('release_date', {
      ascending: false,
      foreignTable: 'movies',
    })
    .throwOnError()
    .single();
}

export function getSeriesMoviesCount(
  client: TypedSupabaseClient,
  seriesId: number,
) {
  return client
    .from('movies')
    .select('*', { count: 'exact', head: true })
    .eq('series_id', seriesId)
    .throwOnError();
}
