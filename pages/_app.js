import NavBar from "../components/header/NavBar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
