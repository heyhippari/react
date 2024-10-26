import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get the total number of movies in the database.
 * @param client The Supabase client.
 * @param options Optional parameters.
 * @param options.search The search query.
 * @returns The total number of movies.
 */
export function getMoviePageCount(
  client: TypedSupabaseClient,
  options?: { search?: string },
) {
  let query = client.from("movies").select("id", { count: "exact" });

  if (options?.search) {
    query = query.ilike("dvd_id", `%${options.search}%`);
  }

  return query.throwOnError();
}

/**
 * Get a paginated list of movies.
 * @param client The Supabase client.
 * @param page The page number.
 * @param perPage The number of movies per page.
 * @param options Optional parameters.
 * @param options.orderBy The column to order by.
 * @param options.orderDirection The order direction.
 * @param options.search The search query.
 * @returns The paginated list of movies.
 */
export function getPaginatedMovies(
  client: TypedSupabaseClient,
  page = 1,
  perPage = 25,
  options?: {
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    search?: string;
  },
) {
  let query = client
    .from("movies")
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
    .order(options?.orderBy ?? "create_time", {
      ascending: options?.orderDirection === "asc",
    })
    .range((page - 1) * perPage, page * perPage - 1);

  if (options?.search) {
    query = query.ilike("dvd_id", `%${options.search}%`);
  }

  return query.throwOnError();
}
