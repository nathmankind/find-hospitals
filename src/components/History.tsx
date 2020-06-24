import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from "./../Service/firebase";
import { Row, Col, List, Layout, Spin, Space } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { getUsers } from "../Service/service";
import Navbar from "./Navbar";
const { Content } = Layout;

const user_email = auth.currentUser?.email;

const History: React.FC = () => {
  const [qsearches, setQsearhes] = useState<Array<any>>([]);

  const getAllUsers = useQuery(getUsers);
  const result = getAllUsers.data;
  console.log(result);
  const res: any = Object.keys(result) as Array<keyof typeof result>;
  console.log(res);
  const search = res.filter(function (data: any) {
    return data.email == user_email;
  });
  setQsearhes(search.searches);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const db = firestore;
  //     const user: any = auth.currentUser;
  //     const user_id = user.uid;
  //     db.collection("users")
  //       .doc(user_id)
  //       .onSnapshot((data) => {
  //         console.log(data.data());
  //         const searchResults: any = data.data();
  //         console.log(searchResults.email);
  //         console.log(searchResults.search);
  //         setQsearhes(searchResults.search);
  //       });
  //   };
  //   fetchData();
  // }, []);

  const searchHistory = qsearches.map((list) => {
    return (
      <div>
        <li key={list}>
          <Link
            to={{
              pathname: "/",
              state: {
                query: list,
              },
            }}
          >
            {list}
          </Link>
        </li>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <Layout>
        <Navbar />
      </Layout>
      <Content style={{ padding: "0 50px", width: "90%", margin: "auto" }}>
        <Row style={{ padding: 24, fontSize: 32 }}>
          <h4>Previous search history</h4>
        </Row>
      </Content>
      <Content style={{ padding: "0 50px" }}>
        <Row style={{ padding: 24 }} className="history-list">
          {qsearches == [] && (
            <div>
              <p>No search results</p>
            </div>
          )}
          {qsearches ? (
            <ul>{searchHistory}</ul>
          ) : (
            <div>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          )}
        </Row>
      </Content>
    </div>
  );
};

export default History;
