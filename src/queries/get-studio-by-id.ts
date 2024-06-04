import { TypedSupabaseClient } from '@/utils/types';

export function getStudioById(client: TypedSupabaseClient, studioId: number) {
  return client
    .from('studios')
    .select(
      `
        *,
        movies(*)
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
  studioId: number,
) {
  return client
    .from('movies')
    .select('*', { count: 'exact', head: true })
    .eq('studio_id', studioId)
    .throwOnError();
}
