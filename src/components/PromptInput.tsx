import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChatResponse } from "./ChatResponse";

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
