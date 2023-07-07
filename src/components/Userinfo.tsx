import { FC } from "react";
// import styles from "./Userinfo.module.scss";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";

const Userinfo: FC = () => {
  // TODO 对于已经登录的用户，显示什么
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};

export default Userinfo;
