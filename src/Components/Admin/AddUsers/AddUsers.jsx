import React, { Component } from "react";
import userImg from "../../../Assets/user.svg";
import emailImg from "../../../Assets/email.svg";
import phoneImg from "../../../Assets/phone.svg";
import mainImg from "../../../Assets/main.svg";
import email from '../../../Assets/email.svg';
import phone from '../../../Assets/phone.svg';
import "./addUsers.scss";
import Axios from "axios";
class AddUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            surname: '',
            organisation: '',
            emNumber: '',
            email: '',
            phone: '',
            recruiter: '3',

        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleUserInput (event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name] : value
        });
    }
    addUser(){
        let body = {
            Name: this.state.firstName,
            Surname: this.state.surname,
            Organisation: this.state.organisation,
            EmployeeNumber: this.state.emNumber,
            Email: this.state.email,
            Phone: this.state.recruiter,
            
        };

        let user = {
            users: body,
            usersTypes: this.state.recruiter,
        };
    }
    render() {
        return (
            <div className="addUsers">
                <div className="">
                    <div className="flexOnX">
                        <h1 className="personalHeader">Personal Details</h1>
                        <table className="rightTable">
                            <thead />
                            <tbody>
                          
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <img src={userImg} />
                                            <label className="inp">
                                                <input id="firstName" placeholder="&nbsp;" name="firstName" value ={this.state.firstName} onChange={(event) => this.handleUserInput(event)} />
                                                <span className="label">Full First Name</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>  
                                    </td>
                                    <td> 
                                        <div className="form-group">
                                            <img src={userImg} />
                                            <label className="inp">
                                                <input id="surname" placeholder="&nbsp;" name="surname" value= {this.state.surname} onChange={(event) => this.handleUserInput(event)} />
                                                <span className="label">Surname</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <img src={userImg} />
                                            <label className="inp">
                                                <input id="maidenName" placeholder="&nbsp;" name="organisation" value ={this.state.organisation} onChange={(event) => this.handleUserInput(event)} />
                                                <span className="label">Organisation</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group">
                                            <img src={userImg} />
                                            <label className="inp">
                                                <input id="idNumberForm" placeholder="&nbsp;" name="emNumber" value ={this.state.emNumber} onChange={(event) => this.handleUserInput(event)}/>
                                                <span className="label">Employee Number</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <img src={email} />
                                            <label className="inp">
                                                <input id="email" placeholder="&nbsp;" name="email" value ={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
                                                <span className="label">Email Address</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group">
                                            <img src={phone} />
                                            <label className="inp">
                                                <input id="phone" placeholder="&nbsp;" name="phone" value ={this.state.phone} onChange={(event) => this.handleUserInput(event)}/>
                                                <span className="label">Telephone Number</span>
                                                <span className="border"></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                 
                                </tr>
                            </tbody>
                        </table>
                        <button className="Rectangle-Copy-14" id="next" onClick={this.addUser}>SUBMIT</button>
                              
                    </div>
                
                </div>
            
            </div>
        );
    }
}

export default AddUsers;