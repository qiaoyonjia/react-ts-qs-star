import { FC, useEffect } from "react";
import {
  Typography,
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { REGISTER_PATHNAME } from "../router";
import {
  rememberUser,
  deleteUserFromStorage,
  getUserInfoFromStorage,
  setToken,
} from "../utils/cache";
import { MANAGE_INDEX_PATHNAME } from "../router";
import { loginService } from "../services/user";
import { useRequest } from "ahooks";

const { Title } = Typography;

const Login: FC = () => {
  // const nav = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const nav = useNavigate();

  const { run: login } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result;
        // 存储token
        setToken(token);
        message.success("登录成功");
        nav(MANAGE_INDEX_PATHNAME);
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values;

    login(username, password);

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在5-20之间",
              },
              {
                pattern: /^\w+$/,
                message: "只能是字母数字下划线",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
