import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const { confirm } = Modal;

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

const Trash: FC = () => {
  useTitle("问卷驿站 — 回收站");
  const [questionList, setQuestionList] = useState(rawQuestionList);

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
      // key: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  function del() {
    confirm({
      title: "确定彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "注意！删除之后不可以找回",
      okText: "确认",
      cancelText: "取消",
      onOk: () => message.success("删除成功"),
    });
  }

  // 可以把JSX定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger onClick={del} disabled={selectedIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {/* 星标问卷 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多...</div>
    </>
  );
};

export default Trash;
