import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Input, Layout, Select, Button, Row, Col } from "antd";
import { auth } from "../Service/firebase";
import { firestore } from "./../Service/firebase";
import Home from "./../Home";
import Navbar from "./Navbar";
const { Content } = Layout;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [q_search, setSearch] = useState<any>([]);
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

  const signupUser = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      const current_user: any = auth.currentUser;
      firestore.collection("users").doc(current_user.uid).set({
        email: email,
        search: q_search,
      });
      setUserLoggedIn(true);
    });
    // auth.onAuthStateChanged((user_available) => {
    //   user_available ? setCurrentUser(user_available) : setCurrentUser(null);
    //   // return <Redirect to="/" />;
    // });
    // if (currentUser) {
    //   window.location.replace("/");
    // }
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
            textAlign: "left",
            padding: 32,
          }}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="heading">
              <h2>Sign Up </h2>
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

              <Form.Item
                {...tailFormItemLayout}>
                <Link to="/">
                  <Button
                    onClick={(e) => {
                      signupUser(e, email, password);
                      renderRedirect();
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign Up
                  </Button>
                </Link>
              </Form.Item>
            </Form>
            <p>
              Already have an account? login <Link to="/login">Here</Link>
            </p>
          </Col>
        </Row>
      </Content>
    </div>
  );
};
export default SignUp;
