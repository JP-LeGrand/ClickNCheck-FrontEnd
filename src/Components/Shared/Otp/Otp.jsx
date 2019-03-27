import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Otp.scss';
import { BASE_URL, CHECK_OTP, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import mainImg from '../../../Assets/main.svg';
import 'typeface-roboto';
import rollingImg from '../../../Assets/Rolling.svg';
import { ToastContainer, toast } from 'mdbreact';
import * as OtpActions from './OtpActions' ;
import { bindActionCreators } from '../../../../../../../Users/Kara Verster/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';
import PropTypes from 'prop-types';

class Otp extends React.PureComponent {
    constructor(props) {
        window.history.forward();
        super(props);
        /*this.state = {
            digit1: '',
            digit2: '',
            digit3: '',
            digit4: '',
            digit5: '',
            loading: false
        };
        this.handleChangeDigit1 = this.handleChangeDigit1.bind(this);
        this.handleChangeDigit2 = this.handleChangeDigit2.bind(this);
        this.handleChangeDigit3 = this.handleChangeDigit3.bind(this);
        this.handleChangeDigit4 = this.handleChangeDigit4.bind(this);
        this.handleChangeDigit5 = this.handleChangeDigit5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);*/
    }

    handleChangeDigit1(event) {
        this.props.handleChangeDigit1(event.target.value);
        //this.setState({ digit1: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit2(event) {
        this.props.handleChangeDigit2(event.target.value);
        //this.setState({ digit2: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit3(event) {
        this.props.handleChangeDigit3(event.target.value);
        //this.setState({ digit3: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit4(event) {
        this.props.handleChangeDigit4(event.target.value);
        //this.setState({ digit4: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit5(event) {
        this.props.handleChangeDigit5(event.target.value);
        //this.setState({ digit5: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let body = {
            OTP:
                this.props.digit1 +
                '' +
                this.props.digit2 +
                '' +
                this.props.digit3 +
                '' +
                this.props.digit4 +
                '' +
                this.props.digit5
        };
        //let user_otp = [ localStorage.getItem('user_id'), body.OTP ];
        this.props.submitOtp(this.props.user_id, body.OTP);
        /*this.setState({ loading: true }, () => { 
            fetch(BASE_URL + CHECK_OTP, {
                method: 'POST',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(user_otp)
            })
                .then(response => response.json())
                .then(
                    response => {
                        this.setState({
                            loading: false
                        });
                        let zero = 0;
                        let one = 1;
                        let two = 2;
                        let three = 3;
                        sessionStorage.setItem('token', response[zero]);
                        sessionStorage.setItem('user_name', response[two]);
                        sessionStorage.setItem('user_img', response[three]);
                        let id_pass_manager = localStorage.getItem('id_pass_manager');
                        localStorage.clear();
                        if (id_pass_manager === null) {
                            if (response[one] === 'recruiter') {
                                window.location = '/NewVerificationRequest';
                            } else if (response[one] === 'admin') {
                                window.location = '/admin/recuiterJopProfiles';
                            }
                        } else {
                            alert('other');
                        }
                    },
                    error => {
                        this.setState({
                            loading: false
                        });
                        toast.error('Error. Please enter the correct credentials.',{
                            autoClose: 3000
                        });
                    }
                );
        });*/
        
    }

    handleResubmit() {
        this.props.resendOtp(this.props.user_id);
        /*
        let userid = localStorage.getItem('user_id');
        fetch(BASE_URL + OTP_AUTHENTICATION, {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(userid),
        })
            .then((otp_response) => otp_response.json())
            .then(
                () => {
                    toast.success('New OTP has been sent!', {
                        autoClose : 3000
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false
                    });
                    toast.error('An error occured. Please try again later', {
                        autoClose : 3000
                    });
                }
            );*/
    }

    render() {
        //if (localStorage.getItem('user_id') !== null) {
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
                                    value={this.state.digit1}
                                    onChange={this.handleChangeDigit1}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.state.digit2}
                                    onChange={this.handleChangeDigit2}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.state.digit3}
                                    onChange={this.handleChangeDigit3}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.state.digit4}
                                    onChange={this.handleChangeDigit4}
                                />
                                <input
                                    placeholder="&nbsp;"
                                    type="number"
                                    value={this.state.digit5}
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
                            <div className="loading">
                                {this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                            </div>
                        </div>
                    </div>
                </Fragment>
                
            );
        //} else {
            //window.location = '/login';
        //}
    }
}

Otp.propTypes = {
    digit1: PropTypes.string,
    digit2: PropTypes.string,
    digit3: PropTypes.string,
    digit4: PropTypes.string,
    digit5: PropTypes.string,
    loading: PropTypes.bool,
    user_id: PropTypes.string,
    handleChangeDigit1: PropTypes.func.isRequired,
    handleChangeDigit2: PropTypes.func.isRequired,
    handleChangeDigit3: PropTypes.func.isRequired,
    handleChangeDigit4: PropTypes.func.isRequired,
    handleChangeDigit5: PropTypes.func.isRequired,
    submitOtp: PropTypes.func.isRequired,
    resendOtp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    digit1: state.otpState.digit1,
    digit2: state.otpState.digit2,
    digit3: state.otpState.digit3,
    digit4: state.otpState.digit4,
    digit5: state.otpState.digit5,
    loading: state.otpState.loading,
    user_id: state.otpState.user_id
});

const mapActionsToProps = (dispatch) => ({
    handleChangeDigit1: bindActionCreators(OtpActions.handleChangeDigit1, dispatch),
    handleChangeDigit2: bindActionCreators(OtpActions.handleChangeDigit2, dispatch),
    handleChangeDigit3: bindActionCreators(OtpActions.handleChangeDigit3, dispatch),
    handleChangeDigit4: bindActionCreators(OtpActions.handleChangeDigit4, dispatch),
    handleChangeDigit5: bindActionCreators(OtpActions.handleChangeDigit5, dispatch),
    submitOtp: bindActionCreators(OtpActions.submitOtp, dispatch),
    resendOtp: bindActionCreators(OtpActions.resendOtp, dispatch)
});
export default connect(mapStateToProps, mapActionsToProps)(Otp);