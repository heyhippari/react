import { TypedSupabaseClient } from "@/utils/types";

/**
 * Get the number of roles by age
 * @param client The Supabase client
 * @returns The number of roles by age
 */
export function getRolesByAge(client: TypedSupabaseClient) {
  return client
    .from("roles_by_age")
    .select(
      `
      age,
      count
    `,
    )
    .throwOnError();
}
