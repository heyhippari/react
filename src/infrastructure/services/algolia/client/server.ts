"use server";
import "server-only";
import { createFetchRequester } from "@algolia/requester-fetch";
import { algoliasearch } from "algoliasearch";

/**
 * Creates an Algolia client for server-side use, with write access.
 * @returns The Supabase client.
 */
// eslint-disable-next-line @typescript-eslint/require-await -- We need to return a promise here.
export async function createClient() {
  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
    process.env.ALGOLIA_WRITE_KEY ?? "",
    {
      requester: createFetchRequester(),
    },
  );
}
