import { PersonDto } from "@/data/person.dto";
import { z } from "zod";

export const personEditFormSchema = z.object({
  birth_date: z.string().optional(),
  bust_size: z
    .number({
      description: "In centimeters",
    })
    .optional(),
  height: z
    .number({
      description: "In centimeters",
    })
    .optional(),
  hips_size: z
    .number({
      description: "In centimeters",
    })
    .optional(),
  id: z.number(),
  name: z.string().optional(),
  original_name: z.string({
    message: "Original name is required.",
  }),
  waist_size: z
    .number({
      description: "In centimeters",
    })
    .optional(),
});

export type PersonEditFormSchema = z.infer<typeof personEditFormSchema>;

/**
 * Convert a person DTO to a person edit form.
 * @param dto An object representing a person DTO.
 * @returns An object representing a person edit form.
 */
export function toPersonEditForm(dto: PersonDto): PersonEditFormSchema {
  return {
    birth_date: dto.birth_date!,
    bust_size: dto.bust_size!,
    height: dto.height!,
    hips_size: dto.hips_size!,
    id: dto.id!,
    name: dto.alternative_name ? dto.display_name : undefined,
    original_name: dto.alternative_name ?? dto.display_name,
    waist_size: dto.waist_size!,
  };
}

/**
 * Convert a person edit form to a person DTO.
 * @param form An object representing a person edit form.
 * @returns A person data transfer object.
 */
export function fromPersonEditForm(form: PersonEditFormSchema): PersonDto {
  return {
    alternative_name: form.name ? form.original_name : null,
    birth_date: form.birth_date,
    bust_size: form.bust_size,
    display_name: form.name ?? form.original_name ?? "",
    height: form.height,
    hips_size: form.hips_size,
    id: form.id,
    waist_size: form.waist_size,
  };
}
