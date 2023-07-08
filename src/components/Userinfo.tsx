import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { getUserInfoService } from "../services/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../utils/cache";

const Userinfo: FC = () => {
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};

  const nav = useNavigate();

  function logout() {
    // 清空token
    removeToken();
    message.success("退出成功");
    // 跳转到登录页面
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );

  // TODO 对于已经登录的用户，显示什么
  return <div>{username ? UserInfo : Login}</div>;
};

export default Userinfo;
