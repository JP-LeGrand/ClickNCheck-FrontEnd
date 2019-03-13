import React from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import { BASE_URL, AUTHENTICATE_LOGIN, OTP_AUTHENTICATION, PASS_EXPIRED } from '../../../Shared/Constants';
import mainImg from '../../../Assets/main.svg';

class Login extends React.PureComponent {
    constructor(props) {
        if (localStorage.getItem('user_id') !== null) {
            window.history.forward();
        }

        super(props);
        this.state = {
            password: '',
            email: ''
        };
        
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        let credentials = [ this.state.email, this.state.password ];
        fetch(BASE_URL + AUTHENTICATE_LOGIN , {
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
        } )
            .then((response) => response.json())  
            .then(
                response => {
                    localStorage.setItem('user_id', response);
                    
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
                    } )
                        .then((response) => response.json())  
                        .then(
                            (response) => {
                                if ( response === true) {
                                    window.location = '/changePassword';
                                } else if ( response === false ) {
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
                                        body: JSON.stringify(response), 
                                    } )
                                        .then((response) => response.json())  
                                        .then(
                                            () => {
                                                window.location = '/otp';
                                            },
                                            (error) => {
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
    } 
    
    render() {
        return (
            <div className="login">
                <header className="headSection">
                    <img src={mainImg}/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Existing User <b>Sign In</b></div>
                    <form onSubmit={this.handleSubmit}> 
                        <div className="form-group">
                            <label className="inp">
                                <input placeholder="&nbsp;" name="email" value ={this.state.email} onChange={this.handleChangeEmail} />
                                <span className="label">Email</span>
                                <span className="border"></span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="inp">
                                <input placeholder="&nbsp;" type="password" name="password" value ={this.state.password} onChange={this.handleChangePass} />
                                <span className="label">Enter Password</span>
                                <span className="border"></span>
                            </label>
                            
                            <p>
                                <a href="/forgotPassword">Forgot Password?</a>
                            </p>
                        </div> 

                        <div className="form-group">
                            <button onClick={this.handleSubmit}>Login</button>
                        </div> 
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);