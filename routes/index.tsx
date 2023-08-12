import { Head } from "aleph/react";
import { getCache } from "~/services/movies.ts";
import Link from "https://esm.sh/@mui/material@5.14.4/Link";
import Grid from "https://esm.sh/@mui/material@5.14.4/Unstable_Grid2";
import Typography from "https://esm.sh/@mui/material@5.14.4/Typography";
import Box from "https://esm.sh/@mui/material@5.14.4/Box";

const cache = await getCache();

export default function Index() {
  return (
    <Box>
      <Head>
        <title>סרטים</title>
        <meta name="description" content="בחירת סרט" />
      </Head>
      <Typography variant="h1" gutterBottom>בחר סרט</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {cache.movies
            .toSorted()
            .map((m) => (
              <Grid md={2} sm={4} xs={4} key={m.name}>
                <Link
                  role="button"
                  href={`/movie/${encodeURIComponent(m.name)}`}
                >
                  <Typography variant="h5" gutterBottom>
                    {m.name}
                  </Typography>
                  <img
                    src={m.img}
                    alt={m.name}
                    style={{ width: "236px", height: "350px" }}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
