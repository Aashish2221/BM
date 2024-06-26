/* eslint-disable @next/next/no-page-custom-font */
// eslint-disable @next/next/next-script-for-ga
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/*------------ Google analytics end ---------------- */}
        <meta
          name='google-site-verification'
          content='QpBvmZkQ84PsgRBW9i8i2OnvN0_1yaR8KKOuhQqN14c'
        />
        <meta
          httpEquiv="Content-Security-Policy: default-src 'https://www.bullionmentor.com/'"
          content='upgrade-insecure-requests'
        />
<script
          async
          defer
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PGLMHN');`}</script>
        <meta
          charSet='utf-8'
          httpEquiv='Content-Security-Policy'
          content="default-src gap://ready file://* *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'"
        />
        {/* ------------------- End Google Tag Manager -------------------- */}
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
        <meta
          name='google-signin-client_id'
          content={process.env.GOOGLE_CLIENT_ID}
        />
         
        {/* <link rel='canonical' href={`${process.env.WEBSITE_URL}`} /> */}

      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
