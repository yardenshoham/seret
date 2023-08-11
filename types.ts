// core
export type Company = "סינמה-סיטי" | "מובילנד";
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
export type Movies = Map<string, Showing[]>;

// cinema city
export type CinemaCityDate = {
  Date: string;
};
export type CinemaCityMovie = {
  Name: string;
  Dates: CinemaCityDate[];
};

// movieland
export type MovielandDate = {
  Date: string;
};
export type MovielandMovie = {
  Name: string;
  Dates: MovielandDate[];
};
