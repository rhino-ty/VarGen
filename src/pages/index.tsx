import PromptInput from "@/components/PromptInput";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Vargen</title>
        <meta name="description" content="변수 생성 앱" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container mx-auto px-5">
        <PromptInput />
      </section>
    </Layout>
  );
}
