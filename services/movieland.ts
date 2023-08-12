import { MovielandMovie } from "~/types.ts";

// netanya only
export const getMovielandMovies = async (): Promise<MovielandMovie[]> => {
  const response = await fetch(
    "https://www.movieland-cinema.co.il/api/Events?&TheatreId=1292&MovieId=&HebrewSubs=&Dubbed=&ThreeD=&isVenueUpgrated=&isForSelectedTheaterOnly=true&isHFR3D=false&isHideVODRent=true",
  );
  const movies: MovielandMovie[] = await response.json();
  return movies;
};
