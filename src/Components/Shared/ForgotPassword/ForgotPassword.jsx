import React from 'react';
import { connect } from 'react-redux'; 
import 'typeface-roboto';
import './ForgotPassword.scss';
import imgMain from '../../../Assets/main.svg';
import { BASE_URL, FORGOT_PASSWORD_EMAIL,FORGOT_PASSWORD_PHONE } from '../../../Shared/Constants';
import axios from 'axios';

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
            phoneEmail: '' /*string with either phone or email */
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
        console.log(this.state);
        if (this.state.sendVia === 'email'){
            const body = { 
                passportNumber: this.state.passportNumber, 
                email: this.state.phoneEmail 
            };
            localStorage.setItem('sentTo', 'email');
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_EMAIL, body);
            alert('Result: '+response.data);
            window.location = '/forgotPasswordSuccess';
        } else if (this.state.sendVia ==='phone'){
            const body = { 
                passportNumber: this.state.passportNumber, 
                phonenumber: this.state.phoneEmail 
            };
            localStorage.setItem('sentTo', 'phone');
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_PHONE, body);
            alert('Result: '+response.data);
            window.location = '/forgotPasswordSuccess';
        }
    }
    handlePasswordCheck(event){
        this.setState({ sendPassword: event.target.checked });
        console.log(this.state);
    }
    handleEmailCheck(event){
        this.setState({ sendEmail: event.target.checked });
        console.log(this.state);
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
                            <option value ="ID">Identity</option>
                            <option value ="Passport">Passport</option>
                        </select>
                        {this.state.useID && <IdentityMethod passportNumber={this.state.passportNumber} handlePassportID={this.handlePassportID} idType="ID"/> }
                        {this.state.usePassport && <IdentityMethod passportNumber={this.state.passportNumber} handlePassportID={this.handlePassportID} idType="Passport"/> }
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
                        {this.state.sendViaPhone && <RecieveMethod phoneEmail={this.state.phoneEmail} handleEmailPhone={this.handleEmailPhone} sendVia="phone"/>}
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