import { MovielandMovie } from "~/types.ts";

export const getMovielandImageLink = (pic: string) =>
  `https://www.movieland-cinema.co.il/images/${pic}?w=236&h=350&mode=crop`;

// netanya only
export const getMovielandMovies = async (): Promise<MovielandMovie[]> => {
  const response = await fetch(
    "https://www.movieland-cinema.co.il/api/Events?&TheatreId=1292&MovieId=&HebrewSubs=&Dubbed=&ThreeD=&isVenueUpgrated=&isForSelectedTheaterOnly=true&isHFR3D=false&isHideVODRent=true",
  );
  const movies: MovielandMovie[] = await response.json();
  return movies;
};
