/**
 * System API route to refresh movie popularity via a Vercel serverless function.
 * We don't do this on Supabase becase it's a heavy operation and it need to be
 * batched to avoid timeouts.
 */

import { createSupabaseClient } from "@/infrastructure/database/client";

const BATCH_SIZE = 500;

export const runtime = "edge";

/**
 * Refresh the popularity of all movies in the database, in batches.
 * @returns A response indicating the success or failure of the operation.
 */
export async function GET() {
  console.log("Refreshing movie popularity");

  const supabase = await createSupabaseClient(true);

  const { count, error } = await supabase.from("movies").select("id", {
    count: "exact",
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const batches = Math.ceil((count ?? 0) / BATCH_SIZE);

  console.log(`Found ${count} movies, updating in ${batches} batches`);

  for (let index = 0; index < batches; index++) {
    console.log(`Updating batch ${index + 1} of ${batches}`);

    const { error } = await supabase.rpc("update_movie_popularity", {
      limit_val: BATCH_SIZE,
      offset_val: index * BATCH_SIZE,
    });

    if (error) {
      return new Response(error.message, { status: 500 });
    }
  }

  console.log("Movie popularity refreshed");

  return new Response("Movie popularity refreshed", { status: 200 });
}
