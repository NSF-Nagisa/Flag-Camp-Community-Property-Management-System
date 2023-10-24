import React from "react";
import { connect, useSelector } from "react-redux";

export default function auth(ExistingComponent) {
  return function WrapperComponent(props) {
    const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
    const curUser = useSelector((state) => state.isLoggedIn.user);
    // console.log(curUser);
    if (!isLoggedIn) {
      props.history.push("/login");
    }
    return <ExistingComponent {...props} user={curUser}></ExistingComponent>;
  };
}
