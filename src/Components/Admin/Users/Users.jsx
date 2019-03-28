import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserResults from './UserResults';
import { BASE_URL, GET_ASSIGNED_JOB_PROFILES, GET_ALL_USERS, GET_RECRUITERS, GET_MANAGERS, GET_OPERATORS } from '../../../Shared/Constants';
import './Users.scss';
import imgLoading from '../../../Assets/Rolling.svg';

class Users extends Component {
    constructor(props) {
        super(props);
        this.allUsers();
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

    userChoice(event){
        if (event.target.value === 'All'){
            this.setState({
                results: 'All',
                loading: true
            });
            this.allUsers();
        } else if (event.target.value === 'Recruiters'){
            this.setState({
                results: 'Recruiters',
                loading: true
            });
            this.recruiters();
        } else if (event.target.value === 'Managers'){
            this.setState({
                results: 'Managers',
                loading: true
            }); 
            this.managers();
        } else if (event.target.value === 'Operators'){
            this.setState({
                results: 'Operators',
                loading: true
            }); 
            this.operators();
        }

    }

    assignRecruiter(event){
        alert('Assign' + event.target.id);
    }

    allUsers(){
        fetch(BASE_URL + GET_ALL_USERS, {
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
                    this.setState({ allJobProfiles: response.Users });
                    this.setState({ countTotalJobProfiles: Object.entries(response['Users']).length });
                    this.setState({ countJobProfiles: Object.entries(response['Users']).length });
                    this.setState({ loading: false });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    recruiters(){
        fetch(BASE_URL + GET_RECRUITERS, {
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
                    this.setState({ allJobProfiles: response.Recruiters });
                    this.setState({ countJobProfiles: Object.entries(response['Recruiters']).length });
                    this.setState({ loading: false });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    managers(){
        fetch(BASE_URL + GET_MANAGERS, {
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
                    this.setState({ allJobProfiles: response.Users });
                    this.setState({ countJobProfiles: Object.entries(response.Users).length });
                    this.setState({ loading: false });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    operators(){
        fetch(BASE_URL + GET_OPERATORS, {
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
                    this.setState({ allJobProfiles: response.Users });
                    this.setState({ countJobProfiles: Object.entries(response.Users).length });
                    this.setState({ loading: false });
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
                
                    <div className="headSection">
                        <p>Users</p>
                        <a href="/Admin/Users/CreateAmendUser"><button>CREATE USER</button></a>
                    </div>
                    <div className="mainSection">  
                        <div className="filter">
                            <div id="heading">
                                <label id="jp">Users</label>
                                <label id="count"><b>{this.state.countJobProfiles}</b>/{this.state.countTotalJobProfiles}</label>
                            </div>
                            <RadioGroup id="filter" defaultValue="All" className="radios classes.root" onClick={(event) => this.userChoice(event)}>
                                <FormControlLabel id="All" className="radio" value="All" control={<Radio disableRipple defaultChecked color="primary" />} label="All" />
                                <FormControlLabel id="Recruiters" className="radio" value="Recruiters" control={<Radio disableRipple color="primary"/>} label="Recruiters" />
                                <FormControlLabel id="Managers" className="radio" value="Managers" control={<Radio disableRipple color="primary"/>} label="Managers" />
                                <FormControlLabel id="Operators" className="radio" value="Operators" control={<Radio disableRipple color="primary"/>} label="Operators" />
                            </RadioGroup>
                        </div>

                        <div className="results">
                            {this.state.loading
                                ? <img id="loading" src={imgLoading} alt={'loading...'} />
                                : this.state.results === 'All' || this.state.results === 'Recruiters' || this.state.results === 'Managers' || this.state.results === 'Operator' ? < UserResults allJobProfiles={this.state.allJobProfiles} /> : <UserResults allJobProfiles={this.state.allJobProfiles} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        );
    } 
}
export default connect()(Users);