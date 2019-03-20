/* eslint-disable indent */
import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import { BASE_URL } from '../../../Shared/Constants';
import NavBar from '../AdminNavBar/adminNavBar';
import AllChecksTable from './AllChecksTable';
import { connect } from 'react-redux';

class CreateJobProfilePage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: 'grab',
            checks: []
        };
        this.individualForm = this.individualForm.bind(this);
    }

    verificationChecks() {
        window.location = '/NewVerificationRequest';
    }

    addRemoveChecks() {
        window.location = '/AddRemoveChecks';
    }

    reorderChecks() {
        window.location = '/ReorderChecks';
    }

    individualForm() {
        let checks = [];
        this.state.checks.forEach((check) => {
            if (check.location == 'onLeft') {
                checks.push(check.id);
            }
        });
        let createVerReq = {
            checks: checks,
            IsComplete: true
        };
        fetch(BASE_URL + 'VerificationChecks/CreateVerificationCheck/' + localStorage.getItem('jpID'), {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(createVerReq),
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    localStorage.setItem('ver_check', response);
                    window.location = '/candidate/individual';
                },
                (error) => {
                    alert(error);
                });
    }
    render() {
        let checks = {
            onLeft: [],
            onRight: []
        };

        /**Run through the tasks array inside state and put each check on the left or right
     * side of the page depending on whether it came with the jobProfile or not*/

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
                        <li className="active">Job Profile Name</li>
                        <li>Select Verification Checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>
                    <h3>Select Verification Checks Required for</h3><h2>Java Developer JVD34C</h2>
                    <hr className="Line" />

                    <fieldset className="field2">
                        <h2>Select Verification Checks Required for</h2>
                        <table>
                            <AllChecksTable />
                        </table>
                    </fieldset>
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.verificationChecks}>BACK</button>
                    <button id="save" onClick={this.saveProgress}>Save and continue later</button>
                    <button id="next" onClick={this.individualForm}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }

    onDrop = (ev, pos) => {
        let vendor = ev.dataTransfer.getData('vendor');
        let cat = ev.dataTransfer.getData('category');
        let tasks = this.state.checks.filter((check) => {
            if (check.vendors[0] == vendor) {
                check.location = pos;
                if (check.bgColor == '#FFFFFF') {
                    check.bgColor = '#0091d1';
                    check.color = 'white';
                } else {
                    check.bgColor = '#FFFFFF';
                    check.color = 'black';
                }
                this.state.checks.forEach((c) => {
                    if (c.category == cat && c.location != pos) {
                        c.vendors.push(check.vendors[0]);
                        return c;
                    }
                });
            }
            return check;
        });

        this.setState({
            ...this.state,
            tasks
        });
        this.setState({ cursor: 'grab' });
    }

    onDragOver(event) {
        event.preventDefault();
        this.setState({ cursor: 'grabbing' });
    }

    onDragStart(event, vendor, cat) {
        this.setState({ cursor: 'grabbing' });
        event.dataTransfer.setData('vendor', vendor);
        event.dataTransfer.setData('category', cat);
    }

    onDragEnd(e) {
        this.setState({ cursor: 'grab' });
    }
}

export default connect()(CreateJobProfilePage2);