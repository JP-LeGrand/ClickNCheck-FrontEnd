import React, { Component } from 'react';
import { connect } from 'react-redux';
import smallx from '../../../Assets/smallx.svg';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL, GET_ALL_JOB_PROFILES, CREATE_AMEND_USER, GET_MANAGERS, GET_USER, CHANGE_STATUS } from '../../../Shared/Constants';
import { ZERO, ONE } from '../../../Shared/IntConstants';
import './CreateAmendUser.scss';
import { FaTimes } from 'react-icons/fa';

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
            Status: '',
            PictureUrl: 'data:image/png;base64,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',
            selected_roles: [],
            selected_jobs: [],
            rec_manager: '',
            all_managers: '',
            available_jobs: '',
            user_id: '',
            available_roles: [
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
                }
            ],
            applyClicked: false,
            phoneValid: '',
            emailValid: ''
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
        this.getUser = this.getUser.bind(this);
        this.removeJob = this.removeJob.bind(this);
        this.removeRole = this.removeRole.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    async componentDidMount(){
        await this.allJobProfiles();
        await this.allManagers();
        let url_string = window.location.href;
        let url = new URL(url_string);
        let id = url.searchParams.get('user_id');

        if (id !== null ){
            await this.getUser(id);
        }
    }

    async allJobProfiles() {
        await fetch(BASE_URL + GET_ALL_JOB_PROFILES, {
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
                    const jobs = [];
                    response.forEach(element => {
                        let job = { id: element.ID, title: element.Title, code: element.JobCode };
                        jobs.push(job);
                        
                    });
                    this.setState({ available_jobs: jobs });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    async allManagers() {
        await fetch(BASE_URL + GET_MANAGERS, {
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
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    changeStatus() {
        fetch(BASE_URL + CHANGE_STATUS + this.state.user_id, {
            method: 'PUT',
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
            .then(
                () => {
                    alert('status changed');
                    window.location.reload();
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                    window.location.reload();
                }
            );
    }

    async getUser(id) {
        
        await fetch(BASE_URL + GET_USER + id, {
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
                    this.setState({ user_id: id });
                    this.setState({ Name: response.Name });
                    this.setState({ Surname: response.Surname });
                    this.setState({ Email: response.Email });
                    this.setState({ Phone: response.Phone });
                    this.setState({ StartDate: response.StartDate });
                    this.setState({ EndDate: response.EndDate });
                    this.setState({ PictureUrl: response.PictureUrl });
                    this.setState({ rec_manager: response.ManagerID });
                    this.setState({ selected_roles: response.Roles });
                    this.setState({ selected_jobs: response.JobProfiles });
                    this.setState({ Status: response.Status });
                    this.state.selected_roles.forEach(element => {
                        this.setState({ available_roles: this.state.available_roles.filter(item => item.id !== element.id) });
                    });
                    this.state.selected_jobs.forEach(element => {
                        this.setState({ available_jobs: this.state.available_jobs.filter(item => item.id !== element.id) });
                    });
                },
                error => {
                    this.setState({
                        loading: false
                    });
                    alert(error);
                }
            );
    }

    clearAll() {
        let remove_roles = [];
        this.state.selected_roles.forEach(element => {
            if (element.id !== ONE) {
                const role = { id: element.id, role: element.role };
                const available = [ ...this.state.available_roles ];
                available.push(role);
                remove_roles.push(role);
                this.setState( { available_roles: available });
            }
        });

        remove_roles.forEach(role => {
            this.setState( { selected_roles: this.state.selected_roles.filter(item => item.id !== role.id) });
        });

        let remove_jobs = [];
        this.state.selected_jobs.forEach(element => {
            const job = { id: element.id, title: element.title, code: element.code };
            const clearedJobs = [ ...this.state.available_jobs ];
            clearedJobs.push(job);
            remove_jobs.push(job);
            this.setState( { available_jobs: clearedJobs });
        });
        remove_jobs.forEach(job => {
            this.setState( { selected_jobs: this.state.selected_jobs.filter(item => item.id !== job.id) });
        });

        this.setState({ 
            Name: '' ,
            Surname: '',
            Email: '',
            Phone: '',
            StartDate: '',
            EndDate: '',
            rec_manager: ''
        });  
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
        let phone = event.target.value;
        if (phone.charAt(ZERO) === '0' && phone.match(/[0-9]{10}/)) {
            this.setState({ phoneValid: true });
        } else if (phone === '') {
            this.setState({ phoneValid: null });
        } else {
            this.setState({ phoneValid: false });
        }
    }

    emailHandler(event) {
        this.setState({ Email: event.target.value });
        let email = event.target.value;
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({ emailValid: true });
        } else if (email === '') {
            this.setState({ emailValid: null });
        } else {
            this.setState({ emailValid: false });
        }
    }

    rolesHandler(event) {
        let remove_role = '';
        this.state.available_roles.forEach(element => {
            if (parseInt(element.id, 10) === parseInt(event.target.value, 10)) {
                const role = { id: element.id, role: element.role };
                const newSelected = [ ...this.state.selected_roles ];
                newSelected.push(role);
                this.setState( { selected_roles: newSelected });
                remove_role = element;
            }
        });
        this.setState({ available_roles: this.state.available_roles.filter(item => item !== remove_role) } );
    }

    jobsHandler(event) {
        let remove_job = '';
        this.state.available_jobs.forEach(element => {
            if (parseInt(element.id, 10) === parseInt(event.target.value, 10)) {
                const job = { id: element.id, title: element.title, code: element.code };
                const newSelected = [ ...this.state.selected_jobs ];
                newSelected.push(job);
                this.setState( { selected_jobs: newSelected });
                remove_job = element;
            }
        });
        this.setState({ available_jobs: this.state.available_jobs.filter(item => item !== remove_job) } );

    }

    managerHandler(event) {
        this.setState({ rec_manager: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            applyClicked: true
        });
        let rec_jobprofiles = '';
        this.state.selected_jobs.forEach(element => {
            if (rec_jobprofiles === '') {
                rec_jobprofiles = element.id;
            } else {
                rec_jobprofiles = rec_jobprofiles + ',' + element.id;
            }

        });

        let rec_roles = '';
        this.state.selected_roles.forEach(element => {
            if (rec_roles === '') {
                rec_roles = element.id;
            } else {
                rec_roles = rec_roles + ',' + element.id;
            }

        });
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
            'usertypes': [ rec_roles ],
            'jobprofiles': [ rec_jobprofiles ]
        };
        event.preventDefault();
        this.setState({ isLoading: true }, () => {
            fetch(BASE_URL + CREATE_AMEND_USER + (this.state.user_id !== '' ? '?user_id=' + this.state.user_id : ''), {
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

    removeJob(job) {
        this.setState({ selected_jobs: this.state.selected_jobs.filter(item => item !== job) } );
        let avail_jobs = [ ...this.state.available_jobs ];
        avail_jobs.push(job);
        this.setState( { available_jobs: avail_jobs } );
    }

    removeRole(role) {
        this.setState({ selected_roles: this.state.selected_roles.filter(item => item !== role) } );
        let avail_roles = [ ...this.state.available_roles ];
        avail_roles.push(role);
        this.setState( { available_roles: avail_roles } );
    }
  
    render() {
        const job_resultItems = Object.entries(this.state.available_jobs).map((item, index) => <option key={index} value={item[ONE].id}>{item[ONE].code} - {item[ONE].title}</option>);

        const role_resultItems = this.state.available_roles.map((item, index) => <option key={index} value={item.id}>{item.role}</option>);

        const manager_resultItems = Object.entries(this.state.all_managers).map((item, index) => <option key={index} value={item[ONE].ID}>{item[ONE].Name + ' ' + item[ONE].Surname}</option>);

        const select_roles = Object.entries(this.state.selected_roles).map((item, index) => <li key={index}><label value={item[ONE].id}>{item[ONE].role}</label> {item[ONE].id !== ONE && <img onClick={() => this.removeRole(item[ONE])} src={smallx}/> }</li>);

        const s_roles = Object.entries(this.state.selected_roles).map((item, index) => item[ONE].role + ',');

        const select_jobs = Object.entries(this.state.selected_jobs).map((item, index) => <li key={index}><label value={item[ONE].id}>{item[ONE].title}</label><img onClick={() => this.removeJob(item[ONE])} src={smallx} /></li>);
        const FIELD_REQUIRED = <p className="error"> This Field Is Required</p>;
        
        return (
            <div className="createAmendUser">
                < AdminNavBar />
                <p>Create/Amend user</p>
                <div className="mainSection">
                    <div className="userSummary">
                        <div id="usr_img">
                            <img src={this.state.PictureUrl} />
                            <label id="name">{this.state.Name + ' ' + this.state.Surname}</label>
                            <label id="roles"><b>{s_roles}</b></label>
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
                                        <span className="dateLabel">end date</span>
                                        <input id="start_date" type="date" placeholder="&nbsp;" name="start_date" value={ this.state.user_id !== '' ? this.state.StartDate : null } onChange={(event) => this.startDateHandler(event)} />
                                    </div>
                                    {this.state.applyClicked && this.state.StartDate === '' && <FIELD_REQUIRED />}
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
                                    <input id="end_date" type="date" placeholder="&nbsp;" name="end_date" value={ this.state.user_id !== '' ? this.state.EndDate : null } onChange={(event) => this.endDateHandler(event)} />
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <br />
                                        <input id="phone" placeholder="&nbsp;" name="phone" maxLength="10" value={this.state.Phone} onChange={(event) => this.phoneHandler(event)} />
                                    </div>
                                    {this.state.phoneValid === true && <p className="success">Phone number is correct</p>}
                                    {this.state.phoneValid === false && <p className="error">Phone Number is incorrect</p>}
                                </td>

                                <td>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <br />
                                        <input id="email" placeholder="&nbsp;" name="email" value={this.state.Email} onChange={(event) => this.emailHandler(event)} />
                                    </div>
                                    {this.state.emailValid === true && <p className="success">Email is correct</p>}
                                    {this.state.emailValid === false && <p className="error">Email is incorrect</p> }
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Manager</label>
                                        <br />
                                        <select onChange={this.managerHandler} value={ this.state.user_id !== '' ? this.state.rec_manager : null }><option>...</option>{manager_resultItems}</select>
                                        
                                    </div>

                                </td>
                                <td>
                                    <div className="form-group">
                                        <label>Roles</label>
                                        <br />
                                        <ul>
                                            {select_roles}
                                        </ul>
                                        <select onChange={(event) => this.rolesHandler(event)}><option>...</option>{role_resultItems}</select>
                                    </div>

                                </td>
                                <td>
                                    <div className="form-group">
                                        <label>Job Profile(s)</label>
                                        <br />
                                        <ul>
                                            {select_jobs}
                                        </ul>
                                        <select onChange={(event) => this.jobsHandler(event)}><option>...</option>{job_resultItems}</select>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className="userButtons">
                            <div className="alignLeft">
                                <button id="btnClearAll" onClick={this.clearAll}>Clear All</button>
                            </div>
                            <div className="alignRight">
                                <button id="apply" onClick={(event) => this.handleSubmit(event)}>APPLY</button>
                                {this.state.user_id !== '' && <button id="btnDeactivate" onClick={this.changeStatus}><FaTimes id="closeIcon"/>{this.state.Status === 'Active' ? 'DEACTIVATE' : 'ACTIVATE'} USER</button>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}
export default connect()(CreateAmendUser);