import PromptInput from "@/components/PromptInput";
import Head from "next/head";
import DarkModeToggleButton from "../components/DarkModeToggleButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vargen</title>
        <meta name="description" content="변수 생성 앱" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-gray-600 body-font md:sticky md:top-0 md:z-50 bg-primary">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <DarkModeToggleButton />
        </div>
      </header>

      <PromptInput />
    </>
  );
}
