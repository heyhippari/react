import { TypedSupabaseClient } from '@/lib/types';

export function getPersonById(client: TypedSupabaseClient, personId: number) {
  return client
    .from('persons')
    .select(
      `
        *,
        roles (
          *,
          movies (
            *
          )
        )
      `,
    )
    .eq('id', personId)
    .order('movies(release_date)', {
      nullsFirst: false,
      referencedTable: 'roles',
      ascending: false,
    })
    .throwOnError()
    .single();
}

export function getPersonRolesCount(
  client: TypedSupabaseClient,
  personId: number,
) {
  return client
    .from('roles')
    .select('*', { count: 'exact', head: true })
    .eq('person_id', personId);
}
