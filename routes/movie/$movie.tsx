import { Head, useRouter } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import { Showing, ShowingDate } from "~/types.ts";
import Link from "https://esm.sh/@mui/material@5.14.4/Link";
import Grid from "https://esm.sh/@mui/material@5.14.4/Unstable_Grid2";
import Typography from "https://esm.sh/@mui/material@5.14.4/Typography";

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

  // get current date in Israel
  const parts = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Jerusalem",
    hour12: false,
  })
    .formatToParts(new Date())
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, Object.create(null));
  const currentDate: ShowingDate = {
    year: parseInt(parts.year),
    month: parseInt(parts.month),
    day: parseInt(parts.day),
    hour: parseInt(parts.hour ?? "0"),
    minute: parseInt(parts.minute ?? "0"),
  };

  const showings = cache.movies.get(movieName);
  // group showings by date
  const showingsByDate = new Map<string, Showing[]>();
  showings?.forEach((showing) => {
    const date =
      `${showing.date.year}-${showing.date.month}-${showing.date.day}`;
    const showingsForDate = showingsByDate.get(date) ?? [];
    // filter out dates that are in the past
    if (movieDateToNumber(showing.date) < movieDateToNumber(currentDate)) {
      return;
    }
    showingsForDate.push(showing);
    showingsByDate.set(date, showingsForDate);
  });
  return (
    <div>
      <Head>
        <title>{movieName}</title>
        <meta name="description" content={movieName} />
      </Head>
      <Typography variant="h1" gutterBottom>{movieName}</Typography>
      <Link href="/">חזור לדף הבית</Link>
      <Grid container>
        {Array.from(showingsByDate.entries()).map(([date, s]) => (
          <Grid xs={2}>
            <Typography variant="h5" gutterBottom>
              <time dateTime={date}>
                {Intl.DateTimeFormat("he-IL", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }).format(new Date(date))}
              </time>
            </Typography>
            {s
              ?.toSorted(
                (a, b) => movieDateToNumber(a.date) - movieDateToNumber(b.date),
              )
              .map((showing) => (
                <Typography variant="body1" gutterBottom>
                  {showing.company} {showing.city} {showing.date.hour}:
                  {showing.date.minute < 10 && "0"}
                  {showing.date.minute}
                </Typography>
              ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
