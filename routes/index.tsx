import { Head } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import Link from "https://esm.sh/@mui/material@5.14.4/Link";
import Grid from "https://esm.sh/@mui/material@5.14.4/Unstable_Grid2";
import Typography from "https://esm.sh/@mui/material@5.14.4/Typography";
import Box from "https://esm.sh/@mui/material@5.14.4/Box";

const cache = await getCache();

export default function Index() {
  const movieNames = Array.from(cache.movies.keys());
  return (
    <Box>
      <Head>
        <title>סרטים</title>
        <meta name="description" content="בחירת סרט" />
      </Head>
      <Typography variant="h1" gutterBottom>בחר סרט</Typography>
      <Grid container spacing={2} columns={4}>
        {movieNames
          .filter(Boolean)
          .toSorted()
          .map((name) => (
            <Grid xs={1}>
              <Typography variant="h5" gutterBottom>
                <Link
                  key={name}
                  role="button"
                  href={`/movie/${encodeURIComponent(name)}`}
                >
                  {name}
                </Link>
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
