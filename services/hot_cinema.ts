import { HotCinemaMovie } from "~/types.ts";

// kfar-saba only
export const getHotCinemaMovies = async (): Promise<HotCinemaMovie[]> => {
  const response = await fetch(
    "https://hotcinema.co.il/tickets/TheaterEvents?movieid=undefined&theatreid=16&site=undefined&time=&type=undefined&lang=&kinorai=undefined&genreId=0&screentype=&subdub=&isnew=false",
  );
  const movies: HotCinemaMovie[] = await response.json();
  return movies;
};
