import { FC } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    // TODO 尝试做一个好看的404页面
    <Result
      status="404"
      title="页面不存在"
      subTitle="抱歉！我们找不到您想访问的页面..."
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav("/");
          }}
        >
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
