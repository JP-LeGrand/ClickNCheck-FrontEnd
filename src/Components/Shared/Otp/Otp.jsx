import React from 'react';
import { connect } from 'react-redux';
import './Otp.scss';
import { BASE_URL, CHECK_OTP, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import mainImg from '../../../Assets/main.svg';
import 'typeface-roboto';

class Otp extends React.PureComponent {
    constructor(props) {
        window.history.forward();
        super(props);
        this.state = {
            digit1: '',
            digit2: '',
            digit3: '',
            digit4: '',
            digit5: ''
        };

        this.handleChangeDigit1 = this.handleChangeDigit1.bind(this);
        this.handleChangeDigit2 = this.handleChangeDigit2.bind(this);
        this.handleChangeDigit3 = this.handleChangeDigit3.bind(this);
        this.handleChangeDigit4 = this.handleChangeDigit4.bind(this);
        this.handleChangeDigit5 = this.handleChangeDigit5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDigit1(event) {
        this.setState({ digit1: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit2(event) {
        this.setState({ digit2: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit3(event) {
        this.setState({ digit3: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit4(event) {
        this.setState({ digit4: event.target.value });
        if (event.target.value !== '') {
            event.target.nextSibling.focus();
        }
    }

    handleChangeDigit5(event) {
        this.setState({ digit5: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let body = {
            OTP:
        this.state.digit1 +
        '' +
        this.state.digit2 +
        '' +
        this.state.digit3 +
        '' +
        this.state.digit4 +
        '' +
        this.state.digit5
        };
        let user_otp = [ localStorage.getItem('user_id'), body.OTP ];
        localStorage.clear();
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
                    let zero = 0;
                    let one = 1;
                    let two = 2;
                    let three = 3;
                    sessionStorage.setItem('token', response[zero]);
                    sessionStorage.setItem('user_name', response[two]);
                    sessionStorage.setItem('user_img', response[three]);
                    let id_pass_manager = localStorage.getItem('id_pass_manager');

                    if (id_pass_manager === null) {
                        if (response[one] === 'recruiter') {
                            window.location = '/NewVerificationRequest';
                        } else if (response[one] === 'admin') {
                            alert('hey admin');
                        }
                    } else {
                        alert('other');
                    }
                },
                error => {
                    alert(error);
                }
            );
    }

    handleResubmit(){
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
                    alert('Please check for the newly sent OTP');
                    //window.location = '/otp';
                },
                (error) => {
                    this.setState({
                        isLoading: false
                    });
                    alert(error);
                }
            );
    }

    render() {
        if (localStorage.getItem('user_id') !== null) {
            return (
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
                    </div>
                </div>
            );
        } else {
            window.location = '/login';
        }
    }
}

export default connect()(Otp);