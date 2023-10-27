import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";

function Login(props) {
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
    props.history.push("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="loginUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="loginUsername"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            required
          />
        </div>
        <div className="container row">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

    <div className="col mt-5">
      <div className="container-lg d-flex justify-content-center">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="loginUsername">Username</label>
            <input type="text" className="form-control" id="loginUsername" required/>
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input type="password" className="form-control" id="loginPassword" required/>
          </div>
          <div className="container row">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;