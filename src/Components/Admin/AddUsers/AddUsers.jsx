import React, { Component } from "react";
import userImg from "../../../Assets/user.svg";
import emailImg from "../../../Assets/email.svg";
import phoneImg from "../../../Assets/phone.svg";
import mainImg from "../../../Assets/main.svg";
import "./addUsers.scss";
class AddUsers extends Component {
  state = {};
  render() {
    return (
      <div className="addUsers">
        <header className="headSection">
          <img src={mainImg} />
        </header>
        <div className="mainSection">
          <div className="loginHeading">
            <b>Add User</b>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <img src={userImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="firstName" />
                <span className="label">First Name</span>
                <span className="border" />
              </label>
            </div>

            <div className="form-group">
              <img src={userImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="lastName" />
                <span className="label">Last Name</span>
                <span className="border" />
              </label>
            </div>

            <div className="form-group">
              <img src={emailImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="email" />
                <span className="label">Email</span>
                <span className="border" />
              </label>
            </div>

            <div className="form-group">
              <img src={phoneImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="phoneNumber" />
                <span className="label">Phone Number</span>
                <span className="border" />
              </label>
            </div>

            <div className="form-group">
              <img src={userImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="employeeNumber" />
                <span className="label">Employee Number</span>
                <span className="border" />
              </label>
            </div>

            <div className="form-group">
              <img src={userImg} />
              <label className="inp">
                <input placeholder="&nbsp;" name="organisation" />
                <span className="label">Organisation</span>
                <span className="border" />
              </label>
            </div>

            <div id="btnDiv" className="form-group">
              <button onClick={this.handleSubmit}>Add Recruiter</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUsers;
