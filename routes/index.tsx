import { Head } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import Link from "https://esm.sh/@mui/material@5.14.4/Link";
import Grid from "https://esm.sh/@mui/material@5.14.4/Unstable_Grid2";

const cache = await getCache();

export default function Index() {
  const movieNames = Array.from(cache.movies.keys());
  return (
    <div>
      <Head>
        <title>סרטים</title>
        <meta name="description" content="בחירת סרט" />
      </Head>
      <h1>בחר סרט</h1>
      <Grid container spacing={2} columns={4}>
        {movieNames
          .filter(Boolean)
          .toSorted()
          .map((name) => (
            <Grid xs={1}>
              <Link
                key={name}
                role="button"
                href={`/movie/${encodeURIComponent(name)}`}
              >
                {name}
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
