import { Head, Link, useRouter } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import { Showing, ShowingDate } from "~/types.ts";

const cache = await getCache();

const movieDateToNumber = (date: ShowingDate) =>
  new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour,
    date.minute,
  ).getTime();
export default function Index() {
  const movieName = decodeURIComponent(useRouter().params.movie);
  const showings = cache.movies.get(movieName);
  // group showings by date
  const showingsByDate = new Map<string, Showing[]>();
  showings?.forEach((showing) => {
    const date =
      `${showing.date.year}-${showing.date.month}-${showing.date.day}`;
    const showingsForDate = showingsByDate.get(date) ?? [];
    showingsForDate.push(showing);
    showingsByDate.set(date, showingsForDate);
  });
  return (
    <div>
      <Head>
        <title>{movieName}</title>
        <meta name="description" content={movieName} />
      </Head>
      <h1>{movieName}</h1>
      <Link to="/">חזור לדף הבית</Link>
      {Array.from(showingsByDate.entries()).map(([date, s]) => (
        <div>
          <h2>
            <time dateTime={date}>
              {Intl.DateTimeFormat("he-IL", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }).format(new Date(date))}
            </time>
          </h2>
          {s
            ?.toSorted(
              (a, b) => movieDateToNumber(a.date) - movieDateToNumber(b.date),
            )
            .map((showing) => (
              <p>
                {showing.company} {showing.city} {showing.date.hour}:
                {showing.date.minute < 10 && "0"}
                {showing.date.minute}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
}
