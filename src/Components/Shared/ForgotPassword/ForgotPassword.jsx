import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import './ForgotPassword.scss';
import imgMain from '../../../Assets/main.svg';
class ForgotPassword extends React.PureComponent{
    render(){
        return (
            <div className="forgotPassword">
                <header className="headSection">
                    <img src={imgMain}/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Forgot Password</div> 
                    <div className="sendWhat">
                        <p className="send">Select what you would like us to send you</p>
                        <div className="send">
                            <input id="username" type="checkbox" className ="sendInfo"/><label htmlFor="username">Username</label>
                        </div>
                        <br/>
                        <div id="send">
                            <input id="password" type="checkbox" className ="sendInfo"/><label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="sendWhat">
                        <p className="send">We need to Identify you before we send you the details </p>
                    </div>
           
                    <div className="sendWhat">
                        <strong className="send">Identification Type</strong>
                        <br/>
                        <select className="send">
                            <option>Identity</option>
                            <option>Passport</option>
                        </select>
                        <div  className="send">
                            <label className="inp">
                                <input placeholder="&nbsp;" type="password" />
                                <span className="label">Enter Idenity or Passport Number</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        
                    </div>
                    <div id="via" className="sendWhat">
                        <strong className="send">Send Via</strong>
                        <br/>
                        <select id="belowinp" className="send">
                            <option>Phone</option>
                            <option>Email</option>
                        </select>
                        <div className="send">
                            <label className="inp">
                                <input placeholder="&nbsp;"/>
                                <span className="label">Enter Email or Number</span>
                                <span className="border"></span>
                            </label>
                        </div>
                    </div>
                    

                    <div className="sendWhat">
                        <button >Send</button>
                    </div> 
                </div>
            </div>
        );
    }
}
ForgotPassword.propTypes = {
    homeState: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
};

const mapStateToProps = (state) => {
    return {
        homeState: state.homeState
    };
};
export default connect()(ForgotPassword);