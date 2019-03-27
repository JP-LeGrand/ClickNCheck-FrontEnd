import React, { Fragment } from 'react';
import './VerificationConfirmed.scss';
import check from '../../../../Assets/green_check.svg';
import 'typeface-roboto';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../../Shared/Footer/Footer';
import { ToastContainer, toast } from 'mdbreact';

class VerificationConfirmed extends React.PureComponent{
    render() {
        return (
            <Fragment>
                <ToastContainer 
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <div className="verifcationConfirmed">
                    <NavBar />
                    <h2 className="New-verification-req"> New verification request</h2>
                    <h3 className="Job-Profile">Job Profile </h3>
               
                    <div>
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
                                <a href="/recruter/dashboard"><button id="btnDashboard" href="" disabled >RETURN TO DASHBOARD</button></a>
                                <a id="logout" href="/login">Logout</a>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Fragment>
        );
    }
}

export default VerificationConfirmed;