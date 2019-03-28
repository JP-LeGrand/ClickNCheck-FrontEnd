/* eslint-disable indent */
import React, { Fragment } from 'react';
import './MainContainerStyle.scss';
import './candidateUploadContainer.scss';
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
import { ToastContainer, toast } from 'mdbreact';
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
        } else {
            this.props.toggleDisplay(true);
        }
    }

    reorderChecks() {
        localStorage.setItem('isRecruiter', true);
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
                    toast.success("you have successfully creacted a verification check request", {
                        autoClose: 5000
                    });
                    window.location = '/candidate/individual';
                },
                (error) => {
                    toast.error("Error has occured", {
                        autoClose: 5000
                    });
                    
                });
    }
    render() {
        let customStyle = {
            control: provided => ({
                ...provided,
                height: 2,
                width: 300,
                padding: 5,
                marginBottom: 39,
                marginLeft: 0,
                border: '0',
                borderRadius: 0,
                boxShadow: '0 !important',
                '&:hover': {
                    borderBottom: '1px solid black'
                },
                borderBottom: '1px solid black',
                fontSize: 18,
                color: '#2b3844',
                outline: 'none',
                pointerEvents: 'none'
            }),
            option: given => ({
                ...given,
                backgroundColor: '#FFFFFF',
                borderBottom: 'solid 1px #e6e9ec',
                borderRadius: 3,
                '&:hover': {
                    backgroundColor: '#e6e9ec',
                    zIndex: 20
                },
                zIndex: 22
            })
        };
        return (
            <Fragment>
            <ToastContainer 
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}
            />
            <div className="bodyStyles">
                <div className="candidateNav">
                    <NavBar />
                    <h2 className="New-Verification-Req"><b>New Verification Request</b></h2>
                    <h3 className="Job-Profile">Job Profile</h3>
                    <div className="formBox">
                        <ul id="progress_bar">
                            <li className="active">Select verification checks</li>
                            <li>Candidate Details</li>
                            <li>Next Steps</li>
                        </ul>
                        <h3>Job Profile</h3>
                        <ReactSelect customStyle={customStyle} defaultProf={localStorage.getItem('jp')} />
                        <hr className="Line" />
                        <div className="">
                        {
                            this.props.displayChecks ? <ProfileChecks addRemove={this.addRemoveChecks} reorderChecks={this.props.updateReorderChecks} checks={this.props.checks} updateOrder={this.props.updateProfileChecks}/>
                                : <AddRemoveChecks addRemove={this.addRemoveChecks} updateAllChecks={this.props.updateAllChecks} allChecks={this.props.allChecks} defaultChecks={this.props.checks} addCheck={this.props.addProfileCheck} removeCheck={this.props.removeProfileCheck} />
                        }
                        </div>
                    </div>
                    <div id="buttonFooter">
                        <button id="prev" onClick={this.verificationChecks}>BACK</button>
                        <button id="next" onClick={this.individualForm}>NEXT</button>
                    </div>
                    <Footer />
                </div>
            </div>
            </Fragment>
        );
    }
}

ReviewChecks.propTypes = {
    fetchChecks: PropTypes.func.isRequired,
    fetchAllChecks: PropTypes.func.isRequired,
    checks: PropTypes.array,
    toggleDisplay: PropTypes.func,
    updateAllChecks: PropTypes.func,
    updateReorderChecks: PropTypes.func,
    reorderChecks: PropTypes.bool,
    displayChecks: PropTypes.bool,
    allChecks: PropTypes.array,
    addProfileCheck: PropTypes.func,
    removeProfileCheck: PropTypes.func,
    updateProfileChecks: PropTypes.func
};

const mapStateToProps = state => ({
    checks: state.reviewChecksState.jobProfileChecks,
    displayChecks: state.reviewChecksState.displayChecks,
    allChecks: state.reviewChecksState.allChecks,
    reorderChecks: state.reviewChecksState.reorderChecks
});

const mapActionsToProps = (dispatch) => ({
    fetchChecks: bindActionCreators(ReviewChecksActions.fetchChecks, dispatch),
    toggleDisplay: bindActionCreators(ReviewChecksActions.toggleDisplay, dispatch),
    fetchAllChecks: bindActionCreators(ReviewChecksActions.fetchAllChecks, dispatch),
    addProfileCheck: bindActionCreators(ReviewChecksActions.addProfileCheck, dispatch),
    removeProfileCheck: bindActionCreators(ReviewChecksActions.removeProfileCheck, dispatch),
    updateAllChecks: bindActionCreators(ReviewChecksActions.updateAllChecks, dispatch),
    updateReorderChecks: bindActionCreators(ReviewChecksActions.updateReorderChecks, dispatch),
    updateProfileChecks: bindActionCreators(ReviewChecksActions.updateProfileChecks, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ReviewChecks);