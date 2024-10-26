import { TypedSupabaseClient } from '@/utils/types';

export function getLabelById(
  client: TypedSupabaseClient,
  labelId: number | string,
) {
  return client
    .from('labels')
    .select(
      `
        id,
        name,
        original_name,
        movies (
          id,
          name,
          original_name,
          dvd_id,
          front_cover_url
        )
      `,
    )
    .eq('id', labelId)
    .order('release_date', {
      ascending: false,
      foreignTable: 'movies',
    })
    .throwOnError()
    .single();
}

export function getLabelMoviesCount(
  client: TypedSupabaseClient,
  labelId: number | string,
) {
  return client
    .from('movies')
    .select('id', { count: 'exact', head: true })
    .eq('label_id', labelId)
    .throwOnError();
}
