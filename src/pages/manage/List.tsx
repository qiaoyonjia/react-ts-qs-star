import { FC, useEffect, useState, useRef } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;

const List: FC = () => {
  useTitle("问卷驿站 — 问卷列表");

  const [started, setStarted] = useState(false); // 标记是否已经开始加载，防抖有延迟时间
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); // 全部的列表数据 上滑加载更多是累计的
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length; // 有没有更多的未加载完成的数据

  const [searchParams] = useSearchParams(); // url参数，虽然没有page pageSize，但有keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // keyword变化时重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });

      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l)); // 累计
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  // 尝试触发加载  防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load(); // 真正加载数据
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  // 当页面加载或url参数变化时，触发加载
  useEffect(() => {
    tryLoadMore(); // 加载第一页 初始化
  }, [searchParams]);

  // 当页面滚动时，尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解绑事件
    };
  }, [searchParams, haveMoreData]);

  // loadMore Elem
  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了</span>;
    return <span>开始加载下一页</span>;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>问卷列表</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;

            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </div>
    </>
  );
};

export default List;
