/**
 * Service to handle movie related operations.
 */
import { fromPersonDto, PersonDto, toPersonDto } from "@/data/person.dto";
import {
  deletePerson,
  getPersonById,
  getPersonRolesCount,
  searchPersonByName,
  updatePerson,
} from "@/infrastructure/database/repositories/person.repository";

import { cloudflareService } from "./cloudflare.service";

export const personService = {
  async deletePerson(person_id: number) {
    const person = await this.getPerson(person_id);

    if (!person) {
      throw new Error("Person not found");
    }

    try {
      await Promise.all(
        person.person_images?.map(async ({ image }) => {
          if (image) {
            await cloudflareService.deleteImage(image.uuid!);
          }
        }) ?? [],
      );
    } catch {
      throw new Error("Error deleting images");
    }

    await deletePerson(person_id);
  },
  async getPerson(person_id: number) {
    const person = await getPersonById(person_id);

    return toPersonDto(person);
  },
  async getPersonMoviesCount(person_id: number) {
    const count = await getPersonRolesCount(person_id);

    return count;
  },
  async searchPersonByName(searchValue: string, limit?: number) {
    const persons = await searchPersonByName(searchValue, limit);

    return persons?.map((person) => toPersonDto(person)) ?? [];
  },
  async updatePerson(person: PersonDto) {
    if (!person.id) {
      throw new Error("No person ID provided");
    }

    await updatePerson(fromPersonDto(person));
  },
};
