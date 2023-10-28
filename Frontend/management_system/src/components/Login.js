import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authSlice";

function Login(props) {
  const [showAlert, setShowAlert] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault();
    const [username, password] = event.target;
    const account = {
      username: username.value,
      password: password.value,
    };
    // ToDo: post userLogin to /login API

    dispatch(login(account));
    if(!isLoggedIn) {
      setShowAlert(true);
    }
  };
  useEffect(() => {
    if(isLoggedIn) {
      props.history.push("/dashboard");
    }
  },[isLoggedIn]);
  return (
    <div className="container d-flex justify-content-center">
      <div className="col mt-5">
          <div className="row justify-content-center">
                {showAlert ? 
                  <div className="alert alert-danger" role="alert">
                    Invalid Username or Password !
                  </div> 
                  : null
                }
          </div>
          <form onSubmit={handleLogin}>
            <div className="row justify-content-center">
              <div className="form-group col-4">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" className="form-control" id="loginUsername" placeholder="User Name" required/>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form-group col-4">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Password" required/>
              </div>
            </div>
            <div className="row justify-content-center" style={{marginLeft: '20%'}}>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
    </div>
  );
}
export default Login;