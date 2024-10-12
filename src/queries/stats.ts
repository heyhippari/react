import { TypedSupabaseClient } from '@/utils/types';

export function getRolesByAge(client: TypedSupabaseClient) {
  return client
    .from('roles_by_age')
    .select(
      `
      age,
      count
    `,
    )
    .throwOnError();
}
