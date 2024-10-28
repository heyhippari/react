/**
 * Service to handle studio related operations.
 */
import { StudioDto, toStudioDto } from "@/data/studio.dto";
import {
  getStudioById,
  getStudioMoviesCount,
  searchStudioByName,
} from "@/infrastructure/database/repositories/studio.repository";

export const studioService = {
  async getStudio(studio_id: number): Promise<StudioDto> {
    const studio = await getStudioById(studio_id);

    return toStudioDto(studio);
  },
  async getStudioMoviesCount(studio_id: number) {
    const count = await getStudioMoviesCount(studio_id);

    return count;
  },
  async searchStudioByName(name: string): Promise<StudioDto[]> {
    const studios = await searchStudioByName(name);

    return studios?.map(toStudioDto) ?? [];
  },
};
