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
import axios from 'axios';
import { BASE_URL, GET_RECRUITERS, GET_RECRUITER_JOB_PROFILE } from '../../../Shared/Constants';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import Footer from '../../Shared/Footer/Footer';

class ViewRecruiterJP extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            recruiters: [],
            selectedRecruiter: 'Select Recruiter',
            JobProfiles: [],
            recruiterID: null
        };
        this.handleRecruiterChange = this.handleRecruiterChange.bind(this);
    }
    
    handleRecruiterChange(e){
        let arr = [];
      
        console.log('from e in vp:' + e);
        this.setState({
            selectedRecruiter: e.label,
            recruiterID: e.value
        });
        console.log(this.state);
        axios.get(BASE_URL + GET_RECRUITER_JOB_PROFILE + e.value)
            .then((response) => {
                response.data.map((index, row) => {
                    console.log('row: ' + index.title);
                    arr.push({ title :index.title, id:index.id } );
                });
                console.log('arr: '+JSON.stringify(arr));
                this.setState({
                    JobProfiles: arr
                });
                console.log('JPstate: '+this.state.JobProfiles);
            });
       
    }
    render() {
        return (
            <div className="ViewRecruiterJP">
                <AdminNavBar/>
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
                            <img className="hImage" src={userImg} alt="REC" />
                            <label>Recruiter</label>
                        </div>
                    </div>
                    {
                        this.state.JobProfiles.map((index, row) => {
                            return (
                                <div key={row} className="tBody">
                                    <div className="tContent">
                                        <label>{index.title}</label>
                                    </div>
                                    <div className="tContent">
                                        <label>{this.state.selectedRecruiter}</label>
                                    </div>
                                </div>
                            );
                        })
                    }
                    
                </div>
                <Footer />
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