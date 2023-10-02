import React, { useState } from "react";

function Register() {
  const [isSameFlag, setFlag] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const [username, password, confirmPassword, role] = event.target;
    if(password.value !== confirmPassword.value){
      setFlag(false);
      return;
    }else{
      setFlag(true);
    }
    const newUser = {
      username: username.value,
      password: password.value,
      role: role.value
    }
    // console.log(JSON.stringify(newUser));
    // ToDO: add fetch() to post newForm to /addUser API 
  };

  return (
    <div className="container d-flex justify-content-center">
    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="registerUsername">Username</label>
    <input type="text" className="form-control" id="registerUsername" required/>
  </div>
  <div className="form-group">
    <label htmlFor="registerPassword1">Password</label>
    <input type="password" className="form-control" id="registerPassword1" required/>
  </div>
  <div className="form-group">
    <label htmlFor="registerPassword2">Confirm Password</label>
    <input type="password" className="form-control" id="registerPassword2" required/>
    {
      isSameFlag ? null :
      <div className="alert alert-danger" role="alert">
        confirm password is not same as password, please check!
      </div>
    }
  </div>
  <div className="form-group">
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="registerRadioOption" id="registerResidentRadioOption" value="Resident" required/>
      <label className="form-check-label" htmlFor="registerResidentRadioOption">Resident</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="registerRadioOption" id="registerHOARadioOption" value="HOA"/>
      <label className="form-check-label" htmlFor="registerHOARadioOption">HOA</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="registerRadioOption" id="registerThirdPartyCompanyRadioOption" value="ThirdPartyCompany"/>
      <label className="form-check-label" htmlFor="registerThirdPartyCompanyRadioOption">Third Party Company</label>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  );
}
export default Register;
