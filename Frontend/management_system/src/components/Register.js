import React, { useState } from "react";
import { Role } from "../constants/Role";
import { USERS } from "../constants/User";
var USERID = 10;
function Register() {
  const [isSameFlag, setFlag] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setFlag(false);
      return;
    } else {
      setFlag(true);
    }

    const newUser = {
      id: USERID++,
      name: name,
      username: username,
      password: password,
      role: role,
      phone: undefined,
      company: undefined,
      image: undefined,
    };

    // console.log(JSON.stringify(newUser));
    // ToDO: add fetch() to post newForm to /addUser API
    USERS.push(newUser);
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="registerName">Name</label>
          <input
            type="text"
            className="form-control"
            id="registerName"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword2"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            required
          />
          {isSameFlag ? null : (
            <div className="alert alert-danger" role="alert">
              Confirm Password is not same as Password, please check!
            </div>
          )}
        </div>
        <div className="form-group" onChange={(e) => setRole(e.target.value)}>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="registerRadioOption"
              id="registerResidentRadioOption"
              value={Role.Resident}
              checked={role === Role.Resident}
              readOnly
              required
            />
            <label
              className="form-check-label"
              htmlFor="registerResidentRadioOption"
            >
              Resident
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="registerRadioOption"
              id="registerHOARadioOption"
              value={Role.HOA}
              checked={role === Role.HOA}
              readOnly
            />
            <label
              className="form-check-label"
              htmlFor="registerHOARadioOption"
            >
              HOA
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="registerRadioOption"
              id="registerThirdPartyCompanyRadioOption"
              value={Role.ThirdPartyCompany}
              checked={role === Role.ThirdPartyCompany}
              readOnly
            />
            <label
              className="form-check-label"
              htmlFor="registerThirdPartyCompanyRadioOption"
            >
              Third Party Company
            </label>
          </div>
        </div>
        <div className="row ml-1">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
