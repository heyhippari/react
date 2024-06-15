import { TypedSupabaseClient } from '@/utils/types';

export function getLabelById(
  client: TypedSupabaseClient,
  labelId: string | number,
) {
  return client
    .from('labels')
    .select(
      `
        name,
        original_name,
        movies (
          id,
          name,
          original_name,
          dvd_id,
          movie_images (
              images (
                uuid,
                type
              )
            )
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
  labelId: string | number,
) {
  return client
    .from('movies')
    .select('id', { count: 'exact', head: true })
    .eq('label_id', labelId)
    .throwOnError();
}
