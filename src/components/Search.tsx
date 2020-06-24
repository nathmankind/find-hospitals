import React, { useState, useEffect, useRef, ReactElement } from "react";
import { Row, Col, Layout, Select, Input, Button, Spin, Space } from "antd";
import { Link, RouteComponentProps, useLocation } from "react-router-dom";
import { StaticContext } from "react-router";
import { getItem } from "./../Service/service";
import { firestore, auth } from "./../Service/firebase";
import firebase from "firebase";
import _ from "lodash";
import Navbar from "./Navbar";

const style = { background: "#0092ff", padding: "8px 0" };
const { Content } = Layout;
const { Option } = Select;

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const location = useLocation();
  const [radius, setRadius] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(0);
  const [longitude, setLongitude] = useState<number | null>(0);
  const [places, setPlaces] = useState<Array<any>>([{}]);
  const [searches, setSearches] = useState<Array<any>>([]); // for user searches

  const key = "";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let getLatitude = position.coords.latitude;
      let getLongitude = position.coords.longitude;
      setLatitude(getLatitude);
      setLongitude(getLongitude);
      console.log(`latitude: ${getLatitude}, longitude: ${getLongitude}`);
      sessionStorage.setItem("latitude", JSON.stringify(getLatitude));
      sessionStorage.setItem("longitude", JSON.stringify(getLongitude));
      const historyQuery = location.state as any;
      if (historyQuery) {
        setQuery(historyQuery.query);
        setLatitude(getLatitude);
        setLongitude(getLongitude);
        fetchSearchResults(historyQuery.query.split(" ").join("+"));
        console.log(historyQuery.query.split(" ").join("+"));
      }
    });
  }, []);

  //function to get final search query after 1000ms and add query to firebase
  const delayedSearchResult = useRef(
    _.debounce((q: string) => {
      if (q !== "") {
        const db = firestore;
        const user: any = auth.currentUser;
        const user_uid = user.uid;
        const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
        db.collection("users")
          .doc(user_uid)
          .update({ search: arrayUnion(q as string) }); //Adds search query to firebase
        setSearches((searches) => [...searches, q]);
      } else {
        console.log(null);
      }
    }, 1000)
  ).current;

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setQuery(e.target.value as string);
    console.log(e.target.value);
    delayedSearchResult(e.target.value);
    fetchSearchResults(e.target.value.split(" ").join("+"));
  };

  const handleRadius = (e: any) => {
    setRadius(e);
    console.log(e);
  };

  //Fetch search results
  const fetchSearchResults = (query: string) => {
    let lat = sessionStorage.getItem("latitude");
    let long = sessionStorage.getItem("longitude");
    console.log(lat, long);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const searchUrl = `${proxy}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${long}&radius=${radius}&key=${key}`;
    console.log(searchUrl);
    getItem(searchUrl)
      .then((res) => {
        setPlaces(res.results);
        console.log(places);
      })
      .catch((err) => console.log(err));
  };

  const placeList = places.map((place) => {
    const name = place.name;
    const address = place.formatted_address;
    return (
      <div className="place_list" key={place.id}>
        <div className="icon">
          <img src={place.icon} alt="icon" />
        </div>
        <div className="info">
          <p className="place_name">{name}</p>
          <p className="place_address">{address}</p>
        </div>
      </div>
    );
  });
  return (
    <div>
      <Content style={{ padding: "0 50px" }}>
        <Row style={{ justifyContent: "center", padding: 24 }}>
          <Col>
            <div>
              <p
                style={{
                  fontSize: 32,
                  color: "#001529",
                }}
              >
                Start Your Search
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ width: "75%", margin: "auto" }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Select
              value={radius}
              style={{ width: "80%", borderRadius: "20px" }}
              onChange={handleRadius}
            >
              <Option value="" disabled selected>
                Select Search Radius
              </Option>
              <Option value="500">500</Option>
              <Option value="1000">1000</Option>
              <Option value="5000">5000</Option>
              <Option value="10000">10000</Option>
              <Option value="20000">20000</Option>
              <Option value="30000">30000</Option>
              <Option value="50000">50000</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Input
              placeholder="Search for 'hospitals', 'health centers', 'medical fitness center' "
              value={query}
              onChange={handleQuery}
            />
          </Col>
        </Row>
        <div className="results-section">
          <p style={{ padding: 16, fontSize: 24 }}>Results</p>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {places !== [{}] ? (
                <div>{<ul>{placeList}</ul>}</div>
              ) : (
                <div>
                  <Space size="middle">
                    <Spin size="large" />
                  </Space>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </div>
  );
};

export default SearchForm;
