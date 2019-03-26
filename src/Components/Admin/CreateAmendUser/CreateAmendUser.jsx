import React, { Component } from 'react';
import { connect } from 'react-redux';
import userImg from '../../../Assets/user.svg';
import emailImg from '../../../Assets/email.svg';
import phoneImg from '../../../Assets/phone.svg';
import mainImg from '../../../Assets/main.svg';
import email from '../../../Assets/email.svg';
import phone from '../../../Assets/phone.svg';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL, GET_ALL_JOB_PROFILES, CREATE_AMEND_USER } from '../../../Shared/Constants';
import { ONE } from '../../../Shared/IntConstants';
import './CreateAmendUser.scss';

class CreateAmendUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            Name: '',
            Surname: '',
            Email: '',
            Phone: '',
            StartDate: '',
            EndDate: '',
            rec_jobprofiles: '',
            rec_roles: '',
            allJobProfiles: '',
            roles: [
                {
                    id: 3,
                    role: 'Recruiter'
                } ]

        };

        this.allJobProfiles = this.allJobProfiles.bind(this);
        this.startDateHandler = this.startDateHandler.bind(this);
        this.endDateHandler = this.endDateHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.surnameHandler = this.surnameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.rolesHandler = this.rolesHandler.bind(this);
        this.jobsHandler = this.jobsHandler.bind(this);
        this.allJobProfiles();
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
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    startDateHandler(event) {
        this.setState({ StartDate: event.target.value });
    }

    endDateHandler(event) {
        this.setState({ EndDate: event.target.value });
    }

    nameHandler(event) {
        this.setState({ Name: event.target.value });
    }

    surnameHandler(event) {
        this.setState({ Surname: event.target.value });
    }

    phoneHandler(event) {
        this.setState({ Phone: event.target.value });
    }

    emailHandler(event) {
        this.setState({ Email: event.target.value });
    }

    rolesHandler(event) {
        if (this.state.rec_roles === ''){
            this.setState({ rec_roles: event.target.value });
        } else {
            this.setState({ rec_roles: this.state.rec_roles + ',' + event.target.value });
        }
        
    }

    jobsHandler(event) {
        if (this.state.rec_jobprofiles === ''){
            this.setState({ rec_jobprofiles: event.target.value });
        } else {
            this.setState({ rec_jobprofiles: this.state.rec_jobprofiles + ',' + event.target.value });
        }
    }

    handleSubmit(event) {
        let body = {
            'users': [ {
                'Name': this.state.Name,
                'Surname': this.state.Surname,
                'Phone': this.state.Phone,
                'Email': this.state.Email
            } ],
            'usertypes': [ this.state.rec_roles ],
            'jobprofiles': [ this.state.rec_jobprofiles ]
        };  

        event.preventDefault();
        this.setState({ isLoading: true }, () => { 
            fetch(BASE_URL + CREATE_AMEND_USER, {
                method: 'POST',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem('token')
                },
                redirect: 'manual', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then(
                    response => {
                        alert(response);
                    }, (error) => {
                        this.setState({
                            isLoading: false
                        });
                        alert(error);
                    }
                );
        });
    }

    render() {
        
        const jobresultItems = Object.entries(this.state.allJobProfiles).map((item,index) => <option key={index} value={item[ONE]['ID']}>{item[ONE]['JobCode']} - {item[ONE]['Title']}</option>
        
        );

        const roleresultItems = this.state.roles.map((item,index) => <option key={index} value={item.id}>{item.role}</option>
        
        );
        return (
            <div className="createAmendUser">
                < AdminNavBar />
                <p>Create/Amend user</p>
                <div className="mainSection">  
                    <div className="userSummary">
                        <div id="usr_img">
                            <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"/>
                        </div>
                        
                        <div id="heading">
                            <label id="name">Mpinane Mohale</label>
                            <label id="roles"><b>Admin, Recruiter</b></label>
                        </div>
                    </div>

                    <div className="details">
                        <table>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Start and End Date</label>
                                        <br/>
                                        <span className="dateLabel">start date</span>
                                        <input id="start_date" type="date" placeholder="&nbsp;" name="start_date" value={this.state.startDate} onChange={(event) => this.startDateHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <br/>
                                        <input id="name" placeholder="&nbsp;" name="name" value={this.state.Name} onChange={(event) => this.nameHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <br/>
                                        <input id="surname" placeholder="&nbsp;" name="surname" value={this.state.Surname} onChange={(event) => this.surnameHandler(event)} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <br/>
                                    <br/>
                                    <span className="dateLabel">end date</span>
                                    <input id="end_date" type="date" placeholder="&nbsp;" name="end_date" value={this.state.startDate} onChange={(event) => this.endDateHandler(event)} />
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <br/>
                                        <input id="phone" placeholder="&nbsp;" name="phone" value={this.state.Phone} onChange={(event) => this.phoneHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <br/>
                                        <input id="email" placeholder="&nbsp;" name="email" value={this.state.Email} onChange={(event) => this.emailHandler(event)} />
                                    </div>
                                </td>
                                
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Roles</label>
                                        <br/>
                                        <select onChange={this.rolesHandler}><option>...</option>{roleresultItems}</select>
                                    </div>

                                </td>
                                <td>
                                    <div className="form-group">
                                        <label>Job Profile</label> 
                                        <br/>
                                        <select onChange={this.jobsHandler}><option>...</option>{jobresultItems}</select>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <button id="apply" onClick={(event) => this.handleSubmit(event)}>APPLY</button> <button id="deactivate">DEACTIVATE USER</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect()(CreateAmendUser);