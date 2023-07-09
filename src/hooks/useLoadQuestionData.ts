import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  // ajax加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷 id");
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  // 根据获取的data设置 redux store
  useEffect(() => {
    if (!data) return;
    const { title = "", componentList = [] } = data as any;

    // 获取默认的selectId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }

    // 把componentList 存储到 redux store中
    dispatch(resetComponents({ componentList, selectedId }));
  }, [data]);

  // 判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
}

export default useLoadQuestionData;
