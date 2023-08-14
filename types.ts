// core
export type Company = "סינמה סיטי" | "מובילנד" | "הוט סינמה";
export type City = "גלילות" | "כפר-סבא" | "נתניה";
export type ShowingDate = {
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
};
export type Showing = {
  company: Company;
  city: City;
  date: ShowingDate;
};
export type Movie = {
  name: string;
  showings: Showing[];
  img?: string;
};

// cinema city
export type CinemaCityDate = {
  Date: string;
};
export type CinemaCityMovie = {
  Name: string;
  Dates: CinemaCityDate[];
  Pic: string;
};

// movieland
export type MovielandDate = {
  Date: string;
};
export type MovielandMovie = {
  Name: string;
  Dates: MovielandDate[];
  Pic: string;
};

// hot cinema
export type HotCinemaDate = {
  Date: string;
};

export type HotCinemaMovie = {
  MovieName: string;
  Dates: HotCinemaDate[];
};
