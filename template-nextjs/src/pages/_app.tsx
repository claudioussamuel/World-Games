import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PrivyProvider from "@/components/PrivyProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider>
      <Component {...pageProps} />
    </PrivyProvider>
  );
}
