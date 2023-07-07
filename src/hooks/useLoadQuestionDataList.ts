import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
      const data = await getQuestionListService({ keyword, isStar, isDeleted });
      return data;
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  );

  return { data, loading, error };
}

export default useLoadQuestionListData;
