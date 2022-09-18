import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-primary-white font-poppins text-primary-black text-base selection:bg-primary selection:text-primary-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
