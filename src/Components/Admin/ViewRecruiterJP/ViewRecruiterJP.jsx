import React from 'react';
import ReactSelect from './ReactSelect';
import './ViewRecruiterJP.scss';
import { FaAngleRight, FaMoneyBill } from 'react-icons/fa';
import Logo from '../../../Assets/main.svg';
import Dashboard from '../../../Assets/dashboard.svg';
import VerificationRequest from '../../../Assets/verification.svg';
import JobProfile from '../../../Assets/job_profile.svg';
import Reports from '../../../Assets/reports.svg';
import Candidates from '../../../Assets/candidates.svg';
import logoutImg from '../../../Assets/logout.svg';
import Calendar from '../../../Assets/calendar.svg';
import userImg from '../../../Assets/user.svg';
import { BASE_URL, GET_RECRUITERS, GET_RECRUITER_JOB_PROFILE } from '../../../Shared/Constants';
class ViewRecruiterJP extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            recruiters: [ ],
            selectedRecruiter: 'Select Recruiter',
            JobProfiles: []
        };
        this.handleRecruiterChange = this.handleRecruiterChange.bind(this);
    }
    handleRecruiterChange(e) {
        let arr = [];
        console.log('from e in vp:' + e);
        this.setState({ selectedRecruiter: e.value });
        console.log(this.state);
        fetch(BASE_URL + GET_RECRUITER_JOB_PROFILE + e.value, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    response.forEach((JobProfile) => {
                        arr.push({
                            JobProfile
                        });
                    });
                    this.setState({ JobProfiles: arr });
                },
                (error) => {
                    alert(error);
                });
    }
    render() {
        return (
            <div className="ViewRecruiterJP">
                <div className="title">
                    <p>Dashboard</p><FaAngleRight id="angleRight" /><p id="bold">Recruiter Overview</p>
                </div>
                <div className="head">
                    <div id="headTitle">Recruiter Overview</div>
                    <ReactSelect defaultRec={this.state.selectedRecruiter} recruiters={this.state.recruiters} handleRecruiterChange={this.handleRecruiterChange} />
                </div>
                <div id="contTable">
                    <div className="tHead">
                        <div className="tHeading">
                            <img className="hImage" src={JobProfile} alt="JP" />
                            <label >Job Profile</label>
                        </div>
                        <div className="tHeading">
                            <img className="hImage" src={Calendar} alt="RD" />
                            <label>Requested Date</label>
                        </div>
                        <div className="tHeading">
                            <img className="hImage" src={userImg} alt="REC" />
                            <label>Recruiter</label>
                        </div>
                        <div className="tHeading">
                            <FaMoneyBill className="hImage" />
                            <label>Spend</label>
                        </div>
                        <div className="tHeading">
                            <img className="hImage" src={Candidates} alt="CAN" />
                            <label>Candidates</label>
                        </div>
                    </div>   
                </div>
    
            </div>
        );    
    }

    componentDidMount() {
        let arr = [];
        fetch(BASE_URL + GET_RECRUITERS, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    console.log(response.Recruiters);

                    response.Recruiters.forEach((recruiters) => {
                        console.log(recruiters);
                        arr.push({
                            id: recruiters.ID,
                            value: recruiters.ID,
                            label: recruiters.Name + ' ' + recruiters.Surname
                        });
                    });
                    this.setState({ recruiters: arr });
                    console.log(this.state);
                },
                (error) => {
                    alert(error);
                });
    }
}

export default ViewRecruiterJP;