import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import Userinfo from "../components/Userinfo";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Userinfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        问卷驿站 &copy;2023 — present. Created by{" "}
        <a href="https://github.com/" target="blank">
          闫
        </a>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
