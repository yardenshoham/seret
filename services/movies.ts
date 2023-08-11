import { getCinemaCityMoviesByTheater } from "~/services/cinema_city.ts";
import { City, Movies, Showing, ShowingDate } from "~/types.ts";
import { getMovielandMovies } from "~/services/movieland.ts";

const cache: { movies: Movies } = {
  movies: new Map<string, Showing[]>(),
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

export const _getCinemaCityMovies = async (): Promise<Movies> => {
  const result: Movies = new Map<string, Showing[]>();
  for (const city of ["גלילות", "כפר-סבא", "נתניה"]) {
    const cityMovies = await getCinemaCityMoviesByTheater(city as City);
    for (const movie of cityMovies) {
      let { Name, Dates } = movie;
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
      if (result.has(Name)) {
        result.get(Name)!.push(...showings);
      } else {
        result.set(Name, showings);
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

export const _getMovielandMovies = async (): Promise<Movies> => {
  const result: Movies = new Map<string, Showing[]>();
  const movielandMovies = await getMovielandMovies();
  for (const movie of movielandMovies) {
    let { Name, Dates } = movie;
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
    if (result.has(Name)) {
      result.get(Name)!.push(...showings);
    } else {
      result.set(Name, showings);
    }
  }
  return result;
};

const loadMovies = async (): Promise<void> => {
  const cinemaCityMovies = await _getCinemaCityMovies();
  const movielandMovies = await _getMovielandMovies();
  for (const [movieName, showings] of cinemaCityMovies) {
    if (movielandMovies.has(movieName)) {
      movielandMovies.get(movieName)!.push(...showings);
    } else {
      movielandMovies.set(movieName, showings);
    }
  }
  cache.movies = movielandMovies;
};

// refresh movies 10 hours
setInterval(loadMovies, 10 * 60 * 60 * 1000);

export const getCache = async (): Promise<{ movies: Movies }> => {
  if (cache.movies.size === 0) {
    await loadMovies();
  }
  return cache;
};
