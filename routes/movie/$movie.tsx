import { Head, Link, useRouter } from "aleph/react";
import { getCache } from "~/services/movies.ts";

const cache = await getCache();

export default function Index() {
  const movieName = decodeURIComponent(useRouter().params.movie);
  return (
    <div>
      <Head>
        <title>{movieName}</title>
        <meta name="description" content={movieName} />
      </Head>
      <h1>{movieName}</h1>
      <Link to="/">חזור לדף הבית</Link>
    </div>
  );
}
