import { getChatResponse } from "@/pages/api/chatai";
import { useQuery } from "react-query";

interface ChatResponseProps {
  prompt: string;
}

export const ChatResponse = ({ prompt }: ChatResponseProps) => {
  const { data, isLoading, isFetching } = useQuery(
    ["chatResponse", prompt],
    () => getChatResponse(prompt),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  if (isLoading || isFetching) return <div>Loading...</div>;

  return <div>{data?.resText}</div>;
};
