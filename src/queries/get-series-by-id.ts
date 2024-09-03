import { TypedSupabaseClient } from '@/utils/types';

export function getSeriesById(
  client: TypedSupabaseClient,
  seriesId: string | number,
) {
  return client
    .from('series')
    .select(
      `
        name,
        original_name,
        movies (
          id,
          name,
          original_name,
          release_date,
          dvd_id,
          front_cover_url
        )
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
  seriesId: string | number,
) {
  return client
    .from('movies')
    .select('id', { count: 'exact', head: true })
    .eq('series_id', seriesId)
    .throwOnError();
}
