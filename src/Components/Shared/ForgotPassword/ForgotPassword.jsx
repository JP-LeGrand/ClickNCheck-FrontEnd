import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import 'typeface-roboto';
import './ForgotPassword.scss';
import imgMain from '../../../Assets/main.svg';
import * as ForgotPasswordActions from './ForgotPasswordActions';
import { bindActionCreators } from 'redux';
import { BASE_URL, FORGOT_PASSWORD_EMAIL,FORGOT_PASSWORD_PHONE } from '../../../Shared/Constants';
import axios from 'axios';

class ForgotPassword extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            sending: null,
            sendEmail: false,
            sendPassword: false,
            idType: 'ID',/*id or passport */
            sendVia: 'phone',
            passportNumber: '',
            phoneEmail: ''
        };
    
        this.handleEmailCheck = this.handleEmailCheck.bind(this);
        this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdentity = this.handleIdentity.bind(this);
        this.handlePassportID = this.handlePassportID.bind(this);
        this.handlePhoneOrEmail = this.handlePhoneOrEmail.bind(this);
        this.handleEmailPhone = this.handleEmailPhone.bind(this);
        
    }
    async handleSubmit(){
        console.log(this.state);
        if (this.state.sendVia === 'email'){
            const body = { 
                passportNumber: this.state.passportNumber, 
                email: this.state.phoneEmail 
            };
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_EMAIL, body);
            alert('Result: '+response.data);
            //dispatch(sendForgotSucceeded(sponse.data));
        } else if (this.state.sendVia ==='phone'){
            const body = { 
                passportNumber: this.state.passportNumber, 
                phonenumber: this.state.phoneEmail 
            };
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_PHONE, body);
            alert('Result: '+response.data);
            //dispatch(sendForgotSucceeded(response.data));
        }
        console.log(this.state);
    }
    handlePasswordCheck(event){
        this.setState({ sendPassword: event.target.checked });
        console.log(this.state);
    }
    handleEmailCheck(event){
        this.setState({ sendEmail: event.target.checked });
        console.log(this.state);
    }
    handleIdentity(event){
        this.setState({ idType: event.target.value });
        console.log(this.state);
    }
    handlePassportID(event){
        if ( this.state.idType === 'ID' ){
            this.setState({ passportNumber: event.target.value });
        } else if ( this.state.idType === 'Passport' ){
            this.setState({ passportNumber: event.target.value });
        } else {
            this.setState({ passportNumber: event.target.value });
            alert('No ID type selected');
        }
        console.log(this.state);
    }
    handleEmailPhone(event){
        this.setState({ phoneEmail: event.target.value });
        console.log(this.state);
    }
    handlePhoneOrEmail(event){
        this.setState({ sendVia: event.target.value });
        console.log(this.state);
    }

    render(){
        return (
            <div className="forgotPassword">
                <header className="headSection">
                    <img src={imgMain}/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Forgot Password</div> 
                    <div className="sendWhat">
                        <p className="send">Select what you would like us to send you</p>
                        <div className="send">
                            <input id="username" onChange={this.handleEmailCheck} checked={this.state.sendEmail} type="checkbox" className ="sendInfo"/><label htmlFor="username">Username</label>
                        </div>
                        <br/>
                        <div id="send">
                            <input id="password" onChange={this.handlePasswordCheck} checked={this.state.sendPassword} type="checkbox" className ="sendInfo"/><label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="sendWhat">
                        <p className="send">We need to Identify you before we send you the details </p>
                    </div>
           
                    <div className="sendWhat">
                        <strong className="send">Identification Type</strong>
                        <br/>
                        <select onChange={this.handleIdentity} className="send">
                            <option value ="ID">Identity</option>
                            <option value ="Passport">Passport</option>
                        </select>
                        <div className="send">
                            <label className="inp">
                                <input placeholder="&nbsp;" type="password" value={this.state.passportNumber} onChange={this.handlePassportID}/>
                                <span className="label">Enter Idenity or Passport Number</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        
                    </div>
                    <div className="sendWhat">
                        <strong id="via" className="send">Send Via</strong>
                        <br/>
                        <select onChange={this.handlePhoneOrEmail} id="belowinp" className="send">
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                        </select>
                        <div className="send">
                            <label className="inp">
                                <input placeholder="&nbsp;" value={this.state.phoneEmail} onChange={this.handleEmailPhone}/>
                                <span className="label">Enter Email or Number</span>
                                <span className="border"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="sendWhat">
                        <button id="btnSend" onClick={this.handleSubmit} >Send</button>
                    </div> 
                </div>
            </div>
        );
        
    }
    
}/*
ForgotPassword.propTypes = {
    forgotPasswordState: PropTypes.shape({
        sending: PropTypes.bool,
        sendEmail: PropTypes.bool,
        sendPassword: PropTypes.bool,
        idType: PropTypes.string,/*id or passport 
        sendVia: PropTypes.string,
        passportNumber: PropTypes.string,
        phoneEmail: PropTypes.string
    }),
    ForgotPasswordActions:  PropTypes.shape({
        sendForgotDetails: PropTypes.func
    })
};

const mapStateToProps = (state) => {
    return {
        forgotPasswordState: state.forgotPasswordState
    };
};
const mapActionsToProps = (dispatch) => {
    return {
        ForgotPasswordActions: bindActionCreators(ForgotPasswordActions, dispatch)
    };
};*/
export default connect()(ForgotPassword);