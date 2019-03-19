/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import { BASE_URL } from '../../../Shared/Constants';
import NavBar from '../NavBar/NavBar';
import ReactSelect from '../RecruiterVerificationRequest/ReactSelect';
import { connect } from 'react-redux';
import AddRemoveChecks from './AddRemoveChecks';
import ProfileChecks from './ProfileChecks';
import { fetchChecks } from './ReviewChecksActions';
import { toggleDisplay } from './ReviewChecksActions';

class ReviewChecks extends React.Component {
    constructor(props){
        super(props);
        this.addRemoveChecks = this.addRemoveChecks.bind(this);
        this.individualForm = this.individualForm.bind(this);
        this.verificationChecks = this.verificationChecks.bind(this);
    }

    verificationChecks(){

        window.location = '/NewVerificationRequest';
    }
    addRemoveChecks(){
        toggleDisplay(this.props.displayChecks);
    }

    individualForm(){
        let checks = [];
        this.props.checks.forEach((check) => {
            checks.push(check.id);
        });
        let createVerReq = {
            checks: checks,
            IsComplete: true
        };
        fetch(BASE_URL+'VerificationChecks/CreateVerificationCheck/'+localStorage.getItem('jpID'), {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ sessionStorage.getItem('token')
            },
            body: JSON.stringify(createVerReq),
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        } )
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
        return (
            <div className="bodyPage">
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
                    <ReactSelect defaultProf={localStorage.getItem('jp')}/>
                    <hr className="Line" />
                    {
                        this.props.displayChecks ?
                        <ProfileChecks addRemove={this.addRemoveChecks}/> : <AddRemoveChecks addRemove={this.addRemoveChecks} defaultChecks={this.props.checks}/>
                        
                    }
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.verificationChecks}>BACK</button>
                    <button id="next" onClick={this.individualForm}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    checks: state.reviewChecksState.jobProfileChecks,
    displayChecks: state.reviewChecksState.displayChecks
});

export default connect(mapStateToProps, { fetchChecks }) (ReviewChecks);