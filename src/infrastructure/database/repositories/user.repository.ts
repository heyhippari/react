/**
 * Repository for User entity.
 */

import { Provider } from "@supabase/supabase-js";

import { createSupabaseClient } from "../client";
import { userModelSchema } from "../models/user.model";

/**
 * Get a profile by its ID.
 * @param userId The ID of the profile to get.
 * @returns The profile with the specified ID.
 */
export async function getUserById(userId: string) {
  const client = await createSupabaseClient();

  const { data } = await client.from("profiles").select("*").eq("id", userId)
    .single().throwOnError();

  return userModelSchema.parse(data);
}

/**
 * Refresh the current user session.
 * @returns The refreshed user.
 */
export async function refreshUser() {
  const client = await createSupabaseClient();

  const { data: user } = await client.auth.getUser();

  return user.user;
}

/**
 * Logs in the user using the specified provider.
 * @param provider The provider to use.
 * @returns The data of the logged in user.
 */
export async function loginWithProvider(provider: Provider) {
  const defaultUrl = process.env.VERCEL_URL
    ? `https://kanojodb.com`
    : "http://localhost:3000";
  const client = await createSupabaseClient();

  const { data, error } = await client.auth.signInWithOAuth({
    options: {
      redirectTo: `${defaultUrl}/auth/callback`,
    },
    provider: provider,
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Logs out the current user.
 */
export async function logoutUser() {
  const client = await createSupabaseClient();

  await client.auth.signOut();
}

/**
 * Exchange an OAuth code for a session.
 * @param code The OAuth code to exchange.
 */
export async function exchangeCodeForSession(code: string) {
  const client = await createSupabaseClient();

  const { error } = await client.auth.exchangeCodeForSession(code);

  if (error) {
    throw error;
  }
}
