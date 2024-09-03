import { TypedSupabaseClient } from '@/utils/types';

export function getMoviePageCount(
  client: TypedSupabaseClient,
  options?: { search?: string },
) {
  let query = client.from('movies').select('id', { count: 'exact' });

  if (options?.search) {
    query = query.ilike('dvd_id', `%${options.search}%`);
  }

  return query.throwOnError();
}

export function getPaginatedMovies(
  client: TypedSupabaseClient,
  page = 1,
  perPage = 25,
  options?: {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    search?: string;
  },
) {
  let query = client
    .from('movies')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      release_date,
      front_cover_url
    `,
    )
    .order(options?.orderBy ?? 'create_time', {
      ascending: options?.orderDirection === 'asc',
    })
    .range((page - 1) * perPage, page * perPage - 1);

  if (options?.search) {
    query = query.ilike('dvd_id', `%${options.search}%`);
  }

  return query.throwOnError();
}
