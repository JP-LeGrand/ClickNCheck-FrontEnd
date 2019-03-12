import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import imgMain from '../../../Assets/main.svg';
class ChangePassword extends React.PureComponent{
    render(){
        return (
            <div className="changePassword">
                <header className="headSection">
                    <img src={imgMain}/>
                </header>

                <div className="mainSection">
                    <div className="registrationHeading">Change Password</div>
                    <div className="sendWhat">
                        <label className="inp">
                            <input type="password" placeholder="&nbsp;"/>
                            <span className="label">Password</span>
                            <span className="border"></span>
                        </label>
                        <label className="inp">
                            <input type="password" placeholder="&nbsp;"/>
                            <span className="label">Confirm Password</span>
                            <span className="border"></span>
                        </label>
                        <button id="btnSend" >Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    homeState: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => {
    return {
        homeState: state.homeState
    };
};
export default connect()(ChangePassword);