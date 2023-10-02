import React from "react";
function Navigation(props) {
  const { isLoggedIn, handleLogout } = props;
  return (
    <nav className="navbar navbar-expand-lg flex-row navbar-light bg-light">
      <a className="navbar-brand" href={isLoggedIn ? "/dashboard" : "/login"}>Management System</a>
      {isLoggedIn ? (
            <ul className="navbar-nav ">
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/discussion-board">Discussion Board</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/schedule">Schedule</a>
                </li>
            </ul>
      ) : null}
    </nav>
  );
}
export default Navigation;
