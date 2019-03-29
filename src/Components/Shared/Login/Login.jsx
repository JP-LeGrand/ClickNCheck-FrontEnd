import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import 'typeface-roboto';
import './Login.scss';
import mainImg from '../../../Assets/main.svg';
import userImg from '../../../Assets/user.svg';
import passImg from '../../../Assets/password.svg';
import rollingImg from '../../../Assets/Rolling.svg';
import * as LoginActions from './LoginActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ToolbarSeparator } from 'material-ui';

class Login extends React.PureComponent {
    constructor(props) {
        if (localStorage.getItem('user_id') !== null) {
            window.history.forward();
        }
        super(props);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowHide = this.handleShowHide.bind(this);
        this.displayError = this.displayError.bind(this);
    }
    
    displayError(error){
        switch (error) {
        case 'wrongCredentials':
            return 'Login failed. Please check your credentials and try again';
        case 'passExpired':
            return 'The system encountered an error. Please try again later';
        case 'noInput':
            return 'Please fill in all details on the form';
        default:
            return '';
        }
    }

    handleChangeEmail(event) {
        this.props.updateEmail(event.target.value);
    }

    handleChangePass(event) {
        this.props.updatePassword(event.target.value);
    }

    handleShowHide() {
        if (this.props.isPasswordVisible === true) {
            this.props.togglePasswordVisibility(!this.props.isPasswordVisible);
            this.props.updateInputType('password');
        } else {
            this.props.togglePasswordVisibility(!this.props.isPasswordVisible);
            this.props.updateInputType('text');
        }
        
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.toggleLoading(true);
        if (this.props.email.length < 1 || this.props.password < 1){
            this.props.toggleLoading(false);
            this.props.updateError('noInput');
            return;
        }
        this.props.loginProcess(this.props.email, this.props.password);
    } 
    
    render() {
        return (
            <div className="login">  
                <header className="headSection">
                    <img src={mainImg}/>
                </header>
                <div className="mainSection">
                    <div className="loginHeading"><b>Sign In</b></div>
                    <form onSubmit={this.handleSubmit}> 
                        <div className="form-group">
                            <img src={userImg}/>
                            <label className="inp">
                                <input placeholder="&nbsp;" name="email" value ={this.props.email} onChange={this.handleChangeEmail} />
                                <span className="label">Email</span>
                                <span className="border"></span>
                            </label>
                        </div>

                        <div className="form-group">
                            <img src={passImg}/>
                            <label className="inp">
                                <input placeholder="&nbsp;" type={this.props.inputType} name="password" value ={this.props.password} onChange={this.handleChangePass} />
                                <span className="label">Enter Password</span>
                                <span className="border"></span>
                                <span className="showHide" onClick={this.handleShowHide}>{this.props.isPasswordVisible ? 'Hide' : 'Show'}</span>
                            </label>
                            
                            <p>
                                <a href="/forgotPassword">Forgot Password?</a>
                            </p>
                        </div> 

                        <div id="btnDiv" className="form-group">
                            <button onClick={this.handleSubmit}>Login</button>
                        </div> 
                    </form>
                    <div style={{ display: this.props.error == '' ? 'none' : 'block', color: 'red' }}>
                        {this.displayError(this.props.error)}
                    </div>
                    <div className="logginIn">
                        {this.props.isLoading && <img src={rollingImg} id="spinner" alt="loading..." />}
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginProcess: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    updateError: PropTypes.func.isRequired,
    togglePasswordVisibility: PropTypes.func.isRequired,
    updateInputType: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loginStatus: PropTypes.string.isRequired,
    isPasswordVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    inputType: PropTypes.string.isRequired,
    fetchStatus: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    email: state.loginState.email,
    password: state.loginState.password,
    loginStatus: state.loginState.loginStatus,
    isPasswordVisible: state.loginState.isPasswordVisible,
    fetchStatus: state.loginState.fetchStatus,
    inputType: state.loginState.inputType,
    isLoading: state.loginState.isLoading,
    error: state.loginState.error
});

const mapActionsToProps = (dispatch) => ({
    loginProcess: bindActionCreators(LoginActions.loginProcess, dispatch),
    updateEmail: bindActionCreators(LoginActions.updateEmail, dispatch),
    updatePassword: bindActionCreators(LoginActions.updatePassword, dispatch),
    togglePasswordVisibility: bindActionCreators(LoginActions.togglePasswordVisibility, dispatch),
    updateInputType: bindActionCreators(LoginActions.updateInputType, dispatch),
    toggleLoading: bindActionCreators(LoginActions.toggleLoading, dispatch),
    updateError: bindActionCreators(LoginActions.updateError, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(Login);