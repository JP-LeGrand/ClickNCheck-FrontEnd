import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import ReactSelect from './ReactSelect';
import * as JobProfileActions from './JobProfileActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CreateJobProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.nextDisplay = this.nextDisplay.bind(this);
        this.prevDisplay = this.prevDisplay.bind(this);
    }

    componentDidMount(){
        this.props.fetchJobProfiles();
    }

    handleChange(e){
        console.log('Selected '+e);
        this.props.updateSelectedProfile(e);
    }

    nextDisplay(e){

    }

    prevDisplay(e){

    }

    render() {
        /**Run through the tasks array inside state and put each check on the left or right
         * side of the page depending on whether it came with the jobProfile or not
        */
        return (
            <div className="createJobProfile">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Job-Profile">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Job Profile Name</li>
                        <li>Select Verification Checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>
                    <h3>Select Job profile</h3>
                    <ReactSelect defaultProf="e.g Job profile here" jobProfiles={this.props.jobProfiles} onSelectProfile={this.handleChange}/>
                </div>
                <div id="buttonFooter">
                    <button id="prev"  onClick={this.nextDisplay}>BACK</button>
                    <button id="next" onClick={this.prevDisplay}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }
}

CreateJobProfile.propTypes = {
    fetchChecks: PropTypes.func.isRequired,
    checks: PropTypes.array,
    toggleDisplay: PropTypes.func,
    displayChecks: PropTypes.bool,
    allChecks: PropTypes.array,
    addProfileCheck: PropTypes.func,
    removeProfileCheck: PropTypes.func
};

const mapStateToProps = state => ({
    jobProfiles: state.jobProfileState.jobProfiles,
    nowDisplaying: state.jobProfileState.nowDisplaying,
    allChecks: state.jobProfileState.allChecks
});

const mapActionsToProps = (dispatch) => ({
    fetchJobProfiles: bindActionCreators(JobProfileActions.fetchJobProfiles, dispatch),
    updateSelectedProfile: bindActionCreators(JobProfileActions.updateSelectedProfile, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps) (CreateJobProfile);