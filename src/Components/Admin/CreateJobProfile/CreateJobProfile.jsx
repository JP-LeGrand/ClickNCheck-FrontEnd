import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL } from '../../../Shared/Constants';
//import ReactSelect from '../../Recruiter/RecruiterVerificationRequest/ReactSelect';

class CreateJobProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobProfiles: [],
            selectedProfile: 'e.g Job profile here'
        };
        this.nextSteps = this.nextSteps.bind(this);
    }
    nextSteps() {
        if (this.state.selectedProfile === 'e.g Job profile here' || this.state.selectedProfile === '') {
            return;
        } else {
            this.state.jobProfiles.forEach((jp) => {
                if (jp.label === this.state.selectedProfile) {
                    localStorage.setItem('jpID', jp.id);
                    localStorage.setItem('jp', jp.value);
                }
            });
            window.location = '/CreateJobProfilePage2';
        }

    }
    handleChange = (e) => {
        this.setState({ selectedProfile: e.selectedProfile });
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
                        <h3>Enter New Job Profile Details</h3>

                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="profileName" placeholder="Enter Job Profile Title" />
                            </label>
                        </div>
                        <div id="profileError"></div>
                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="jobCode" placeholder="Enter Job Profile Code" />
                            </label>
                        </div>
                        <div id="codeError"></div>
                    </fieldset>
                </div>
                <div id="buttonFooter">
                    <button id="next" onClick={this.nextSteps}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        let arr = [];
        fetch(BASE_URL + 'JobProfiles/recruiterJobs', {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    response.forEach((check) => {
                        arr.push({
                            id: check.id,
                            value: check.title,
                            label: check.title
                        });
                    });
                    this.setState({ jobProfiles: arr });
                },
                (error) => {
                    alert(error);
                });
    }
}

export default CreateJobProfile;