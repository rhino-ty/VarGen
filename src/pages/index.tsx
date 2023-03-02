import PromptInput from "@/components/PromptInput";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Vargen</title>
        <meta name="description" content="변수 생성 앱" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PromptInput />
    </QueryClientProvider>
  );
}
