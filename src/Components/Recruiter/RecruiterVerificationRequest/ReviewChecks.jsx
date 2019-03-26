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
import * as ReviewChecksActions from './ReviewChecksActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { prototype } from 'events';

class ReviewChecks extends React.Component {
    constructor(props) {
        super(props);
        this.addRemoveChecks = this.addRemoveChecks.bind(this);
        this.individualForm = this.individualForm.bind(this);
        this.verificationChecks = this.verificationChecks.bind(this);
        this.reorderChecks = this.reorderChecks.bind(this);
    }

    componentDidMount() {
        this.props.fetchChecks();
        this.props.toggleDisplay(this.props.displayChecks);
        this.props.fetchAllChecks();
    }
    verificationChecks() {

        window.location = '/NewVerificationRequest';
    }
    addRemoveChecks() {
        if (this.props.displayChecks) {
            this.props.toggleDisplay(false);
        }
        else {
            this.props.toggleDisplay(true);
        }
    }

    reorderChecks(){
        localStorage.setItem('isRecruiter', true);
        console.log(localStorage.getItem('jp'));
    }

    individualForm() {
        let checks = [];
        this.props.checks.forEach((check) => {
            checks.push(check.id);
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
                    <ReactSelect defaultProf={localStorage.getItem('jp')} />
                    <hr className="Line" />
                    {
                        this.props.displayChecks ? <ProfileChecks addRemove={this.addRemoveChecks} checks={this.props.checks} />
                            : <AddRemoveChecks updateAllChecks={this.props.updateAllChecks} addRemove={this.addRemoveChecks} allChecks={this.props.allChecks} defaultChecks={this.props.checks} addCheck={this.props.addProfileCheck} removeCheck={this.props.removeProfileCheck} />
                    }
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.verificationChecks}>BACK</button>
                    <button id="next" onClick={this.individualForm}>NEXT</button>
                </div>
                <Footer />
            </div>
            </div>
        );
    }
}

ReviewChecks.propTypes = {
    fetchChecks: PropTypes.func.isRequired,
    checks: PropTypes.array,
    toggleDisplay: PropTypes.func,
    displayChecks: PropTypes.bool,
    allChecks: PropTypes.array,
    addProfileCheck: PropTypes.func,
    removeProfileCheck: PropTypes.func
};

const mapStateToProps = state => ({
    checks: state.reviewChecksState.jobProfileChecks,
    displayChecks: state.reviewChecksState.displayChecks,
    allChecks: state.reviewChecksState.allChecks
});

const mapActionsToProps = (dispatch) => ({
    fetchChecks: bindActionCreators(ReviewChecksActions.fetchChecks, dispatch),
    toggleDisplay: bindActionCreators(ReviewChecksActions.toggleDisplay, dispatch),
    fetchAllChecks: bindActionCreators(ReviewChecksActions.fetchAllChecks, dispatch),
    addProfileCheck: bindActionCreators(ReviewChecksActions.addProfileCheck, dispatch),
    removeProfileCheck: bindActionCreators(ReviewChecksActions.removeProfileCheck, dispatch),
    updateAllChecks: bindActionCreators(ReviewChecksActions.updateAllChecks, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ReviewChecks);