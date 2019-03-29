import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import imgMain from '../../../Assets/main.svg';
import { ChangePasswordConstrants } from './ChangePasswordConstants';
import { BASE_URL, CHANGE_PASSWORD, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import passImg from '../../../Assets/password.svg';
import rollingImg from '../../../Assets/Rolling.svg';
import { bindActionCreators } from 'redux';
import * as ChangePasswordActions from './ChangePasswordActions';
import { throws } from 'assert';
import { ALPN_ENABLED } from 'constants';
import ReactAI from 'react-appinsights';

class ChangePassword extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: false
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.validatePasswordMatch = this.validatePasswordMatch.bind(this);
    }
    
    validate = (e) => {
        let password = e.target.value;
        let capsCount, smallCount, numberCount, symbolCount;
        if (password.length < ChangePasswordConstrants.MinPassLenght) {
            this.props.updateErrorMessage('password must be min 8 characters');
        } else {
            capsCount = (password.match(/[A-Z]/g) || []).length;
            smallCount = (password.match(/[a-z]/g) || []).length;
            numberCount = (password.match(/[0-9]/g) || []).length;
            symbolCount = (password.match(/\W/g) || []).length;
            if (capsCount < ChangePasswordConstrants.MinCapsCount) {
                this.props.updateErrorMessage('your password must contain atleast one uppercaps character');
                this.props.updatepasswordsValid(false);
                return;
            } else if (smallCount < ChangePasswordConstrants.MinSmallCount) {
                this.props.updateErrorMessage('your password must contain atleast one lowercase character');
                this.props.updatepasswordsValid(false);
                return;
            } else if (numberCount < ChangePasswordConstrants.MinNumberCount) {
                this.props.updateErrorMessage('your password must contain atleast one digit');
                this.props.updatepasswordsValid(false);
                return;
            } else if (symbolCount < ChangePasswordConstrants.MinSpecialCount) {
                this.props.updateErrorMessage('your password must contain atleast one special character');
                this.props.updatepasswordsValid(false);
                return;
            } else {
                this.props.updatepasswordsValid(true);
                this.props.updateErrorMessage('');
            }
        }
    }

    validatePasswordMatch = (e) =>{
        this.props.updateConfirmedPassword(e.target.value);
        let confirmPassword = e.target.value;
        if (confirmPassword === this.props.password){
            if (confirmPassword === this.props.password){
                this.props.updatePasswordsMatch(true);
                this.props.updateErrorMessage('');
            } else {
                this.props.updatePasswordsMatch(false);
            }
        }
        else{
            this.props.updateErrorMessage('Passwords do not match');
        }
    }
    
    handlePasswordChange = (e) => {
        this.validate(e);
        this.props.updatePassword(e.target.value);
    }
      
    handleConfirmChange = (e) =>{
        this.validatePasswordMatch(e);
        this.props.updateConfirmedPassword(e.target.value);
    }

    handleSubmit(event){
        this.setState({ buttonClicked: true });
        this.props.updateErrorMessage('true');
        this.props.sendPasswordReset(this.props.password);
    }

    render(){
        return (
            <div className="changePassword">
                <header className="headSection">
                    <img src={imgMain} alt="Company Logo"/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Change Password</div>
                    <div className="sendWhat">
                        <label className="passwordSpecDiv">
                              Password Requirements:
                            <ul>
                                <li>A minimum of 8 characters</li>
                                <li>Must contain a special character</li>
                                <li>Must contain a Number</li>
                                <li>Must contain a Caps</li>
                            </ul>
                        </label>
                        <div className="form-group">
                            <img src={passImg} alt="Lock"/>
                            <label className="inp">
                                <input type="password" onChange={this.handlePasswordChange} placeholder="&nbsp;"/>
                                <span className="label">Password</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        <div className="form-group">
                            <img src={passImg} alt="Lock"/>
                            <label className="inp">
                                <input type="password" onChange={this.handleConfirmChange} placeholder="&nbsp;"/>
                                <span className="label">Confirm Password</span>
                                <span className="border"></span>
                                <label className="error">
                                    {!this.state.buttonClicked && this.props.errorMessage}
                                </label>
                            </label>
                        </div>
                        <div className="form-group">
                            <button id="btnSend" onClick={this.handleSubmit} disabled={!(this.props.passwordsValid && this.props.passwordsMatch) }>Send</button>
                        </div>
                    </div><br/>
                    <div style={{ color: 'red' }}>
                        { this.props.fetchError === '' ? ' ' : this.props.fetchError }
                    </div>
                    <div className="loading" style={{ color: 'red' }}>
                        {this.props.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                    </div>
                </div>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    sendPasswordReset: PropTypes.func.isRequired,
    updatePasswordsMatch: PropTypes.func.isRequired,
    updatepasswordsValid: PropTypes.func.isRequired,
    updateConfirmedPassword: PropTypes.func.isRequired,
    updateLoading: PropTypes.func.isRequired,
    updateErrorMessage: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmed: PropTypes.string.isRequired,
    passwordMatchMessage: PropTypes.string.isRequired,
    canSubmit: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    passwordsValid: PropTypes.bool.isRequired,
    passwordsMatch: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    fetchError: PropTypes.string.isRequired
    
};

const mapStateToProps = state => ({
    password: state.changePasswordState.password,
    confirmpassword: state.changePasswordState.confirmPassword,
    errorMessage: state.changePasswordState.errorMessage,
    passwordMatchMessage: state.changePasswordState.passwordMatchMessage,
    canSubmit:state.changePasswordState.canSubmit,
    loading: state.changePasswordState.loading,
    passwordsMatch: state.changePasswordState.passwordsMatch,
    passwordsValid: state.changePasswordState.passwordsValid,
    fetchError: state.changePasswordState.fetchError
});

const mapActionsToProps = (dispatch) => ({
    updatePassword: bindActionCreators(ChangePasswordActions.updatePassword, dispatch),
    updateConfirmedPassword: bindActionCreators(ChangePasswordActions.updateConfirmedPassword, dispatch),
    updateLoading: bindActionCreators(ChangePasswordActions.updateLoading, dispatch),
    updateErrorMessage: bindActionCreators(ChangePasswordActions.updateErrorMessage, dispatch),
    updatepasswordsValid: bindActionCreators(ChangePasswordActions.updatePasswordsValid, dispatch),
    updatePasswordsMatch: bindActionCreators(ChangePasswordActions.updatePasswordsMatch, dispatch),
    sendPasswordReset: bindActionCreators(ChangePasswordActions.sendPasswordReset, dispatch),
    updateFetchError: bindActionCreators(ChangePasswordActions.updateFetchError, dispatch)
});

export default ReactAI.withTracking(connect(mapStateToProps, mapActionsToProps)(ChangePassword));