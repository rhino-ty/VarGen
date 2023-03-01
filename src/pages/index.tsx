import React, { useState } from "react";
import Head from "next/head";
import { getChatResponse } from "./api/chatai";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

interface ChatResponseProps {
  prompt: string;
}

export default function Home() {
  const queryClient = new QueryClient();
  const [promptValue, setPromptValue] = useState("");

  const ChatResponse = ({ prompt }: ChatResponseProps) => {
    const { data } = useQuery(["chatResponse", prompt], () => getChatResponse(prompt));
    console.log(data);
    return <div>{data?.resText}</div>;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Vargen</title>
        <meta name="description" content="변수 생성 앱" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ChatResponse prompt={`Create 10 login related variable names with React`} /> */}
    </QueryClientProvider>
  );
}
