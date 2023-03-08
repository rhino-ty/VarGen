import { getChatResponse } from "@/pages/api/chatai";
import { useState } from "react";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface ChatResponseProps {
  prompt: string;
}
const queryClient = new QueryClient();

export default function PromptInput() {
  const [inputValue, setInputValue] = useState("");
  const [promptValue, setPromptValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    queryClient.invalidateQueries("chatResponse");
    if (inputValue !== "") {
      setPromptValue(inputValue);
    }
  };

  const ChatResponse = ({ prompt }: ChatResponseProps) => {
    const { data, isLoading } = useQuery(["chatResponse", prompt], () => getChatResponse(prompt), {
      staleTime: Infinity,
      cacheTime: Infinity,
    });

    if (isLoading) return <div>Loading...</div>;

    return <div>{data?.resText}</div>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {/* <ChatResponse prompt={`Create 10 게시판 related variable names with camelCase`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
