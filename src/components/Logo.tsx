import React, { FC } from "react";
import styles from "./Logo.module.scss";
import { Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷驿站</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
