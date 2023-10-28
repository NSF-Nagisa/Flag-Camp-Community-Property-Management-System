import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { updateUser } from "../slice/authSlice";

function Profile() {
  const user = useSelector((state) => state.isLoggedIn.user);
  const [userData, setUserData] = useState(user);
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateUser(
      {
        id: user.id, 
        username: user.username,
        ...userData
      }));
    alert("Your data is updated successfully");
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={handleInputChange}
            value={userData.name}
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
            value={userData.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPhone">Phone </label>
          <input
            type="text"
            className="form-control"
            id="userPhone"
            name="phone"
            onChange={handleInputChange}
            value={userData.phone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userCompany">Company </label>
          <input
            type="text"
            className="form-control"
            id="userCompany"
            name="company"
            onChange={handleInputChange}
            value={userData.company}
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
