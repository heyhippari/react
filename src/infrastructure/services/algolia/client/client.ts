import { createFetchRequester } from "@algolia/requester-fetch";
import { type Algoliasearch, algoliasearch } from "algoliasearch";
import { useMemo } from "react";

let client: Algoliasearch | undefined;

/**
 * Creates an Algolia client for browser-side use.
 * @returns The Algolia client.
 */
export function createClient() {
  if (client) {
    return client;
  }

  client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? "",
    {
      requester: createFetchRequester(),
    },
  );

  return client;
}

/**
 * Hook to use a Supabase client in the browser.
 * @returns The Supabase client.
 */
function useAlgoliaBrowser() {
  return useMemo(createClient, []);
}

export default useAlgoliaBrowser;
