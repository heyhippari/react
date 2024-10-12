import { MovieWithImages, PersonWithImage } from '@/queries/types';
import { TypedSupabaseClient } from '@/utils/types';

export function getMostRecentMovies(client: TypedSupabaseClient) {
  return client
    .from('movies_recently_released')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .limit(25)
    .returns<MovieWithImages[]>()
    .throwOnError();
}

export function getMostPopularPersons(client: TypedSupabaseClient) {
  return client
    .from('most_popular_persons')
    .select(
      `
      id,
      name,
      original_name,
      profile_url
    `,
    )
    .limit(25)
    .returns<PersonWithImage[]>()
    .throwOnError();
}

export function getReleasedOnThisDay(client: TypedSupabaseClient) {
  return client
    .from('movies_released_today')
    .select(
      `
      id,
      name,
      original_name,
      dvd_id,
      front_cover_url
    `,
    )
    .limit(25)
    .returns<MovieWithImages[]>()
    .throwOnError();
}

export function getInformationNeeded(client: TypedSupabaseClient) {
  return client
    .from('movies_missing_info')
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
    .limit(25)
    .returns<MovieWithImages[]>()
    .throwOnError();
}

export function getCurrentCounts(client: TypedSupabaseClient) {
  return client.from('current_counts').select('*').single().throwOnError();
}
