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

  console.log(variableArr);

  const variableList = variableArr?.map((vari) => (
    <div key={vari} className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">{vari}</h2>
      </div>
    </div>
  ));

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">{variableList}</div>
        </div>
      </section>
    </div>
  );
};
