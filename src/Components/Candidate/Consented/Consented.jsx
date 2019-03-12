import React from 'react';
import { connect } from 'react-redux';
import imgMain from '../../../Assets/main.svg';
import './Consented.scss';
class Consented extends React.PureComponent {
    render() {
        return ( 
            <div className=".consented">
                <div className="mainSection">
                    <div className="form-group">
                        <img src={imgMain}/>
                    </div>
                    <div className="registrationHeading">
                        <strong>Candidate Succesfully Confirmed Verification</strong>
                    </div> 
                    <div id="bottom" className="form-group">
                    We have recieved confirmation of your consent for checks to be run, for any queries and issues an email has been sent to your inbox that you can refer to should any issues arise.
                    </div>
                </div>
            </div>
            
        ); 
    }
}

export default connect()(Consented);