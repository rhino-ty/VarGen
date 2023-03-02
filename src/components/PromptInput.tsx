import { getChatResponse } from "@/pages/api/chatai";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";

interface ChatResponseProps {
  prompt: string;
}

export default function PromptInput() {
  // const queryClient = new QueryClient();
  const [inputValue, setInputValue] = useState("");
  const [promptValue, setPromptValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue !== "") {
      // queryClient.invalidateQueries("chatResponse");
      setPromptValue(inputValue);
    }
  };

  const ChatResponse = ({ prompt }: ChatResponseProps) => {
    const { data, isLoading } = useQuery(["chatResponse", prompt], () => getChatResponse(prompt));

    return isLoading ? <div>Loading...</div> : <div>{data?.resText}</div>;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {/* <ChatResponse prompt={`Create 10 login related variable names with React`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
    </>
  );
}
