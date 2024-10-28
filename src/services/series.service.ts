/**
 * Service to handle series related operations.
 */
import { SeriesDto, toSeriesDto } from "@/data/series.dto";
import {
  getSeriesById,
  getSeriesMoviesCount,
  searchSeriesByName,
} from "@/infrastructure/database/repositories/series.repository";

export const seriesService = {
  async getSeries(series_id: number): Promise<SeriesDto> {
    const series = await getSeriesById(series_id);

    return toSeriesDto(series);
  },
  async getSeriesMoviesCount(series_id: number) {
    const count = await getSeriesMoviesCount(series_id);

    return count;
  },
  async searchSeriesByName(name: string): Promise<SeriesDto[]> {
    const series = await searchSeriesByName(name);

    return series?.map((series) => toSeriesDto(series)) ?? [];
  },
};
