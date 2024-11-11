/**
 * Service to handle operations related to views and materialized views.
 */

import { MovieDto, toMovieDto } from "@/data/movie.dto";
import { PersonDto, toPersonDto } from "@/data/person.dto";
import {
  getCurrentCounts,
  getInformationNeeded,
  getMostPopularPersons,
  getMostRecentMovies,
  getMoviesPerYear,
  getReleasedOnThisDay,
  getRolesByAge,
} from "@/infrastructure/database/repositories/view.repository";

export const viewsService = {
  async getCurrentCounts() {
    return await getCurrentCounts();
  },
  async getInformationNeeded(limit = 25): Promise<MovieDto[]> {
    const movies = await getInformationNeeded(limit);
    return movies.map((movie) => toMovieDto(movie));
  },
  async getMostPopularPersons(limit = 25): Promise<PersonDto[]> {
    const persons = await getMostPopularPersons(limit);
    return persons.map((person) => toPersonDto(person));
  },
  async getMostRecentMovies(limit = 25): Promise<MovieDto[]> {
    const movies = await getMostRecentMovies(limit);
    return movies.map((movie) => toMovieDto(movie));
  },
  async getMoviesPerYear() {
    return await getMoviesPerYear();
  },
  async getReleasedOnThisDay(limit = 25): Promise<MovieDto[]> {
    const movies = await getReleasedOnThisDay(limit);
    return movies.map((movie) => toMovieDto(movie));
  },
  async getRolesByAge() {
    return await getRolesByAge();
  },
};
