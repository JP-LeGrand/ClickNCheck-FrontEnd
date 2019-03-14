import React from 'react';
import { connect } from 'react-redux'; 
import 'typeface-roboto';
import './ForgotPassword.scss';
import imgMain from '../../../Assets/main.svg';
import { BASE_URL, FORGOT_PASSWORD_EMAIL,FORGOT_PASSWORD_PHONE } from '../../../Shared/Constants';
import axios from 'axios';
import Footer from '../Footer/Footer';
import FooterPreviousNext from '../FooterPreviousNext/FooterPreviousNext';
function RecieveMethod(props){
    if (props.sendVia === 'phone') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.phoneEmail} onChange={props.handleEmailPhone}/>
                    <span className="label">Enter Phone Number</span>
                    <span className="border"></span>
                </label>
            </div>
        );
    } else if (props.sendVia === 'email') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.phoneEmail} onChange={props.handleEmailPhone}/>
                    <span className="label">Enter Email</span>
                    <span className="border"></span>
                </label>
            </div>
        );
    } else {
        return <p className="send">No option selected</p>;
    }
}

function IdentityMethod(props){
    if (props.idType === 'ID') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.passportNumber} onChange={props.handlePassportID}/>
                    <span className="label">Enter ID Number</span>
                    <span className="border"></span>
                </label>
            </div>
        );
    } else if (props.idType === 'Passport') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.passportNumber} onChange={props.handlePassportID}/>
                    <span className="label">Enter Passport Number</span>
                    <span className="border"></span>
                </label>
            </div>
        );
    } else {
        return <div><p className="send">No option selected</p> <br/></div>;
    }
}

class ForgotPassword extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            sending: null,
            sendEmail: false,
            sendPassword: false,
            idType: '',/*id or passport */
            useID: false,
            usePassport: false,
            sendVia: '',/*email or phone sms */
            sendViaPhone: false,
            sendViaEmail: false,
            passportNumber: '', /*string with either id or passport */
            phoneEmail: '', /*string with either phone or email */
            validEmail: null,
            validID: null,
            validPassport: null,
            validPhone: null
        };

        this.handleEmailCheck = this.handleEmailCheck.bind(this);
        this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIDorPassprt = this.handleIDorPassprt.bind(this);
        this.handlePassportID = this.handlePassportID.bind(this);
        this.handlePhoneOrEmail = this.handlePhoneOrEmail.bind(this);
        this.handleEmailPhone = this.handleEmailPhone.bind(this);
        this.render = this.render.bind(this);
        
    }

    async handleSubmit(){
        if (this.state.sendVia === 'email' && this.state.validEmail){
            const body = { 
                passportNumber: this.state.passportNumber, 
                email: this.state.phoneEmail 
            };
            if (this.state.useID && this.state.validID) {
                await axios.post(BASE_URL + FORGOT_PASSWORD_EMAIL, body)
                    .then(function () {
                        alert('Forgot password request succesfully sent to email');
                        localStorage.setItem('sentTo', 'email');
                        window.location = '/forgotPasswordSuccess';
                    })
                    .catch(function (error) {
                        alert('Oops something went wrong' + error);
                    });
            } else if (this.state.usePassport && this.state.validPassport) {
                await axios.post(BASE_URL + FORGOT_PASSWORD_EMAIL, body)
                    .then(function () {
                        alert('Forgot password request succesfully sent to email');
                        localStorage.setItem('sentTo', 'email');
                        window.location = '/forgotPasswordSuccess';
                    })
                    .catch(function (error) {
                        alert('Oops something went wrong' + error);
                    });
            } else {
                alert('Passport or ID is invalid');
            }
            
        } else if (this.state.sendVia === 'phone' && this.state.validPhone){
            const body = { 
                passportNumber: this.state.passportNumber, 
                phonenumber: this.state.phoneEmail 
            };
            if (this.state.useID && this.state.validID) {
                await axios.post(BASE_URL + FORGOT_PASSWORD_PHONE, body)
                    .then(function () {
                        alert('Forgot password request succesfully sent to phone number');
                        localStorage.setItem('sentTo', 'phone');
                        window.location = '/forgotPasswordSuccess';
                    })
                    .catch(function (error) {
                        alert('Oops something went wrong' + error);
                    });
            } else if (this.state.usePassport && this.state.validPassport) {
                await axios.post(BASE_URL + FORGOT_PASSWORD_PHONE, body)
                    .then(function () {
                        alert('Forgot password request succesfully sent to phone number');
                        localStorage.setItem('sentTo', 'phone');
                        window.location = '/forgotPasswordSuccess';
                    })
                    .catch(function (error) {
                        alert('Oops something went wrong' + error);
                    });
            } else {
                alert('Passport or ID is invalid');
            }
            
        } else {
            alert('Email or Phone Number is invalid');
        }
    }
    handlePasswordCheck(event){
        this.setState({ sendPassword: event.target.checked });
    }
    handleEmailCheck(event){
        this.setState({ sendEmail: event.target.checked });
    }
    handleIDorPassprt(event){
        this.setState({ idType: event.target.value });
        if (event.target.value === 'ID'){
            this.setState({
                usePassport: false,
                useID:true 
            });
        } else if (event.target.value === 'Passport') {
            this.setState({
                usePassport: true,
                useID:false 
            });
        } else {
            this.setState({
                usePassport: false,
                useID:false 
            });
        }
    }
    handlePassportID(event) {
        this.setState({ passportNumber: event.target.value });
        const checkPassportID = event.target.value;
        if ( this.state.idType === 'ID' ){
            const ID_CHARS = 13;
            if (this.state.useID && checkPassportID.length === ID_CHARS && checkPassportID.match(/[0-9]{13}/)) {
                this.setState({
                    validID: true
                });
            } else {
                this.setState({
                    validID: false
                });
            }
        } else if ( this.state.idType === 'Passport' ){
            if (this.state.usePassport && checkPassportID.match(/^[A-Za-z0-9]+$/)) {
                this.setState({
                    validPassport: true
                });
            } else {
                this.setState({
                    validPassport: false
                });
            }
        }
    }
    handleEmailPhone(event) {
        const checkPhoneEmail = event.target.value;
        this.setState({ phoneEmail: event.target.value });
        
        if (this.state.sendViaEmail) {
            const emailValid = checkPhoneEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            this.setState({
                validEmail: emailValid
            });
        } else if (this.state.sendViaPhone) {
            const LOCAL_NUMBER = 10;
            const INTERNATIONAL = 12;
            const ZERO = '0';
            const INT_ZERO = 0;
            const PLUS = '+';
            if (checkPhoneEmail.charAt(INT_ZERO) === ZERO && checkPhoneEmail.length === LOCAL_NUMBER && checkPhoneEmail.match(/[0-9]{10}/)) {
                console.log('phone number passed: ' + checkPhoneEmail.charAt(INT_ZERO));
                this.setState({
                    validPhone: true
                });
            } else if (checkPhoneEmail.charAt(INT_ZERO) === PLUS && checkPhoneEmail.length === INTERNATIONAL && checkPhoneEmail.match(/[+][0-9]{11}/)) {
                this.setState({
                    validPhone: true
                });
            } else {
                this.setState({
                    validPhone: false
                });
            }
        }
    }
    handlePhoneOrEmail(event) {
        this.setState({ sendVia: event.target.value });
        if (event.target.value === 'phone'){
            this.setState({
                sendViaEmail: false,
                sendViaPhone:true 
            });
        } else if (event.target.value === 'email') {
            this.setState({
                sendViaEmail: true,
                sendViaPhone:false 
            });
        } else {
            this.setState({
                sendViaEmail: false,
                sendViaPhone: false 
            });
        }
    }
    
    render(){
        return (
            <div className="forgotPassword">
                <header className="headSection">
                    <img src={imgMain}/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Forgot Password</div> 
                    <div id="checkSection" className="sendWhat">
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
                        <select onChange={this.handleIDorPassprt} className="send">
                            <option value="" >Type of Identity</option>
                            <option value ="ID">SA ID</option>
                            <option value ="Passport">Passport</option>
                        </select>
                        {this.state.useID && <IdentityMethod passportNumber={this.state.passportNumber} handlePassportID={this.handlePassportID} idType="ID"/> }
                        {this.state.usePassport && <IdentityMethod passportNumber={this.state.passportNumber} handlePassportID={this.handlePassportID} idType="Passport" />}
                        {!this.state.validPassport && this.state.usePassport && <p className="send error">Invalid Passport Number</p>}
                        {!this.state.validID && this.state.useID && <p className="send error">Invalid ID Number</p>}
                    </div>
                    <div className="sendWhat">
                        <strong id="via" className="send">Send Via</strong>
                        <br/>
                        <select onChange={this.handlePhoneOrEmail} id="belowinp" className="send">
                            <option value="" >Receive Notification from</option>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                        </select>
                        
                        {this.state.sendViaEmail && <RecieveMethod phoneEmail={this.state.phoneEmail}handleEmailPhone={this.handleEmailPhone} sendVia="email"/> }
                        {this.state.sendViaPhone && <RecieveMethod phoneEmail={this.state.phoneEmail} handleEmailPhone={this.handleEmailPhone} sendVia="phone" />}
                        {!this.state.validEmail && this.state.sendViaEmail && <p className="send error">Invalid Email</p>}
                        {!this.state.validPhone && this.state.sendViaPhone && <p className="send error">Invalid Phone Number</p>}
                    </div>
                    
                    <div className="sendWhat">
                        <button id="btnSend" onClick={this.handleSubmit} >Send</button>
                    </div> 
                </div>
            </div>
        );
        
    }
    
}

export default connect()(ForgotPassword);