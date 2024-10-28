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

export const personService = {
  async deletePerson(person_id: number) {
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
