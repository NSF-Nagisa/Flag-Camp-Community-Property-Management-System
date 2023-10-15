import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserById, USERS } from "../constants/User";

function Profile() {
  const user = useSelector((state) => state.isLoggedIn.user);
  const [formData, setFormData] = useState(user || {});

  const handleUpdate = (event) => {
    event.preventDefault();
    //const { id, name, role, username, password, phone, company } = formData;
    //const userFound = USERS.find((user) => user.id === formData.id);
    //USERS[0].phone = 123345;
    console.log("USERS", USERS[0]);
    //updateUserById();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update form data state
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
          <label htmlFor="loginPassword">Password </label>
          <input
            type="text"
            className="form-control"
            id="loginPassword"
            name="password"
            required
            value={user.password}
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
export default Profile;
