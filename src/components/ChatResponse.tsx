import { getChatResponse } from "@/pages/api/chatai";
import { useQuery } from "react-query";
import Loading from "./Loading";
import CopyToClipboard from "react-copy-to-clipboard";
import { AxiosError } from "axios";

interface ChatResponseProps {
  prompt: string;
}

export const ChatResponse = ({ prompt }: ChatResponseProps) => {
  const { data, isLoading, isFetching } = useQuery(
    ["chatResponse", prompt],
    () => getChatResponse(prompt),
    {
      refetchOnWindowFocus: false, // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행하지 못하게
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: true, // 요청 실패시 재시도하지 않음
      retry: 2, // 요청 실패시 2번까지 재시도
      onError: (error: AxiosError) => {
        if (error.response?.status === 429) {
          alert("API 토큰이 만료되었습니다.");
        } else {
          console.error(error);
        }
        return;
      },
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
            <CopyToClipboard text={vari}>
              <span className="variable-tooltip" title={vari}>
                {vari.slice(0, 15) + "..."}
              </span>
            </CopyToClipboard>
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
