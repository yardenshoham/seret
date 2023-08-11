import { Head, Link } from "aleph/react";
import { getCache } from "~/services/movies.ts";

const cache = await getCache();

export default function Index() {
  const movieNames = Array.from(cache.movies.keys());
  return (
    <div className="screen index">
      <Head>
        <title>סרטים</title>
        <meta name="description" content="בחירת סרט" />
      </Head>
      <h1>בחר סרט</h1>
      {movieNames.toSorted().map((name) => (
        <nav key={name}>
          <Link
            key={name}
            role="button"
            to={`/movie/${encodeURIComponent(name)}`}
          >
            {name}
          </Link>
        </nav>
      ))}
    </div>
  );
}
