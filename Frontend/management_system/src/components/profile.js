import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserById, USERS } from "../constants/User";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import "./card.css";

const { Role } = require("../constants/Role");

function Profile() {
  const user = useSelector((state) => state.isLoggedIn.user);
  let Users = [
    {
      id: 1,
      name: "Ruby",
      role: Role.Resident,
      username: "resident",
      password: "123",
      phone: null,
      company: null,
      image: null,
    },
    {
      id: 2,
      name: "Henry",
      role: Role.HOA,
      username: "hoa",
      password: "123",
      phone: null,
      company: null,
      image: null,
    },
    {
      id: 2,
      name: "Taylor",
      role: Role.ThirdPartyCompany,
      username: "thirdpartycompany",
      password: "123",
      phone: null,
      company: null,
      image: null,
    },
  ];
  let user_selected = Users.find(
    (user_selected) => user_selected.id === user.id
  );
  let [user_loggedin, setUser_loggedin] = useState(user_selected);
  let [formData, setFormData] = useState(user_loggedin);
  const handleUpdate = (event) => {
    event.preventDefault();
    setUser_loggedin(formData);
    console.log(user_loggedin);
    USERS[0].phone = 123456;
    console.log("USERS", USERS[0]);
  };
  // const [isHovering, setIsHovering] = useState(false);
  // const handleMouseOver = () => {
  //   if (!isHovering) {
  //     setIsHovering(true);
  //   }
  // };

  // const handleMouseOut = () => {
  //   if (isHovering) {
  //     setIsHovering(false);
  //   }
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const boxStyle = {
    width: "60px", // Set the width as needed
    height: "20px", // Set the height as needed
    backgroundColor: "blue", // Set the desired background color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="id"
            required
            onChange={handleInputChange}
            value={formData.id}
          />
        </div>

        {/* {isHovering && (
          <div className="card-overlay">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Account Info</Card.Title>
                <Card.Text>
                  ID:{user_loggedin.id}
                  <br />
                  Role:{user_loggedin.role}
                  <br />
                  Username:{user_loggedin.username}
                  <br />
                  Name:{user_loggedin.name}
                  <br />
                  Password:{user_loggedin.password}
                  <br />
                  Phone:{user_loggedin.phone}
                  <br />
                  Company:{user_loggedin.company}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )} */}

        <div className="form-group">
          <label htmlFor="userRole">Role</label>
          <input
            type="text"
            className="form-control"
            id="userRole"
            name="role"
            required
            onChange={handleInputChange}
            value={formData.role}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loginUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="loginUsername"
            name="username"
            required
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password </label>
          <input
            type="text"
            className="form-control"
            id="loginPassword"
            name="password"
            onChange={handleInputChange}
            required
            value={formData.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPhone">Phone </label>
          <input
            type="text"
            className="form-control"
            id="userPhone"
            name="phone"
            //required
            onChange={handleInputChange}
            value={formData.phone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userCompany">Company </label>
          <input
            type="text"
            className="form-control"
            id="userCompany"
            name="company"
            //required
            onChange={handleInputChange}
            value={formData.company}
          />
        </div>
        <div className="container row">
          <button
            type="submit"
            className="btn btn-primary"
            data-toggle="tooptip"
            data-placement="right"
            title="sss"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
export default Profile;
