import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get a profile by its ID
 * @param client Supabase client
 * @param userId Profile ID
 * @returns Profile
 */
export function getProfileById(client: TypedSupabaseClient, userId: string) {
  return client.from("profiles").select("*").eq("id", userId).single();
}
