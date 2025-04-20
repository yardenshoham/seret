import { MovielandMovie } from "~/types.ts";

export const getMovielandImageLink = (pic: string) =>
  `https://movieland.co.il/images/${pic}?w=236&h=350&mode=crop`;

// netanya only
export const getMovielandMovies = async (): Promise<MovielandMovie[]> => {
  const response = await fetch(
    "https://movieland.co.il/api/Events?&TheatreId=1292&MovieId=&HebrewSubs=&Dubbed=&ThreeD=&isVenueUpgrated=&isForSelectedTheaterOnly=true&isHFR3D=false&isHideVODRent=true",
  );
  const movies: MovielandMovie[] = await response.json();
  return movies;
};
