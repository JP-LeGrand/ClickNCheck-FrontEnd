import React from 'react';
import { connect } from 'react-redux';
import 'typeface-roboto';
import './Login.scss';
import { BASE_URL, AUTHENTICATE_LOGIN, OTP_AUTHENTICATION, PASS_EXPIRED } from '../../../Shared/Constants';
import mainImg from '../../../Assets/main.svg';
import userImg from '../../../Assets/user.svg';
import passImg from '../../../Assets/password.svg';
import rollingImg from '../../../Assets/Rolling.svg';
class Login extends React.PureComponent {
    constructor(props) {
        if (localStorage.getItem('user_id') !== null) {
            window.history.forward();
        }

        super(props);
        this.state = {
            password: '',
            email: '',
            isPasswordVisible: false,
            inputType: 'password',
            loggingIn: false
        };
        
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowHide = this.handleShowHide.bind(this);
    }
    
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value });
    }

    handleShowHide() {
        if ( this.state.isPasswordVisible === true) {
            this.setState( { isPasswordVisible: false } );
            this.setState( { inputType: 'password' } );
        } else {
            this.setState( { isPasswordVisible: true } );
            this.setState( { inputType: 'text' } );
        }
        
    }
    handleSubmit(event){
        event.preventDefault();
        let credentials = [ this.state.email, this.state.password ];
        this.setState({
            isLoading: true
        });
        this.setState({ isLoading: true }, () => {
            fetch(BASE_URL + AUTHENTICATE_LOGIN, {
                method: 'POST',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'manual', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(credentials),
            })
                .then((response) => response.json())
                .then(
                    response => {
                        localStorage.setItem('user_id', response);
                        let userid = localStorage.getItem('user_id');
                        fetch(BASE_URL + PASS_EXPIRED + response, {
                            method: 'POST',
                            mode: 'cors', // no-cors, cors, *same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            redirect: 'manual', // manual, *follow, error
                            referrer: 'no-referrer', // no-referrer, *client 
                        })
                            .then((pass_exp_response) => pass_exp_response.json())
                            .then(
                                (pass_exp_response) => {
                                    if (pass_exp_response === true) {
                                        //window.location = '/changePassword';
                                    } else if (pass_exp_response === false) {
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
                                                    this.setState({
                                                        isLoading: false
                                                    });
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
                                },
                                (error) => {
                                    alert(error);
                                }
                            );

                    },
                    (error) => {
                        alert(error);
                    }
                );
        });
        this.setState({
            isLoading: false
        });
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
                                <input placeholder="&nbsp;" name="email" value ={this.state.email} onChange={this.handleChangeEmail} />
                                <span className="label">Email</span>
                                <span className="border"></span>
                            </label>
                        </div>

                        <div className="form-group">
                            <img src={passImg}/>
                            <label className="inp">
                                <input placeholder="&nbsp;" type={this.state.inputType} name="password" value ={this.state.password} onChange={this.handleChangePass} />
                                <span className="label">Enter Password</span>
                                <span className="border"></span>
                                <span className="showHide" onClick={this.handleShowHide}>{this.state.isPasswordVisible ? 'Hide' : 'Show'}</span>
                            </label>
                            
                            <p>
                                <a href="/forgotPassword">Forgot Password?</a>
                            </p>
                        </div> 

                        <div id="btnDiv" className="form-group">
                            <button onClick={this.handleSubmit}>Login</button>
                        </div> 
                        <div className="logginIn">
                            {this.state.loggingIn && <img src={rollingImg} id="spinner" alt="loading..." />}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect()(Login);