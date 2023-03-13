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

  const variableArr = data?.resText
    .replace(/^\d+\./gm, "")
    .replace(/\n/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 10);

  console.log({ variableArr });

  return <div>{data?.resText}</div>;
};
