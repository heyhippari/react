import { TypedSupabaseClient } from '@/utils/types';

export function getLabelById(client: TypedSupabaseClient, labelId: number) {
  return client
    .from('labels')
    .select(
      `
        *,
        movies(*)
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
  labelId: number,
) {
  return client
    .from('movies')
    .select('*', { count: 'exact', head: true })
    .eq('label_id', labelId)
    .throwOnError();
}
