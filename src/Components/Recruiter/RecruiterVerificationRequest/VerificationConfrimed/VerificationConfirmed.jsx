import React from 'react';
import './VerificationConfirmed.scss';
import check from '../../../../Assets/green_check.svg';
import 'typeface-roboto';
class VerificationConfirmed extends React.PureComponent{
    render() {
        return (
            <div className="verifcationConfirmed">
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Select verification checks</li>
                        <li className="active">Candidate Details</li>
                        <li className="active">Next Steps</li>
                    </ul>
                    <div className="top">
                        <img src={check} />
                        <h1 id="congrats">Congratulations!</h1>
                        <p>The verification request has been successfully submitted. </p>
                    </div>
                    <div className="field4">
                        <ul id="paragraph">
                            <li className="active">A notification to provide consent and fingerprints has been sent to Job Title Candidates</li>
                            <li className="active">Verification checks will start as soon as consent has been provided by the candidates(s) as well as any other requirements met, such as fingerprints completed</li>
                            <li className="active">The cost of the verification requests submitted will be added to your organization's account</li><br />
                        </ul>
                    </div>
                    <div className="bottom">
                        <p>Would you like to</p>
                        <a href="/recruter/dashboard"><button id="btnDashboard" href="" >RETURN TO DASHBOARD</button></a>
                        <a id="logout" href="/login">Logout</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerificationConfirmed;