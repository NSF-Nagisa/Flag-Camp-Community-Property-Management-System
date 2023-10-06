import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function Navigation(props) {
  const isLoggedIn = useSelector(state => state.isLoggedIn.value);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg flex-row navbar-light bg-light justify-content-between">
      <Link className="navbar-brand p-2" to={isLoggedIn ? "/dashboard" : "/login"}>Management System</Link>
      {isLoggedIn ? (
        <React.Fragment>
          <ul className="navbar-nav p-2">
              <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/discussion-board">Discussion Board</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/schedule">Schedule</Link>
              </li>
          </ul>
          <button className="btn btn-secondary btn-sm ml-auto p-2" type="button" onClick={() => dispatch(logout())}>Logout</button>
        </React.Fragment>
      ) : null}
    </nav>
  );
}
export default Navigation;
