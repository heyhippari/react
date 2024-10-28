"use server";
import {
  fromPersonEditForm,
  PersonEditFormSchema,
} from "@/core/utils/validation/person-update";
import { personService } from "@/services/person.service";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Update a person in the database.
 * @param formData - Form data containing the updated person information.
 */
export async function updatePersonAction(
  formData: PersonEditFormSchema,
) {
  if (!formData.id) {
    throw new Error("No person ID provided");
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  const person = await personService.getPerson(formData.id);

  if (!person) {
    throw new Error("Person not found");
  }

  await personService.updatePerson(
    fromPersonEditForm(formData),
  );

  // Revalidate the homepage in case the movie updated was on the homepage
  revalidatePath("/", "page");
  redirect(`/person/${person.id}`);
}

/**
 * Delete a person from the database.
 * @param previousState - Unused.
 * @param formData - Form data containing the person ID.
 */
export async function deletePersonAction(
  previousState: null | void,
  formData: FormData,
) {
  const id = Number(formData.get("item_id"));

  if (!id) {
    throw new Error("No person ID provided");
  }

  const isLoggedIn = await userService.refreshUser();

  if (!isLoggedIn) {
    throw new Error("User not authenticated");
  }

  await personService.deletePerson(id);

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath("/", "page");
  redirect("/");
}
