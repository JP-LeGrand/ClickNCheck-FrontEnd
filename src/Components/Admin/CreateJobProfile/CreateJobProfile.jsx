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
            currentView: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.nextDisplay = this.nextDisplay.bind(this);
        this.prevDisplay = this.prevDisplay.bind(this);
        this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
    }

    handleChange(e){
        this.props.updateSelectedProfile(e);
    }

    onCheckBoxClicked(checks){
        this.props.updateChecks(checks);
    }

    nextDisplay(e){
        switch (this.props.nowDisplaying){
        case 'default':
            this.props.updateDisplay('selectVendors');
            this.setState({
                currentView: <div>
                    <SelectVendors allChecks={this.props.allChecks} onCheckBoxClicked={this.onCheckBoxClicked} />
                </div>
            });
        case 'selectVendors':
            this.props.updateDisplay('selectVendors');
            localStorage.setItem('services', this.props.selectedChecks);
            window.location = '/Admin/CreateJobProfilePage3';
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
            this.setState({
                currentView: <div>
                    <h3>Select Job profile</h3>
                    <ReactSelect defaultProf="e.g Job profile here" jobProfiles={this.props.jobProfiles} onSelectProfile={this.handleChange}/>
                </div>
            });
        }
    }

    render() {
        /**Run through the tasks array inside state and put each check on the left or right
         * side of the page depending on whether it came with the jobProfile or not
        */
        let jps = this.props.jobProfiles.forEach(element => {
            return element.title;
        });
        let codes = this.props.jobProfiles.forEach(element => {
            return element.jobCode;
        });
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
                    <ReactSelect defaultProf="e.g Job profile here" jobProfiles={jps} onSelectProfile={this.handleChange}/>
                    {this.state.currentView}
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
        this.props.fetchJobProfiles();
        this.props.updateDisplay('default');
    }
}

CreateJobProfile.propTypes = {
    fetchAllChecks: PropTypes.func.isRequired,
    fetchJobProfiles: PropTypes.func.isRequired,
    updateDisplay: PropTypes.func.isRequired,
    updateChecks: PropTypes.func.isRequired,
    jobProfiles: PropTypes.array,
    nowDisplaying: PropTypes.string,
    allChecks: PropTypes.array,
};

const mapStateToProps = state => ({
    jobProfiles: state.jobProfileState.jobProfiles,
    nowDisplaying: state.jobProfileState.nowDisplaying,
    allChecks: state.jobProfileState.allChecks,
    selectedChecks: state.jobProfileState.selectedChecks
});

const mapActionsToProps = (dispatch) => ({
    fetchJobProfiles: bindActionCreators(JobProfileActions.fetchJobProfiles, dispatch),
    updateSelectedProfile: bindActionCreators(JobProfileActions.updateSelectedProfile, dispatch),
    fetchAllChecks: bindActionCreators(JobProfileActions.fetchAllChecks, dispatch),
    updateDisplay: bindActionCreators(JobProfileActions.updateDisplay, dispatch),
    updateChecks: bindActionCreators(JobProfileActions.updateChecks, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps) (CreateJobProfile);