import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://8x8.vc/vpaas-magic-cookie-98fdea46be62454b9dcfbe8b7ded2847/external_api.js"
          async
        ></script>
        <link rel="shortcut icon" href="images/logos.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
