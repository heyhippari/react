import { supabaseWebhookPayloadSchema } from "@/infrastructure/database/models/webhook";
import { getMovieById } from "@/infrastructure/database/repositories/movie.repository";
import { createAlgoliaClient } from "@/infrastructure/services/algolia/client";
import { ALGOLIA_MOVIES_INDEX } from "@/infrastructure/services/algolia/models/indexes";
import { toAlgoliaMovie } from "@/infrastructure/services/algolia/models/movie.model";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook to sync movies from Supabase to Algolia.
 * @param request - The incoming Next.js request.
 * @param properties - The request properties.
 * @param properties.params - The URL parameters containing the secret.
 * @returns A response indicating the success or failure of the operation.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ secret: string }> },
) {
  const { secret } = await params;

  if (secret !== process.env.WEBHOOK_SECRET) {
    // Return a 404 if the secret is incorrect, no need to provide more information.
    return new Response(null, { status: 404 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- This is untyped JSON data, but we validate it below.
    const payload = await request.json();

    const { old_record, record, schema, table, type } =
      supabaseWebhookPayloadSchema.parse(payload);

    if (table !== "movies" && schema !== "public") {
      return NextResponse.json({
        error: "Unsupported table",
        status: 400,
      });
    }

    console.log("Processing Supabase webhook", type, table, schema);

    const algoliaClient = await createAlgoliaClient();

    switch (type) {
      case "DELETE": {
        // In this case, since we delete through the UI, everything else (Images, roles, etc)
        // should already be handled, so we just need to remove the movie from Algolia.
        if (old_record?.id) {
          // Remove the movie from Algolia.
          const { deletedAt } = await algoliaClient.deleteObject({
            indexName: ALGOLIA_MOVIES_INDEX,
            objectID: old_record.id.toString(),
          });

          console.log("Deleted movie", old_record.id, deletedAt);
        }
        break;
      }
      case "INSERT": {
        if (record?.id) {
          // Get the full record from the database, since we need relationships.
          // We don't use the service here because we want the model and not the DTO.
          const movie = await getMovieById(record.id);

          const algoliaMovie = toAlgoliaMovie(movie);

          // Add the movie to Algolia.
          const { updatedAt } = await algoliaClient.addOrUpdateObject({
            body: {
              // We want to remove the objectID from the body, since it's already passed as a parameter.
              ...algoliaMovie,
              objectID: undefined,
            },
            indexName: ALGOLIA_MOVIES_INDEX,
            objectID: algoliaMovie.objectID,
          });

          console.log("Added movie", record.id, updatedAt);
        }
        break;
      }
      case "UPDATE": {
        if (record?.id) {
          // Get the full record from the database, since we need relationships.
          // We don't use the service here because we want the model and not the DTO.
          const movie = await getMovieById(record.id);

          const algoliaMovie = toAlgoliaMovie(movie);

          // Update the movie in Algolia.
          const { updatedAt } = await algoliaClient.addOrUpdateObject({
            body: {
              // We want to remove the objectID from the body, since it's already passed as a parameter.
              ...algoliaMovie,
              objectID: undefined,
            },
            indexName: ALGOLIA_MOVIES_INDEX,
            objectID: algoliaMovie.objectID,
          });

          console.log("Updated movie", record.id, updatedAt);
        }
        break;
      }
    }

    console.log("Supabase webhook processed successfully");

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error("Webhook processing failed", error);

    return NextResponse.json({
      error: "Webhook processing failed",
      status: 500,
    });
  }
}
