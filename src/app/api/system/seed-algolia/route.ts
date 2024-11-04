/**
 * System API route to refresh movie popularity via a Vercel serverless function.
 * We don't do this on Supabase becase it's a heavy operation and it need to be
 * batched to avoid timeouts.
 */

import { createSupabaseClient } from "@/infrastructure/database/client";
import { movieModelArraySchema } from "@/infrastructure/database/models/movie.model";
import { createAlgoliaClient } from "@/infrastructure/services/algolia/client";
import { ALGOLIA_MOVIES_INDEX } from "@/infrastructure/services/algolia/models/indexes";
import { toAlgoliaMovie } from "@/infrastructure/services/algolia/models/movie.model";

const BATCH_SIZE = 500;

export const runtime = "edge";

/**
 * Refresh the popularity of all movies in the database, in batches.
 * @returns A response indicating the success or failure of the operation.
 */
export async function GET() {
  console.log("Seeding Algolia");

  const supabase = await createSupabaseClient(true);
  const algolia = await createAlgoliaClient();

  const { count, error } = await supabase.from("movies").select("id", {
    count: "exact",
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const batches = Math.ceil((count ?? 0) / BATCH_SIZE);

  console.log(`Found ${count} movies, seeding in ${batches} batches`);

  for (let index = 0; index < batches; index++) {
    console.log(`Seeding batch ${index + 1} of ${batches}`);

    // Get the next batch of movies.
    const { data, error } = await supabase
      .from("movies")
      .select(`
        id,
        name,
        original_name,
        release_date,
        dvd_id,
        length,
        studio_id,
        series_id,
        label_id,
        barcode,
        format,
        has_nudity,
        front_cover_url,
        full_cover_url,
        roles (
          id,
          age,
          person: persons (
            id,
            name,
            original_name,
            birth_date,
            profile_url
          )
        ),
        studio: studios (
          id,
          name,
          original_name
        ),
        series (
          id,
          name,
          original_name
        ),
        label: labels (
          id,
          name,
          original_name
        ),
        movie_images (
          image: images (
            created_at,
            uuid,
            type,
            uploader: profiles (
              id,
              username,
              avatar_url
            )
          )
        )
      `)
      .range(index * BATCH_SIZE, (index + 1) * BATCH_SIZE - 1);

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    // Process the batch of movies.
    const movieModels = movieModelArraySchema.parse(data);

    await algolia.saveObjects({
      indexName: ALGOLIA_MOVIES_INDEX,
      objects: movieModels.map((movie) => toAlgoliaMovie(movie)),
    });

    console.log(`Seeded batch ${index + 1} of ${batches}`);
  }

  console.log("All batches seeded");

  return new Response("Seeded Algolia", { status: 200 });
}
