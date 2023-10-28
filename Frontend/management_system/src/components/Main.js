import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import auth from "../utils/auth.hoc";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { Role } from "../constants/Role";

function Main() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const user = useSelector((state) => state.isLoggedIn.user);
  const showRegister = () => {
    if (isLoggedIn) {
      if (user.role === Role.HOA) {
        return <Register />;
      } else {
        return <Redirect to="/dashboard" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  };
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" render={showRegister}></Route>
        <Route path="/dashboard" component={auth(Dashboard)}></Route>
        <Route path="/schedule" component={auth(Schedule)}></Route>
        <Route path="/profile" component={auth(Profile)}></Route>
      </Switch>
    </React.Fragment>
  );
}
export default Main;
