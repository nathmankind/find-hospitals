import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "../App.less";
import { Row, Col, Layout, Menu, Button } from "antd";
import { auth } from "../Service/firebase";

const { Content, Header, Footer } = Layout;

const Navbar: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" style={{ fontSize: "1.4em" }}>
            <Link to="/">Find Hospitals</Link>
          </Menu.Item>
          <Menu.Item key="2" style={{ float: "right", fontSize: "1.25em" }}>
            <Button
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Button>
          </Menu.Item>
          <Menu.Item key="2" style={{ float: "right", fontSize: "1.25em" }}>
            <Link to="/history">Search History</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
