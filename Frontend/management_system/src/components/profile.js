import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { updateUser } from "../slice/authSlice";

function Profile() {
  const user = useSelector((state) => state.isLoggedIn.user);
  const [userData, setUserData] = useState(user);
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    if(userData.password !== confirmPassword){
      alert("Confirm Password is not same as Password");
      return;
    }
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
    <div className="container d-flex justify-content-center mt-5">
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
            type="password"
            className="form-control"
            id="loginPassword"
            name="password"
            onChange={handleInputChange}
            required
            value={userData.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Confirm Password </label>
          <input
            type="password"
            className="form-control"
            id="loginConfirmPassword"
            name="confirmPassword"
            onChange={(event) => {setConfirmPassword(event.target.value)}}
            required
            value={confirmPassword}
          />
        </div>
        <div className="container row">
          <button
            type="submit"
            className="btn btn-primary"
            data-placement="right"
          >
            Update
          </button>
        </div>
        
      </form>
    </div>
  );
}
export default Profile;
