import { TypedSupabaseClient } from '@/utils/types';

export function getPersonById(
  client: TypedSupabaseClient,
  personId: string | number,
) {
  return client
    .from('persons')
    .select(
      `
        id,
        name,
        original_name,
        birth_date,
        profile_url,
        aliases: persons_aliases (
          name,
          original_name
        ),
        roles (
          id,
          movies (
            id,
            name,
            original_name,
            release_date,
            dvd_id,
            front_cover_url
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
  personId: string | number,
) {
  return client
    .from('roles')
    .select('id', { count: 'exact', head: true })
    .eq('person_id', personId)
    .throwOnError();
}
