/**
 * Service to handle label related operations.
 */
import { LabelDto, toLabelDto } from "@/data/label.dto";
import {
  getLabelById,
  getLabelMoviesCount,
  searchLabelByName,
} from "@/infrastructure/database/repositories/label.repository";

export const labelService = {
  async getLabel(label_id: number): Promise<LabelDto> {
    const label = await getLabelById(label_id);

    return toLabelDto(label);
  },
  async getLabelMoviesCount(label_id: number) {
    const count = await getLabelMoviesCount(label_id);

    return count;
  },
  async searchLabelByName(name: string): Promise<LabelDto[]> {
    const labels = await searchLabelByName(name);

    return labels?.map((label) => toLabelDto(label)) ?? [];
  },
};
