import React from 'react';
import { connect } from 'react-redux';
import './Otp.scss';

class Otp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            digit1: '',
            digit2: '',
            digit3: '',
            digit4: '',
            digit5: '',
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
    }

    handleChangeDigit2(event) {
        this.setState({ digit2: event.target.value });
    }

    handleChangeDigit3(event) {
        this.setState({ digit3: event.target.value });
    }

    handleChangeDigit4(event) {
        this.setState({ digit4: event.target.value });
    }

    handleChangeDigit5(event) {
        this.setState({ digit5: event.target.value });
    }

    handleSubmit(event){
        //this.props.history.push('../Components/SuperAdmin/AccountsPerson/AccountsPerson');
        event.preventDefault();
        alert(this.state.email);
        let body = {
            OTP: this.state.digit1 + '' + this.state.digit2 + '' + this.state.digit3 + '' + this.state.digit4 + '' + this.state.digit5
        };
        let user_otp = [ localStorage.getItem('user_id'),body.OTP ];
        // eslint-disable-next-line no-undef
        fetch('https://localhost:44347/api/authentication/checkOtp', {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(user_otp), 
        } )
            .then((response) => response.json())  
            .then(
                response => {
                    alert(response);
                },
                (error) => {
                    alert(error);
                }     
            );
    } 
    
    render() {
        return (
            <div classNameName="otp">
                <header className="headSection">
                    <img src="../../../icons/main.svg"/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">
                        Enter the One-Time Pin sent to you
                    </div> 

                    <div className="form-group">
                        <input placeholder="&nbsp;" type="number" value ={this.state.digit1} onChange={this.handleChangeDigit1}/>
                        <input placeholder="&nbsp;" type="number" value ={this.state.digit2} onChange={this.handleChangeDigit2}/>
                        <input placeholder="&nbsp;" type="number" value ={this.state.digit3} onChange={this.handleChangeDigit3}/>
                        <input placeholder="&nbsp;" type="number" value ={this.state.digit4} onChange={this.handleChangeDigit4}/>
                        <input placeholder="&nbsp;" type="number" value ={this.state.digit5} onChange={this.handleChangeDigit5}/> 
                    </div>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <button onClick={this.handleSubmit}>SUBMIT</button>
                        <p><a href="#">Resend</a> or need <a href="#">Help</a></p>
                    </div> 
                </div>
            </div>
        );
    }
}

export default connect()(Otp);