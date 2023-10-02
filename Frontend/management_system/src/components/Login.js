import React from "react";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const [username, password] = event.target;
    const userLogin = {
      username: username.value,
      password: password.value
    }
    // ToDo: post userLogin to /login API
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
          <a className="nav-link" href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}
export default Login;
