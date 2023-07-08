import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../utils/cache";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const Userinfo: FC = () => {
  const { username, nickname } = useGetUserInfo();

  const dispatch = useDispatch();

  const nav = useNavigate();

  function logout() {
    // 清空redux的user数据
    dispatch(logoutReducer);
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
