import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useUserListener } from "@/features/auth/authHooks";
import { wrapper } from "@/app/store";
import AuthCheck from "@/components/AuthCheck";

import Head from "next/head";

export const SeoHead = () => {
  const title = "Almost Netflix";
  const desc = "";
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={desc} />
      <meta property="og:site_name" content="MoviApp" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta property="og:image" content="/logo.png" />
      <meta property="twitter:image" content="/logo.png" />
    </Head>
  );
};

function AlmostNetflix({ Component, pageProps }: AppProps) {
  useUserListener();
  return (
    <>
      <SeoHead />
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </>
  );
}

export default wrapper.withRedux(AlmostNetflix);
