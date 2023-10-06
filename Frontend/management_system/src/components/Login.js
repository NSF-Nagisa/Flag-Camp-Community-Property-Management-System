import React from "react";
import { useDispatch } from "react-redux";
import { login} from "../slice/authSlice";
import { Link } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    const [username, password] = event.target;
    const userLogin = {
      username: username.value,
      password: password.value
    }
    // ToDo: post userLogin to /login API

    dispatch(login());
    props.history.push('/dashboard');
  };

  return (
    <div className="container d-flex justify-content-center">
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
          <Link className="nav-link" to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
