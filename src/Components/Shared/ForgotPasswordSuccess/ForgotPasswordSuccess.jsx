import React from 'react';
import { connect } from 'react-redux';
import imgMain from '../../../Assets/main.svg';
import './ForgotPasswordSuccess.scss';
import 'typeface-roboto';
import Footer from '../Footer/Footer';
import check from '../../../Assets/green_check.svg';
class ForgotPasswordSuccess extends React.PureComponent {
    render() {
        return ( 
            <div className="forgotSuccess">
                <div className="form-group">
                    <img src={imgMain} />
                </div>
                <div className="mainSection">
                    <img id="tick" src={check} alt="success" />
                    <div id="heading">
                        <p>Your request</p>
                        <p id="bold">has been successful</p>
                    </div> 
                    <div id="middle">
                        <p>We have sent you an &nbsp;</p><strong> {localStorage.getItem('sentTo')} </strong> &nbsp; <p >with further instructions</p>
                    </div>
                    <div id="bottom">
                        <a href="/login"><button id="btnLogin">LOGIN</button></a>
                    </div>
                </div>
                <Footer />
            </div>
            
        ); 
    }
}

export default connect()(ForgotPasswordSuccess);