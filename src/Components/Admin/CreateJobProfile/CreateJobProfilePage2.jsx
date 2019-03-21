/* eslint-disable indent */
import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import { BASE_URL, GET_ALL_SERVICES } from '../../../Shared/Constants';
import NavBar from '../AdminNavBar/adminNavBar';
import AllChecksTable from './AllChecksTable';
import { connect } from 'react-redux';

class CreateJobProfilePage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobProfileName: localStorage.getItem('jobProfileName'),
            jobProfileCode: localStorage.getItem('jobProfileCode'),
            checks: []
        };

        this.backSteps = this.backSteps.bind(this);
        this.saveProgress = this.saveProgress.bind(this);
        this.nextSteps = this.nextSteps.bind(this);
    }

    nextSteps() {
        window.location = '/Admin/CreateJobProfilePage3';
    }

    backSteps() {
        window.location = '/Admin/CreateJobProfile';
    }

    saveProgress() {
        //TODO
        //
    }

    render() {
        let checks = {};

        this.state.checks.forEach((check) => {
            checks[check.location].push(check);
        });
        return (
            <div className="bodyPage">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li>Job Profile Name</li>
                        <li className="active">Select Verification Checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>
                    <h3>Select Verification Checks Required for</h3><h2>{this.state.jobProfileName}</h2>
                    <hr className="Line" />

                    <fieldset className="field2">
                        <h2>Select Verification Checks Required for</h2>
                        <table>
                            <AllChecksTable />
                        </table>
                    </fieldset>
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.backSteps}>BACK</button>
                    <button id="save" onClick={this.saveProgress}>Save and continue later</button>
                    <button id="next" onClick={this.nextSteps}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        let arr = [];
        fetch(BASE_URL + GET_ALL_SERVICES, {
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

export default connect()(CreateJobProfilePage2);