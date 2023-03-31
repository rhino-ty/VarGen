import { getChatResponse } from "@/pages/api/chatai";
import { useQuery } from "react-query";
import Loading from "./Loading";

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

  const variableArr = data?.resText
    .replace(/^\d+\./gm, "")
    .replace(/\n/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 10);

  const variableList = variableArr?.map((vari) => (
    <div key={vari} className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="mt-4">
        {vari.length > 15 ? (
          <h2 className="variable cursor-pointer relative">
            <span className="variable-tooltip" title={vari}>
              {vari.slice(0, 15) + "..."}
            </span>
          </h2>
        ) : (
          <h2 className="variable">{vari}</h2>
        )}
      </div>
    </div>
  ));

  if (isLoading || isFetching)
    return (
      <section className="flex justify-center mt-5">
        <Loading />
      </section>
    );

  return (
    <div>
      <section className="text-gray-600">
        <div className="container p-10 mx-auto">
          <div className="flex flex-wrap -m-4">{variableList}</div>
        </div>
      </section>
    </div>
  );
};
