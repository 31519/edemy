import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        /> */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"
          rel="stylesheet"
        /> */}

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Slab&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="shortcut icon" href="/favicon.png" />

        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}