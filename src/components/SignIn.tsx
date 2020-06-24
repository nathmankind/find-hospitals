import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  Layout,
  AutoComplete,
  Row,
  Col,
} from "antd";
import { auth } from "../Service/firebase";
import Navbar from "./Navbar";
const { Content } = Layout;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  useEffect(() => {
    const c_user = auth.currentUser;
    setUser(c_user);
    if(user != null){renderRedirect();}
    
  }, []);

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setEmail(e.target.value as string);
    console.log(e.target.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setPassword(e.target.value as string);
    console.log(e.target.value);
  };
  const signInWithEmailAndPasswordHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
    // email: string,
    // password: string
  ): void => {
    console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
      setUserLoggedIn(true);
    });
    renderRedirect();
  };
  const renderRedirect = () => {
    if (userLoggedIn) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      {renderRedirect()}
      <Navbar />
      <Content style={{ padding: "0 50px" }}>
        <Row
          style={{
            width: "70%",
            margin: "auto",
            padding: 32,
          }}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="heading">
              <h2>Sign In</h2>
            </div>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input onChange={onEmailHandler} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password onChange={onPasswordHandler} />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Link to="/">
                <Button
                  // onClick={(e) => {
                  //   signInWithEmailAndPasswordHandler(e, email, password);
                  // }}
                  onClick={signInWithEmailAndPasswordHandler}
                  type="primary"
                  htmlType="submit"
                >
                  Sign In
                </Button>
                </Link>
              </Form.Item>
            </Form>
            <p>
              Dont have an account? Sign up <Link to="/signup">Here</Link>
            </p>
          </Col>
        </Row>
      </Content>
    </div>
  );
};
export default SignIn;
