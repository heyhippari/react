/**
 * Repository for the person entity.
 */

import { createSupabaseClient } from "../client";
import { PersonModel, personModelSchema } from "../models/person.model";

/**
 * Get a person by its ID.
 * @param personId The ID of the person to get information on.
 * @returns The validated person model.
 */
export async function getPersonById(
  personId: number | string,
): Promise<PersonModel> {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("persons")
    .select(
      `
        id,
        name,
        original_name,
        birth_date,
        height,
        bust_size,
        waist_size,
        hips_size,
        profile_url,
        aliases: persons_aliases (
          name,
          original_name
        ),
        roles (
          id,
          age,
          movies (
            id,
            name,
            original_name,
            release_date,
            dvd_id,
            format,
            front_cover_url
          )
        ),
        person_images (
          image: images (
            id,
            created_at,
            uuid,
            type,
            uploader: profiles (
              id,
              username,
              avatar_url
            )
          )
        )
      `,
    )
    .eq("id", personId)
    .order("movies(release_date)", {
      ascending: false,
      nullsFirst: false,
      referencedTable: "roles",
    })
    .throwOnError()
    .single();

  return personModelSchema.parse(data);
}

/**
 * Get the count of roles for a person.
 * @param person_id ID of the person to get the roles count for.
 * @returns Amount of roles for the person.
 */
export async function getPersonRolesCount(
  person_id: number | string,
) {
  const client = await createSupabaseClient();

  const { count } = await client
    .from("roles")
    .select("id", { count: "exact", head: true })
    .eq("person_id", person_id)
    .throwOnError();

  return count ?? 0;
}

/**
 * Search for persons by name or original name.
 * Limits the results to 15.
 * @param searchValue - Search query for the person's name or original name.
 * @param limit - The maximum number of persons to return.
 * @returns The persons that match the search value.
 */
export async function searchPersonByName(
  searchValue: string,
  limit = 25,
) {
  const client = await createSupabaseClient();

  const { data } = await client
    .from("persons")
    .select("id, name, original_name, birth_date, profile_url")
    .or(`name.ilike.%${searchValue}%,original_name.ilike.%${searchValue}%`)
    .limit(limit)
    .order("popularity", { ascending: false })
    .throwOnError();

  return data?.map((person) => personModelSchema.parse(person));
}

/**
 * Delete a person by its ID.
 * @param personId The ID of the person to delete.
 * @throws Error if the person does not exist.
 */
export async function deletePerson(personId: number) {
  const client = await createSupabaseClient();

  await client
    .from("persons")
    .delete()
    .eq("id", personId)
    .throwOnError();
}

/**
 * Update a person's information.
 * @param person The person to update.
 * @throws Error if there is an error updating the person.
 */
export async function updatePerson(person: PersonModel) {
  if (!person.id) {
    throw new Error("Person ID is required");
  }

  const client = await createSupabaseClient();

  console.warn("Updating person", person);

  await client
    .from("persons")
    .update(person)
    .eq("id", person.id)
    .throwOnError();
}

/**
 * Create a new image for a person.
 * @param person_id The ID of the person to add the image to.
 * @param image_id The ID of the image to add.
 * @returns The created image.
 */
export async function addPersonImage(
  person_id: number,
  image_id: number,
) {
  const client = await createSupabaseClient();

  await client
    .from("person_images")
    .insert({ image_id, person_id })
    .throwOnError()
    .single();
}

/**
 * Get a paginated list of persons.
 * @param page The page number.
 * @param perPage The number of persons per page.
 * @param options Optional parameters.
 * @param options.orderBy The column to order by.
 * @param options.orderDirection The direction to order by.
 * @param options.search The search query.
 * @returns The paginated list of persons.
 */
export async function getPaginatedPersons(
  page = 1,
  perPage = 25,
  options?: {
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    search?: string;
  },
) {
  const client = await createSupabaseClient();

  let query = client
    .from("persons")
    .select(
      `
      id,
      name,
      original_name,
      birth_date,
      profile_url
    `,
    )
    .order(options?.orderBy ?? "create_time", {
      ascending: options?.orderDirection === "asc",
    })
    .range((page - 1) * perPage, page * perPage - 1);

  if (options?.search) {
    // Should search by name or original name
    query = query.or(
      `name.ilike.%${options.search}%,original_name.ilike.%${options.search}%`,
    );
  }

  const { data } = await query.throwOnError();

  return data?.map((person) => personModelSchema.parse(person));
}

/**
 * Get the total number of pages of persons based on the search query.
 * @param search The query to search for.
 * @param limit The number of persons per page.
 * @returns The total number of persons.
 */
export async function getPersonPageCount(
  search?: string,
  limit = 25,
) {
  const client = await createSupabaseClient();

  let query = client.from("persons").select("id", { count: "exact" });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,original_name.ilike.%${search}%`,
    );
  }

  const { count } = await query.throwOnError();

  return Math.floor((count ?? 0) / limit);
}
