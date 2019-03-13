import React from 'react';
import { connect } from 'react-redux';
import imgMain from '../../../Assets/main.svg';
import './ForgotPasswordSuccess.scss';
import 'typeface-roboto';
import Footer from '../Footer/Footer'
class ForgotPasswordSuccess extends React.PureComponent {
    render() {
        return ( 
            <div className="forgotSuccess">
                <div className="mainSection">
                    <div className="form-group">
                        <img src={imgMain}/>
                    </div>
                    <div className="registrationHeading">
                        <strong>Forgot Password Request Successful</strong>
                    </div> 
                    <div id="bottom" className="form-group">
						Dear User <br/>
						We have recieved your password request and a message has been sent to your {localStorage.getItem('sentTo')} with further instructions.
                    </div>
                </div>
				<Footer/>
            </div>
            
        ); 
    }
}

export default connect()(ForgotPasswordSuccess);