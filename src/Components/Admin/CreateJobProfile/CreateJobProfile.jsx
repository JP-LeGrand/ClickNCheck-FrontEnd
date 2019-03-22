import React from 'react';
import './CreateJobProfile.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import ReactSelect from './ReactSelect';
import * as JobProfileActions from './JobProfileActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectVendors from './SelectVendors';

class CreateJobProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: '',
            code: '',
            profile: ''
        };
        this.nextDisplay = this.nextDisplay.bind(this);
        this.prevDisplay = this.prevDisplay.bind(this);
        this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
        this.profile = this.profile.bind(this);
        this.code = this.code.bind(this);
    }

    onCheckBoxClicked(checks){
        this.props.updateChecks(checks);
    }

    profile(e){
        this.setState({profile: e.target.value});
        this.props.updateSelectedProfile(this.state.profile);
    }
    
    code(e){
        this.setState({code: e.target.value});
        this.props.updateCode(this.state.code);
    }

    nextDisplay(e){
        switch (this.props.nowDisplaying){
        case 'default':
            this.props.updateSelectedProfile(this.state.profile);
            this.props.updateCode(this.state.code);
            this.props.updateDisplay('selectVendors');
            localStorage.setItem('jobProfile', this.state.profile);
            localStorage.setItem('jobCode', this.state.code);
            break;
        case 'selectVendors':
            sessionStorage.setItem('services', JSON.stringify(this.props.selectedChecks));
            window.location = '/Admin/CreateJobProfilePage3';
            break;
        default: 
            this.props.updateDisplay(this.props.nowDisplaying);
        }
    }

    prevDisplay(e){
        switch (this.props.nowDisplaying){
        case 'selectVendors':
            this.props.updateDisplay('default')
        default: 
            this.props.updateDisplay(this.props.nowDisplaying);
        }
    }

    render() {
        /**Run through the tasks array inside state and put each check on the left or right
         * side of the page depending on whether it came with the jobProfile or not
        */
        let def = <div><ReactSelect defaultProf="e.g Job profile here" jobProfiles={this.props.jobProfiles} onEnterProfile={this.profile} onEnterCode={this.code} /></div>;
        let selectVendors = <div><SelectVendors allChecks={this.props.allChecks} onCheckBoxClicked={this.onCheckBoxClicked} jobProfile={this.state.profile+' '+this.state.code}/></div>;
        let view = this.props.nowDisplaying == 'default' ? def : selectVendors;
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
                    {view}
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.prevDisplay}>BACK</button>
                    <button id="next" onClick={this.nextDisplay}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount(){
        this.props.fetchAllChecks();
        this.props.updateDisplay('default');
    }
}

CreateJobProfile.propTypes = {
    fetchAllChecks: PropTypes.func.isRequired,
    fetchJobProfiles: PropTypes.func.isRequired,
    updateDisplay: PropTypes.func.isRequired,
    updateChecks: PropTypes.func.isRequired,
    updateCode: PropTypes.func.isRequired,
    updateSelectedProfile: PropTypes.func.isRequired,
    jobProfiles: PropTypes.array,
    nowDisplaying: PropTypes.string,
    allChecks: PropTypes.array,
    selectedprofile: PropTypes.string,
    selectedChecks: PropTypes.array
};

const mapStateToProps = state => ({
    jobProfiles: state.jobProfileState.jobProfiles,
    nowDisplaying: state.jobProfileState.nowDisplaying,
    allChecks: state.jobProfileState.allChecks,
    selectedChecks: state.jobProfileState.selectedChecks,
    code: state.jobProfileState.code,
    selectedProfile: state.jobProfileState.selectedProfile
});

const mapActionsToProps = (dispatch) => ({
    fetchJobProfiles: bindActionCreators(JobProfileActions.fetchJobProfiles, dispatch),
    updateSelectedProfile: bindActionCreators(JobProfileActions.updateSelectedProfile, dispatch),
    fetchAllChecks: bindActionCreators(JobProfileActions.fetchAllChecks, dispatch),
    updateDisplay: bindActionCreators(JobProfileActions.updateDisplay, dispatch),
    updateChecks: bindActionCreators(JobProfileActions.updateChecks, dispatch),
    updateCode: bindActionCreators(JobProfileActions.updateCode, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps) (CreateJobProfile);