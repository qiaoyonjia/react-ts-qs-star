import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
// import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Typography } from "antd";

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: true,
    answerCount: 3,
    createdAt: "3月12日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 2,
    createdAt: "3月13日 13:23",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: false,
    answerCount: 10,
    createdAt: "3月14日 13:23",
  },
];

const List: FC = () => {
  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get("keyword"));

  useTitle("问卷驿站 — 问卷列表");

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>问卷列表</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;

            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多...</div>
    </>
  );
};

export default List;