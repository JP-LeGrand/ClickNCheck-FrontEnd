import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';

class CreateJobProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobProfileName: '',
            jobProfileCode: ''
        };
        this.nextSteps = this.nextSteps.bind(this);
        this.handleJPName = this.handleJPName.bind(this);
        this.handleJPCode = this.handleJPCode.bind(this);
    }

    handleJPName(event) {
        this.setState({
            jobProfileName: event.target.value,

        });
    }

    handleJPCode(event) {
        this.setState({
            jobProfileCode: event.target.value,

        });
    }
    nextSteps() {
        if (this.state.jobProfileName === null || this.state.jobProfileCode === null) {
            return;
        } else {

            localStorage.setItem('jobProfileName', this.state.jobProfileName);
            localStorage.setItem('jobProfileCode', this.state.jobProfileCode);

            window.location = '/Admin/CreateJobProfilePage2';
        }

    }
    render() {
        /**Run through the tasks array inside state and put each check on the left or right
         * side of the page depending on whether it came with the jobProfile or not
        */
        return (
            <div className="bodyPage">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Job Profile Name</li>
                        <li>Select Verification Checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>

                    <fieldset className="mainContents">
                        <h3>Select job profile to base checks on</h3>

                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="profileName" name="profileName" value={this.state.jobProfileName} placeholder="Enter Job Profile Title" onChange={(event) => this.handleJPName(event)} />
                            </label>
                        </div>
                        <div id="profileError"></div>
                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="jobCode" name="jobCode" value={this.state.jobProfileCode} placeholder="Enter Job Profile Code" onChange={(event) => this.handleJPCode(event)} />
                            </label>
                        </div>
                        <div id="codeError"></div>
                    </fieldset>
                </div>
                <div id="buttonFooter">
                    <button id="save" onClick={this.saveProgress}>Save and continue later</button>
                    <button id="next" onClick={this.nextSteps}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CreateJobProfile;