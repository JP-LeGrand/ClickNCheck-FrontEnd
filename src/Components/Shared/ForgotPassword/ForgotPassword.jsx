import React from 'react';
import { connect } from 'react-redux'; 
import 'typeface-roboto';
import './ForgotPassword.scss';
import imgMain from '../../../Assets/main.svg';
import Footer from '../Footer/Footer';
import rollingImg from '../../../Assets/Rolling.svg';
import { ZERO, ONE, TEN } from '../../../Shared/IntConstants';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as ForgotPasswordActions from './ForgotPasswordActions';

function RecieveMethod(props){
    if (props.sendVia === 'phone') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.phoneEmail} maxLength={'10'} onChange={props.handleEmailPhone}/>
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
                    <input placeholder="&nbsp;" value={props.passportNumber} maxLength={'13'} onChange={props.processIdentification}/>
                    <span className="label">Enter ID Number</span>
                    <span className="border"></span>
                </label>
            </div>
        );
    } else if (props.idType === 'Passport') {
        return ( 
            <div className="send">
                <label className="inp">
                    <input placeholder="&nbsp;" value={props.passportNumber} onChange={props.processIdentification}/>
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIDorPassport = this.handleIDorPassport.bind(this);
        this.processIdentification = this.processIdentification.bind(this);
        this.handlePhoneOrEmail = this.handlePhoneOrEmail.bind(this);
        this.handleEmailPhone = this.handleEmailPhone.bind(this);
        this.render = this.render.bind(this);
        this.displayError = this.displayError.bind(this);
        
    }

    displayError(error){
        switch (error) {
        case 'failedPost':
            return 'Password change failed. Please check your details and try again';
        case 'wrongCredentials':
            return 'Password change failed. Please check your details and try again';
        default:
            return '';
        }
    }
    componentDidMount(){
        this.props.updateMessengerValidity(true);
        this.props.updateIdentificationValidity(true);
    }

    handleSubmit(){
        if (this.props.emailOrSMS && this.props.validMessenger){
            const body = { 
                passportNumber: this.props.identification, 
                email: this.props.messenger 
            };
            if (this.props.validIdentification) {
                this.props.sendPasswordReset(body, this.props.emailOrSMS);
            } else {
                this.props.updateError('wrongCredentials');
            }
            
        } else if (!this.props.emailOrSMS && this.props.validMessenger) {               
            //TODO Show that phone number isnt supported at the moment            
        } else {
            this.props.updateError('wrongCredentials');
        }
    }

    handleIDorPassport(event){
        this.props.updateIdentificationValidity(false);
        if (event.target.value === 'ID'){
            this.props.updatePassportOrID(true);
            this.props.updateIdentitySelected(true);
        } else if (event.target.value === 'Passport'){
            this.props.updatePassportOrID(false);
            this.props.updateIdentitySelected(true);
        } else {
            this.props.updateIdentitySelected(false);
        }
    }

    processIdentification(event) {
        this.props.updateIdentification(event.target.value);
        let value = event.target.value;
        if ( this.props.passportOrID){
            const ID_CHARS = 13;
            if (this.props.passportOrID && value.length === ID_CHARS && value.match(/[0-9]{13}/)) {
                this.props.updateIdentificationValidity(true);
            } else {
                this.props.updateIdentificationValidity(false);
            }
        } else {
            if (this.props.identification.match(/^[A-Za-z0-9]+$/)) {
                this.props.updateIdentificationValidity(true);
            } else {
                this.props.updateIdentificationValidity(false);
            }
        }
    }
    handleEmailPhone(event) {
        this.props.updateMessenger(event.target.value);
        if (this.props.emailOrSMS) {
            this.props.updateMessengerValidity(this.props.messenger.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/));
            this.props.updateMessengerSelected(true);
        } else {
            if (this.props.messenger.charAt(ZERO) === '0' && this.props.messenger.length === TEN && this.props.messenger.match(/[0-9]{10}/)) {
                this.props.updateMessengerValidity(true);
                this.props.updateMessengerSelected(true);
            } else {
                this.props.updateMessengerValidity(false);
            }
        }
    }
    handlePhoneOrEmail(event) {
        this.props.updateMessengerValidity(false);
        if (event.target.value === 'phone') {
            this.props.updateEmailOrSMS(false);
            this.props.updateMessengerSelected(true);
        } else if (event.target.value === 'email') {
            this.props.updateEmailOrSMS(true);
            this.props.updateMessengerSelected(true);
        } else { 
            this.props.updateMessengerSelected(false);
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
                    <div id="idHead" className="sendWhat">
                        <p className="send sub">We need to Identify you before we send you the details </p>
                    </div>
           
                    <div className="sendWhat">
                        <strong className="send bold">Identification Type</strong>
                        <br/>
                        <select className="selectHead send" onChange={this.handleIDorPassport} >
                            <option className="selectHead" value="" >please select</option>
                            <option className="selectOption" value ="ID">SA ID</option>
                            <option className="selectOption" value ="Passport">Passport</option>
                        </select>
                        {this.props.identitySelected && (this.props.passportOrID ? <IdentityMethod passportNumber={this.props.identification} processIdentification={this.processIdentification} idType="ID"/> : <IdentityMethod passportNumber={this.props.identification} processIdentification={this.processIdentification} idType="Passport" />)}
                        {!this.props.validIdentification && (this.props.passportOrID ? <p className="send error">Invalid ID Number</p> : <p className="send error">Invalid Passport Number</p>)}
                    </div>
                    <div className="sendWhat">
                        <strong id="via" className="send bold">Send Via</strong>
                        <br/>
                        <select className="selectHead send" onChange={this.handlePhoneOrEmail} id="belowinp">
                            <option className="selectHead" value="" >please select</option>
                            <option className="selectOption" value="phone">Phone</option>
                            <option className="selectOption" value="email">Email</option>
                        </select>
                        
                        {this.props.messengerSelected && (this.props.emailOrSMS ? <RecieveMethod phoneEmail={this.props.messenger} handleEmailPhone={this.handleEmailPhone} sendVia="email"/> : <RecieveMethod phoneEmail={this.props.messenger} handleEmailPhone={this.handleEmailPhone} sendVia="phone" />)}
                        {!this.props.validMessenger && (this.props.emailOrSMS ? <p className="send error">Invalid Email</p> : <p className="send error">Invalid Phone Number</p>)}
                    </div>
                    
                    <div className="sendWhat">
                        <button id="btnSend" onClick={this.handleSubmit} >Send</button>
                    </div> 
                    <div className="loading">
                        {this.props.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                    </div>
                    <div style={{ display: this.props.error == '' ? 'none' : 'inline-block', color: 'red', textAlign: 'center', marginLeft: '50px' }}>
                        <br />{this.displayError(this.props.error)}
                    </div>
                </div>
                <Footer />
            </div>
        );
        
    }
    
}

ForgotPassword.propTypes = {
    sendPasswordReset: PropTypes.func.isRequired,
    updateIdentification: PropTypes.func.isRequired,
    updateMessenger: PropTypes.func.isRequired,
    updateIdentificationValidity: PropTypes.func.isRequired,
    updateMessengerValidity: PropTypes.func.isRequired,
    updateError: PropTypes.func.isRequired,
    updateEmailOrSMS: PropTypes.func.isRequired,
    updateIdentitySelected: PropTypes.func.isRequired,
    updateMessengerSelected: PropTypes.func.isRequired,
    updatePassportOrID: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    validIdentification: PropTypes.bool.isRequired,
    validMessenger: PropTypes.bool.isRequired,
    emailOrSMS: PropTypes.bool.isRequired,
    passportOrID: PropTypes.bool.isRequired,
    identitySelected: PropTypes.bool.isRequired,
    messengerSelected: PropTypes.bool.isRequired,
    messenger: PropTypes.string.isRequired,
    identification: PropTypes.string.isRequired,
    sendPassword: PropTypes.bool.isRequired,
    messageSent: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    loading: state.forgotPasswordState.loading,
    validMessenger: state.forgotPasswordState.validMessenger,
    validIdentification: state.forgotPasswordState.validIdentification,
    emailOrSMS: state.forgotPasswordState.emailOrSMS,
    passportOrID: state.forgotPasswordState.passportOrID,
    identitySelected: state.forgotPasswordState.identitySelected,
    messengerSelected: state.forgotPasswordState.messengerSelected,
    identification: state.forgotPasswordState.identification,
    messenger: state.forgotPasswordState.messenger,
    sendPassword: state.forgotPasswordState.sendPassword,
    messageSent: state.forgotPasswordState.messageSent,
    error: state.forgotPasswordState.error
});

const mapActionsToProps = (dispatch) => ({
    sendPasswordReset: bindActionCreators(ForgotPasswordActions.sendPasswordReset, dispatch),
    updateIdentification: bindActionCreators(ForgotPasswordActions.updateIdentification, dispatch),
    updateEmailOrSMS: bindActionCreators(ForgotPasswordActions.updateEmailOrSMS, dispatch),
    updateIdentificationValidity: bindActionCreators(ForgotPasswordActions.updateIdentificationValidity, dispatch),
    updateMessengerValidity: bindActionCreators(ForgotPasswordActions.updateMessengerValidity, dispatch),
    updateMessenger: bindActionCreators(ForgotPasswordActions.updateMessenger, dispatch),
    updateIdentitySelected: bindActionCreators(ForgotPasswordActions.updateIdentitySelected, dispatch),
    updateMessengerSelected: bindActionCreators(ForgotPasswordActions.updateMessengerSelected, dispatch),
    updatePassportOrID: bindActionCreators(ForgotPasswordActions.updatePassportOrID, dispatch),
    updateError: bindActionCreators(ForgotPasswordActions.updateError, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);