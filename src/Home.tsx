import React from "react";
import SearchForm from "./components/Search";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./App.less";
import { Row, Col, Layout, Menu, Button } from "antd";
import { auth } from "./Service/firebase";
import Navbar from "./components/Navbar";
const { Content, Header, Footer } = Layout;

const Home: React.FC = () => {
  return (
    <Layout className="layout">
      <Navbar/>
      <div className="main-head">
        <Content style={{ padding: "0 50px" }}>
          <Row style={{ justifyContent: "center" }}>
            <Col>
              <div className="text text-left">
                <h2>Find Hospitals and Medical Centers Near You.</h2>
                <p>
                  Search for medical centers, clinics and healthcare
                  <br></br>
                  centers near you with.
                </p>
              </div>
            </Col>
          </Row>
        </Content>
      </div>
      <SearchForm />
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
