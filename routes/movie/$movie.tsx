import { Head, Link, useRouter } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import { ShowingDate } from "~/types.ts";

const cache = await getCache();

const movieDateToNumber = (date: ShowingDate) =>
  new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour,
    date.minute
  ).getTime();
export default function Index() {
  const movieName = decodeURIComponent(useRouter().params.movie);
  const showings = cache.movies.get(movieName);
  return (
    <div>
      <Head>
        <title>{movieName}</title>
        <meta name="description" content={movieName} />
      </Head>
      <h1>{movieName}</h1>
      <Link to="/">חזור לדף הבית</Link>
      {showings
        ?.toSorted(
          (a, b) => movieDateToNumber(a.date) - movieDateToNumber(b.date)
        )
        .map((showing) => (
          <h2>
            {showing.company} {showing.city} {showing.date.hour}:
            {showing.date.minute < 10 && "0"}
            {showing.date.minute} {showing.date.year}-{showing.date.month}-
            {showing.date.day}
          </h2>
        ))}
    </div>
  );
}
