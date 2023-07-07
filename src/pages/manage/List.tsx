import { FC } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import { Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionDataList";

const { Title } = Typography;

const List: FC = () => {
  useTitle("问卷驿站 — 问卷列表");

  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;

            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多...</div>
    </>
  );
};

export default List;
