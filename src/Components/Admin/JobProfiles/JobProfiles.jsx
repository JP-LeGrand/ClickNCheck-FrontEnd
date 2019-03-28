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
        this.allJobProfiles();
        this.state = {
            results: 'there are no job profiles',
            allJobProfiles: '',
            countTotalJobProfiles: 0,
            countJobProfiles: 0
        };
        this.userChoice = this.userChoice.bind(this);
        this.assignRecruiter = this.assignRecruiter.bind(this);
        
    }

    userChoice(event){
        if (event.target.value === 'All'){
            this.setState({ results: 'All' });
            this.allJobProfiles();
        } else if (event.target.value === 'Assigned'){
            this.setState({ results: 'Assigned' });
            this.assignedJobProfiles();
        } else {
            this.setState({ results: 'Unassigned' }); 
            this.unassignedJobProfiles();
        }

    }

    assignRecruiter(event){
        alert('Assign' + event.target.id);
    }

    allJobProfiles(){
        fetch(BASE_URL + GET_ALL_JOB_PROFILES, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response => response.json())
            .then(
                response => {
                    this.setState({ allJobProfiles: response });
                    this.setState({ countTotalJobProfiles: Object.entries(response).length });
                    this.setState({ countJobProfiles: Object.entries(response).length });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    unassignedJobProfiles(){
        fetch(BASE_URL + GET_UNASSIGNED_JOB_PROFILES, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response => response.json())
            .then(
                response => {
                    this.setState({ allJobProfiles: response });
                    this.setState({ countJobProfiles: Object.entries(response).length });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    assignedJobProfiles(){
        fetch(BASE_URL + GET_ASSIGNED_JOB_PROFILES, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response => response.json())
            .then(
                response => {
                    this.setState({ allJobProfiles: response });
                    this.setState({ countJobProfiles: Object.entries(response).length });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    render() {
        return ( 
            <div>
                <AdminNavBar />
                <div className="jobProfiles">
                    <p>Job Profiles</p>
                    <div className="mainSection">  
                        <div className="filter">
                            <div id="heading">
                                <label id="jp">Job Profiles</label>
                                <label id="count"><b>{this.state.countJobProfiles}</b>/{this.state.countTotalJobProfiles}</label>
                            </div>
                            <RadioGroup id="filter" defaultValue="All" className="radios classes.root" onClick={(event) => this.userChoice(event)}>
                                <FormControlLabel id="All" className="radio" value="All" control={<Radio disableRipple defaultChecked color="primary" />} label="All" />
                                <FormControlLabel id="Assigned" className="radio" value="Assigned" control={<Radio disableRipple color="primary"/>} label="Assigned" />
                                <FormControlLabel id="Unassigned" className="radio" value="Unassigned" control={<Radio disableRipple color="primary"/>} label="Unassigned" />
                            </RadioGroup>
                        </div>

                        <div className="results">
                            {this.state.results==='All' || this.state.results==='Assigned' || this.state.results==='Unassigned' ? < JobProfileResults allJobProfiles={this.state.allJobProfiles} /> : <JobProfileResults allJobProfiles={this.state.allJobProfiles}/>}
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default connect()(JobProfiles);