import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import JobProfileResults from './JobProfileResults';
import { BASE_URL, GET_ALL_JOB_PROFILES, GET_UNASSIGNED_JOB_PROFILES, GET_ASSIGNED_JOB_PROFILES } from '../../../Shared/Constants';
import './JobProfiles.scss';
import imgLoading from '../../../Assets/Rolling.svg';
import ReactAI from 'react-appinsights';
import Footer from '../../Shared/Footer/Footer';
import { ToastContainer, toast } from 'mdbreact';

class JobProfiles extends Component {
    constructor(props) {
        super(props);
        this.allJobProfiles();
        this.state = {
            results: 'there are no job profiles',
            allJobProfiles: '',
            countTotalJobProfiles: 0,
            countJobProfiles: 0,
            loading: true
        };
        this.userChoice = this.userChoice.bind(this);
        this.assignRecruiter = this.assignRecruiter.bind(this);
        
    }
    newJobProfile(e){
        window.location = '/Admin/CreateJobProfile';
    }

    userChoice(event){
        if (event.target.value === 'All'){
            this.setState({
                results: 'All',
                loading: true
            });
            this.allJobProfiles();
        } else if (event.target.value === 'Assigned'){
            this.setState({
                results: 'Assigned',
                loading: true
            });
            this.assignedJobProfiles();
        } else {
            this.setState({
                results: 'Unassigned',
                loading: true
            });
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
                    this.setState({ loading: false });
                },
                () => {
                    this.setState({
                        loading: false
                    });
                    toast.error('Error loading job profiles. Please refresh',{
                        autoClose : 3500
                    });
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
                    this.setState({ loading: false });
                },
                () => {
                    this.setState({
                        loading: false
                    });
                    toast.error('Error loading unassigned job profiles. Please refresh',{
                        autoClose : 3500
                    });
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
                    this.setState({ loading: false });
                },
                () => {
                    this.setState({
                        loading: false
                    });
                    toast.error('Error loading assinged job profiles. Please reload');
                }
            );
    }

    render() {
        return ( 
            <Fragment>
                <ToastContainer 
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <AdminNavBar />
                <div className="container">

                    <div className="dashNav">
                        <p>Dashboard <span id="bold"> &gt; Existing Job Profiles</span></p>
                    </div>
                    <h1 id="title">Job Profiles</h1>

                    <div className="mainSection">  
                        <div className="row">
                            <div className="col-sm">
                                <label className="heading d-block" id="jp">Job Profiles</label>
                                <label className="heading d-block" id="count"><b>{this.state.countJobProfiles}</b>/{this.state.countTotalJobProfiles}</label>
                            </div>
                           
                            <div className="col-sm">
                                <RadioGroup id="filter" defaultValue="All" className="radios classes.root d-inline" onClick={(event) => this.userChoice(event)}>
                                    <FormControlLabel id="All" className="radio" value="All" control={<Radio disableRipple defaultChecked color="primary" />} label="All" />
                                    <FormControlLabel id="Assigned" className="radio" value="Assigned" control={<Radio disableRipple color="primary"/>} label="Assigned" />
                                    <FormControlLabel id="Unassigned" className="radio" value="Unassigned" control={<Radio disableRipple color="primary"/>} label="Unassigned" />
                                </RadioGroup>
                            </div>
                            
                            <div className="col-sm">
                                <button type="button" className="btn btn-secondary float-right" id ="add" onClick={(event) => this.newJobProfile(event)}>Add Job Profile</button>
                            </div>
                        </div>

                        <div className="results">
                            {this.state.loading
                                ? <img id="loading" src={imgLoading} alt={'loading...'} />
                                : this.state.results === 'All' || this.state.results === 'Assigned' || this.state.results === 'Unassigned' ? < JobProfileResults allJobProfiles={this.state.allJobProfiles} /> : <JobProfileResults allJobProfiles={this.state.allJobProfiles} />
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
export default ReactAI.withTracking(connect()(JobProfiles));