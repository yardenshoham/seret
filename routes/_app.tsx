import { Head } from "aleph/framework/react/head.ts";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head></Head>
      {children}
    </>
  );
}
