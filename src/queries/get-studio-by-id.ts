import { TypedSupabaseClient } from '@/utils/types';

export function getStudioById(
  client: TypedSupabaseClient,
  studioId: string | number,
) {
  return client
    .from('studios')
    .select(
      `
        name,
        original_name,
        homepage,
        movies (
          id,
          name,
          original_name,
          release_date,
          dvd_id,
          movie_images (
              image: images (
                uuid,
                type
              )
            )
        )
      `,
    )
    .eq('id', studioId)
    .order('release_date', {
      ascending: false,
      foreignTable: 'movies',
    })
    .throwOnError()
    .single();
}

export function getStudioMoviesCount(
  client: TypedSupabaseClient,
  studioId: string | number,
) {
  return client
    .from('movies')
    .select('id', { count: 'exact', head: true })
    .eq('studio_id', studioId)
    .throwOnError();
}
