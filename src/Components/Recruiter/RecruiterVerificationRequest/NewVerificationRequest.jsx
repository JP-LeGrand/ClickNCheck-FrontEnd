import React from 'react';
import './ReviewCheckStyles.scss';
import './candidateUploadContainer.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { BASE_URL } from '../../../Shared/Constants';
import ReactSelect from '../RecruiterVerificationRequest/ReactSelect';

class NewVerificationRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobProfiles: [],
            selectedProfile: localStorage.getItem('jp') === null ? 'e.g Job profile here' : localStorage.getItem('jp')
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
            window.location = '/ReviewChecks';
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
            <div className="bodyStyles">
                <div className="candidateNav">
                    <NavBar />
                    <div id="spanHolder">
                        <span className="New-Verification-Req">New Verification Request</span>
                        <span className="Job-Profile">Job Profile</span>
                    </div>
                    <div id="formContainer">
                        <ul id="progress_bar">
                            <li className="active">Select verification checks</li>
                            <li>Candidate Details</li>
                            <li>Next Steps</li>
                        </ul>
                        <h3>Job Profile</h3>
                        <ReactSelect defaultProf={this.state.selectedProfile} jobProfiles={this.state.jobProfiles} onSelectProfile={this.handleChange} />
                    </div>
                    <div id="buttonFooter">
                        <button id="next" onClick={this.nextSteps}>NEXT</button>
                    </div>
                    <Footer />
                </div>
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

export default NewVerificationRequest;