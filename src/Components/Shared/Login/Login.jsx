import React from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import { Redirect } from 'react-router-dom'

class Login extends React.PureComponent {
    constructor(props) {
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
        this.props.history.push('../Components/SuperAdmin/AccountsPerson/AccountsPerson');
        
        /* let credentials = [ this.state.email, this.state.password ];
        window.location.href = '../Components/SuperAdmin/AccountsPerson/AccountsPerson';
            fetch('https://localhost:44347/api/authentication/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then( res => this.setState({ user_id: res }))
            .then(window.location.href = '../Components/SuperAdmin/AccountsPerson/AccountsPerson');

        event.preventDefault();*/
    } 
    
    render() {
        return (
            <div className="login">
                <header className="headSection">
                    <img src="../../../icons/main.svg"/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Existing User <b>Sign In</b></div>
                    <form onSubmit={this.handleSubmit}> 
                        <div className="form-group">
                            <label className="inp">
                                <input placeholder="&nbsp;" name="email" onChange={this.handleChangeEmail} />
                                <span className="label">Email</span>
                                <span className="border"></span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="inp">
                                <input placeholder="&nbsp;" type="password" name="password" onChange={this.handleChangePass} />
                                <span className="label">Enter Password</span>
                                <span className="border"></span>
                            </label>
                        </div>

                        <p><a href="#">Forgot Password?</a></p>

                        <div className="form-group">
                            <input type="submit" value="Login" />
                        </div> 
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);