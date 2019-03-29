import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Otp.scss';
import { BASE_URL, CHECK_OTP, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import mainImg from '../../../Assets/main.svg';
import 'typeface-roboto';
import rollingImg from '../../../Assets/Rolling.svg';
import { ToastContainer, toast } from 'mdbreact';
import * as OtpActions from './OtpActions' ;
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactAI from 'react-appinsights';

class Otp extends React.PureComponent {
    constructor(props) {
        window.history.forward();
        super(props);
        this.handleChangeDigit1 = this.handleChangeDigit1.bind(this);
        this.handleChangeDigit2 = this.handleChangeDigit2.bind(this);
        this.handleChangeDigit3 = this.handleChangeDigit3.bind(this);
        this.handleChangeDigit4 = this.handleChangeDigit4.bind(this);
        this.handleChangeDigit5 = this.handleChangeDigit5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResubmit = this.handleResubmit.bind(this);
    }

    componentDidMount() {
        this.props.assignUserId(localStorage.getItem('user_id'));
    }

    handleChangeDigit1(event) {
        this.props.handleChangeDigit1(event.target.value);
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit2(event) {
        this.props.handleChangeDigit2(event.target.value);
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        } else {
            event.target.previousSibling.focus();
        }
    }

    handleChangeDigit3(event) {
        this.props.handleChangeDigit3(event.target.value);
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        } else {
            event.target.previousSibling.focus();
        }
    }

    handleChangeDigit4(event) {
        this.props.handleChangeDigit4(event.target.value);
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        } else {
            event.target.previousSibling.focus();
        }
    }

    handleChangeDigit5(event) {
        this.props.handleChangeDigit5(event.target.value);
        if ( event.target.value === '' ) {
            event.target.previousSibling.focus();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let otp = ''+this.props.digit1 +this.props.digit2 +this.props.digit3 + this.props.digit4 + this.props.digit5;
        
        this.props.submitOtp(this.props.user_id, otp);
        
    }

    handleResubmit() {
        this.props.resendOtp(this.props.user_id);
    }

    render() {
        if (localStorage.getItem('user_id') !== null) {
            return (
                <Fragment>
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={5000}
                    />
                    <div className="otp">
                        <header className="headSection">
                            <img src={mainImg} />
                        </header>

                        <div className="mainSection">
                            <div className="registrationHeading">
                            Enter the One-Time Pin sent to you
                            </div>

                            <div className="form-group">
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.props.digit1}
                                    onChange={this.handleChangeDigit1}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.props.digit2}
                                    onChange={this.handleChangeDigit2}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.props.digit3}
                                    onChange={this.handleChangeDigit3}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.props.digit4}
                                    onChange={this.handleChangeDigit4}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.props.digit5}
                                    onChange={this.handleChangeDigit5}
                                />
                            </div>
                            <br />
                            <br />
                            <div className="form-group">
                                <button onClick={this.handleSubmit}>SUBMIT</button>
                                <p>
                                    <a id="resend" href="#" onClick={this.handleResubmit}> Resend </a>{' '} or need{' '} <a id="help" href="mailto:clickncheckservice@gmail.com?subject=Not Receiving OTP!"> Help?
                                    </a>
                                </p>
                            </div>
                            {(!this.props.digit1 || !this.props.digit2 || !this.props.digit3 || !this.props.digit4 || !this.props.digit5) && this.props.clicked && <p className="error">Make sure all 5 digits have been entered</p>}
                            {this.props.error && <p className="error">{this.props.error}</p>}
                            <div className="loading">
                                {this.props.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                            </div>
                        </div>
                    </div>
                </Fragment>  
            );
        } else {
            window.location = '/login';
        }
    }
}

Otp.propTypes = {
    digit1: PropTypes.number,
    digit2: PropTypes.number,
    digit3: PropTypes.number,
    digit4: PropTypes.number,
    digit5: PropTypes.number,
    loading: PropTypes.bool,
    clicked: PropTypes.bool,
    user_id: PropTypes.string,
    error: PropTypes.string,
    handleChangeDigit1: PropTypes.func.isRequired,
    handleChangeDigit2: PropTypes.func.isRequired,
    handleChangeDigit3: PropTypes.func.isRequired,
    handleChangeDigit4: PropTypes.func.isRequired,
    handleChangeDigit5: PropTypes.func.isRequired,
    submitOtp: PropTypes.func.isRequired,
    resendOtp: PropTypes.func.isRequired,
    assignUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    digit1: state.otpState.digit1,
    digit2: state.otpState.digit2,
    digit3: state.otpState.digit3,
    digit4: state.otpState.digit4,
    digit5: state.otpState.digit5,
    loading: state.otpState.loading,
    clicked: state.otpState.clicked,
    user_id: state.otpState.user_id,
    error: state.otpState.error
});

const mapActionsToProps = (dispatch) => ({
    handleChangeDigit1: bindActionCreators(OtpActions.handleChangeDigit1, dispatch),
    handleChangeDigit2: bindActionCreators(OtpActions.handleChangeDigit2, dispatch),
    handleChangeDigit3: bindActionCreators(OtpActions.handleChangeDigit3, dispatch),
    handleChangeDigit4: bindActionCreators(OtpActions.handleChangeDigit4, dispatch),
    handleChangeDigit5: bindActionCreators(OtpActions.handleChangeDigit5, dispatch),
    submitOtp: bindActionCreators(OtpActions.submitOtp, dispatch),
    resendOtp: bindActionCreators(OtpActions.resendOtp, dispatch),
    assignUserId: bindActionCreators(OtpActions.assignUserId, dispatch)
});
export default ReactAI.withTracking(connect(mapStateToProps, mapActionsToProps)(Otp));