import { TypedSupabaseClient } from '@/utils/types';

export function getMoviePageCount(client: TypedSupabaseClient) {
  return client.from('movies').select('id', { count: 'exact' });
}

export function getPaginatedMovies(
  client: TypedSupabaseClient,
  page = 1,
  perPage = 25,
) {
  console.info('rangeStart', (page - 1) * perPage);
  console.info('rangeEnd', page * perPage - 1);

  return client
    .from('movies')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      release_date,
      movie_images (
        image: images (
          uuid,
          type
        )
      )
    `,
    )
    .range((page - 1) * perPage, page * perPage - 1)
    .order('create_time', { ascending: false })
    .throwOnError();
}
