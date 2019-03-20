import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import './CreateJobProfile.scss';

class CreateJobProfilePage3 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            JobProfile: {}
        };

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }
    prevStep() {
        window.location = '/Admin/CreateJobProfilePage2';
    }

    nextStep() {
        window.location = '/Admin/AssignRecruiters';
    }
    render() {
        return (
            <div className="bodyPage">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li>Job Profile Name</li>
                        <li>Select Verification Checks</li>
                        <li className="active">Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>
                    <div id="buttonFooter">
                        <button id="prev" onClick={this.prevStep}>BACK</button>
                        <button id="save" onClick={this.saveProgress}>Save and continue later</button>
                        <button id="next" onClick={this.nextStep}>NEXT</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default CreateJobProfilePage3;