import { getChatResponse } from "@/pages/api/chatai";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";

interface ChatResponseProps {
  prompt: string;
}
const queryClient = new QueryClient();

export default function PromptInput() {
  const [inputValue, setInputValue] = useState("");
  const [promptValue, setPromptValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue !== "") {
      // queryClient.invalidateQueries("chatResponse");
      setPromptValue(inputValue);
      queryClient.removeQueries();
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
  // 이거 지금 이상하다 결과값이 나오는데 계속 한 5초마다? 새 결과값을 계속 받아온다 이러면 안되는데;;
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
