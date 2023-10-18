import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Role } from "../constants/Role";

function Navigation() {
  const isLoggedIn = useSelector(state => state.isLoggedIn.value);
  const user = useSelector(state => state.isLoggedIn.user);
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
              <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              {
                user.role === Role.HOA ?
                  <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                  </li>
                    : null
              }
             
          </ul>
          <div className=" ml-auto p-2">
            <span className="navbar-text p-2">
              Welcome, {user.name} !
            </span>
            <button className="btn btn-secondary btn-sm p-2" type="button" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </React.Fragment>
      ) : null}
    </nav>
  );
}
export default Navigation;

