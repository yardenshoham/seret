import {
  getCinemaCityImageLink,
  getCinemaCityMoviesByTheater,
} from "~/services/cinema_city.ts";
import { City, Movie, Showing, ShowingDate } from "~/types.ts";
import {
  getMovielandImageLink,
  getMovielandMovies,
} from "~/services/movieland.ts";

const cache: { movies: Movie[] } = {
  movies: [],
};

const normalizeMovieName = (name: string): string => {
  return name
    .replace(/[^א-ת0-9']+/g, " ")
    .replace(/ אנגלית$/, "")
    .trim();
};

export const _cinemaCityDateToShowingDate = (date: string): ShowingDate => {
  // date is in the format of "11/08/2023 21:40"
  const [day, month, year, hour, minute] = date.split(/\/|:| /).map(Number);
  return { day, month, year, hour, minute };
};

export const _getCinemaCityMovies = async (): Promise<Movie[]> => {
  const result: Movie[] = [];
  for (const city of ["גלילות", "כפר-סבא", "נתניה"]) {
    const cityMovies = await getCinemaCityMoviesByTheater(city as City);
    for (const movie of cityMovies) {
      let { Name, Dates, Pic } = movie;
      // we don't want dubbed movies
      if (Name.includes("מדובב")) {
        continue;
      }
      Name = normalizeMovieName(Name);
      const showings: Showing[] = Dates.map((date) => ({
        company: "סינמה-סיטי",
        city: city as City,
        date: _cinemaCityDateToShowingDate(date.Date),
      }));
      const movieIndex = result.findIndex((movie) => movie.name === Name);
      if (movieIndex !== -1) {
        result[movieIndex].showings.push(...showings);
      } else {
        result.push({
          name: Name,
          showings,
          img: getCinemaCityImageLink(Pic),
        });
      }
    }
  }
  return result;
};

export const _movielandDateToShowingDate = (date: string): ShowingDate => {
  // date is in the format of "2023-08-11T21:30:00"
  const [year, month, day, hour, minute] = date.split(/-|T|:/).map(Number);
  return { day, month, year, hour, minute };
};

export const _getMovielandMovies = async (): Promise<Movie[]> => {
  const result: Movie[] = [];
  const movielandMovies = await getMovielandMovies();
  for (const movie of movielandMovies) {
    let { Name, Dates, Pic } = movie;
    // we don't want dubbed movies
    if (Name.includes("מדובב")) {
      continue;
    }
    const showings: Showing[] = Dates.map((date) => ({
      company: "מובילנד",
      city: "נתניה",
      date: _movielandDateToShowingDate(date.Date),
    }));
    Name = normalizeMovieName(Name);
    const movieIndex = result.findIndex((movie) => movie.name === Name);
    if (movieIndex !== -1) {
      result[movieIndex].showings.push(...showings);
    } else {
      result.push({
        name: Name,
        showings,
        img: getMovielandImageLink(Pic),
      });
    }
  }
  return result;
};

const loadMovies = async (): Promise<void> => {
  const cinemaCityMovies = await _getCinemaCityMovies();
  const movielandMovies = await _getMovielandMovies();
  for (const movie of movielandMovies) {
    const movieIndex = cinemaCityMovies.findIndex((m) => m.name === movie.name);
    if (movieIndex !== -1) {
      cinemaCityMovies[movieIndex].showings.push(...movie.showings);
    } else {
      cinemaCityMovies.push(movie);
    }
  }
  cache.movies = cinemaCityMovies;
};

// refresh movies 10 hours
setInterval(loadMovies, 10 * 60 * 60 * 1000);

export const getCache = async (): Promise<{ movies: Movie[] }> => {
  if (cache.movies.length === 0) {
    await loadMovies();
  }
  return cache;
};
