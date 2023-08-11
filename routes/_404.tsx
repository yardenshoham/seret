import { Link } from "aleph/react";

export default function E404() {
  return (
    <div>
      <h2>אין פה כלום</h2>
      <p>
        <Link to="/">חזור לדף הבית</Link>
      </p>
    </div>
  );
}
