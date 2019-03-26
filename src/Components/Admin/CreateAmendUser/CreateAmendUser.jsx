import React, { Component } from 'react';
import { connect } from 'react-redux';
import userImg from '../../../Assets/user.svg';
import emailImg from '../../../Assets/email.svg';
import phoneImg from '../../../Assets/phone.svg';
import mainImg from '../../../Assets/main.svg';
import email from '../../../Assets/email.svg';
import phone from '../../../Assets/phone.svg';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL, GET_ALL_JOB_PROFILES, CREATE_AMEND_USER, GET_MANAGERS } from '../../../Shared/Constants';
import { ONE, ZERO } from '../../../Shared/IntConstants';
import './CreateAmendUser.scss';

class CreateAmendUser extends Component {
    constructor(props) {
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
            rec_manager: '',
            all_managers: '',
            allJobProfiles: '',
            roles: [
                {
                    id: 3,
                    role: 'Recruiter'
                },
                {
                    id: 4,
                    role: 'Manager'
                },
                {
                    id: 5,
                    role: 'Operator'
                } ]

        };

        this.allJobProfiles = this.allJobProfiles.bind(this);
        this.allManagers = this.allManagers.bind(this);
        this.startDateHandler = this.startDateHandler.bind(this);
        this.endDateHandler = this.endDateHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.surnameHandler = this.surnameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.rolesHandler = this.rolesHandler.bind(this);
        this.jobsHandler = this.jobsHandler.bind(this);
        this.managerHandler = this.managerHandler.bind(this);
        this.allJobProfiles();
        this.allManagers();
    }

    allJobProfiles() {
        fetch(BASE_URL + GET_ALL_JOB_PROFILES, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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

    allManagers() {
        fetch(BASE_URL + GET_MANAGERS, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response => response.json())
            .then(
                response => {
                    this.setState({ all_managers: response.Users });
                    console.log(Object.entries(this.state.all_managers));
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
        if (this.state.rec_roles === '') {
            this.setState({ rec_roles: event.target.value });
        } else {
            this.setState({ rec_roles: this.state.rec_roles + ',' + event.target.value });
        }

    }

    jobsHandler(event) {
        if (this.state.rec_jobprofiles === '') {
            this.setState({ rec_jobprofiles: event.target.value });
        } else {
            this.setState({ rec_jobprofiles: this.state.rec_jobprofiles + ',' + event.target.value });
        }
    }

    managerHandler(event) {
        this.setState({ rec_manager: event.target.value });
    }

    handleSubmit(event) {
        let body = {
            'users': [ {
                'Name': this.state.Name,
                'Surname': this.state.Surname,
                'Phone': this.state.Phone,
                'Email': this.state.Email,
                'StartDate': this.state.StartDate,
                'EndDate': this.state.EndDate,
                'ManagerID': this.state.rec_manager
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
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                redirect: 'manual', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(body),
            })
                .then(
                    () => {
                        alert('User Created');
                        window.location = '/Users';
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

        const job_resultItems = Object.entries(this.state.allJobProfiles).map((item, index) => <option key={index} value={item[ONE].ID}>{item[ONE].JobCode} - {item[ONE].Title}</option>

        );

        const role_resultItems = this.state.roles.map((item, index) => <option key={index} value={item.id}>{item.role}</option>

        );

        const manager_resultItems = Object.entries(this.state.all_managers).map((item, index) => <option key={index} value={item[ONE].ID}>{item[ONE].Name + ' ' + item[ONE].Surname}</option>

        );
        return (
            <div className="createAmendUser">
                < AdminNavBar />
                <p>Create/Amend user</p>
                <div className="mainSection">
                    <div className="userSummary">
                        <div id="usr_img">
                            <img src="data:image/png;base64,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" />
                        </div>

                        <div id="heading">
                        </div>
                    </div>

                    <div className="details">
                        <table>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Start and End Date</label>
                                        <br />
                                        <span className="dateLabel">start date</span>
                                        <input id="start_date" type="date" placeholder="&nbsp;" name="start_date" value={this.state.startDate} onChange={(event) => this.startDateHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <br />
                                        <input id="name" placeholder="&nbsp;" name="name" value={this.state.Name} onChange={(event) => this.nameHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <br />
                                        <input id="surname" placeholder="&nbsp;" name="surname" value={this.state.Surname} onChange={(event) => this.surnameHandler(event)} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <br />
                                    <span className="dateLabel">end date</span>
                                    <input id="end_date" type="date" placeholder="&nbsp;" name="end_date" value={this.state.startDate} onChange={(event) => this.endDateHandler(event)} />
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <br />
                                        <input id="phone" placeholder="&nbsp;" name="phone" value={this.state.Phone} onChange={(event) => this.phoneHandler(event)} />
                                    </div>
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <br />
                                        <input id="email" placeholder="&nbsp;" name="email" value={this.state.Email} onChange={(event) => this.emailHandler(event)} />
                                    </div>
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Manager</label>
                                        <br />
                                        <select onChange={this.managerHandler}><option>...</option>{manager_resultItems}</select>
                                    </div>

                                </td>
                                <td>
                                    <div className="form-group">
                                        <label>Roles</label>
                                        <br />
                                        <select onChange={this.rolesHandler}><option>...</option>{role_resultItems}</select>
                                    </div>

                                </td>
                                <td>
                                    <div className="form-group">
                                        <label>Job Profile</label>
                                        <br />
                                        <select onChange={this.jobsHandler}><option>...</option>{job_resultItems}</select>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <button id="apply" onClick={(event) => this.handleSubmit(event)}>APPLY</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect()(CreateAmendUser);