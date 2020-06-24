import React, { useEffect, useState } from "react";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import History from "./components/History";
import Home from "./Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { auth } from "./Service/firebase";
import { useQuery } from "@apollo/react-hooks";
import { getUsers } from "./Service/service";

function App() {
  const [user, setUser] = useState<any>(null);
  console.log(user);
  console.log(auth.currentUser?.email);
  useEffect(() => {
    auth.onAuthStateChanged((user_available) => {
      user_available ? setUser(user_available) : setUser(null);
    });
  }, []);
  return (
    <div className="App">
      {/* <Router>
        <Switch>{user ? <Home /> : <SignIn /> || <SignUp />}</Switch>
      </Router> */}

      {user ? (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" component={History} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={SignIn} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
