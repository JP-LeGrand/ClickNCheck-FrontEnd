import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import JobProfileResults from './JobProfileResults';
import { BASE_URL, GET_ALL_JOB_PROFILES, GET_UNASSIGNED_JOB_PROFILES, GET_ASSIGNED_JOB_PROFILES } from '../../../Shared/Constants';
import './JobProfiles.scss';

class JobProfiles extends Component {
    constructor(props) {
        super(props);
        this.userChoice = this.userChoice.bind(this);
        this.assignRecruiter = this.assignRecruiter.bind(this);
        
    }
       
    render() {
        return ( 
            <div className="jobProfiles">
                <AdminNavBar />
                <p>Job Profiles</p>
                <div className="mainSection">  
                    <ul id='progress_bar'>
                        <li class="active">Create Job Profile Name</li>
                        <li>Select verification checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li> 
                    </ul>
                </div>
            </div>
        );
    }
}
export default connect()(JobProfiles);