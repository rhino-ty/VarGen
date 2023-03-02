import { getChatResponse } from "@/pages/api/chatai";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";

interface ChatResponseProps {
  prompt: string;
}

export default function PromptInput() {
  const queryClient = new QueryClient();
  const [promptValue, setPromptValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (promptValue !== "") {
      queryClient.invalidateQueries("chatResponse");
      setPromptValue(promptValue);
    }
  };

  const ChatResponse = ({ prompt }: ChatResponseProps) => {
    const { data } = useQuery(["chatResponse", prompt], () => getChatResponse(prompt));

    return <div>{data?.resText}</div>;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={promptValue} onChange={(e) => setPromptValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {/* <ChatResponse prompt={`Create 10 login related variable names with React`} /> */}
      {promptValue && <ChatResponse prompt={promptValue} />}
    </>
  );
}
