import React from 'react';
import ReactSelect from './ReactSelect';
import './ViewRecruiterJP.scss';
import { FaAngleRight } from 'react-icons/fa';
import JobProfile from '../../../Assets/job_profile.svg';
import userImg from '../../../Assets/user.svg';
import axios from 'axios';
import { BASE_URL, GET_RECRUITERS, GET_RECRUITER_JOB_PROFILE } from '../../../Shared/Constants';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import Footer from '../../Shared/Footer/Footer';
import { ZERO } from '../../../Shared/IntConstants';

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
        this.setState({
            selectedRecruiter: e.target.value === 'Select Recruiter' ? e.target.value : this.state.recruiters.filter(r => r.value === parseInt(e.target.value, 10))[ZERO].label,
            recruiterID: e.target.value
            
        });
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' +sessionStorage.getItem('token')
            }
        };
        axios.get(BASE_URL + GET_RECRUITER_JOB_PROFILE + e.target.value, config)
            .then((response) => {
                response.data.map((index) => {
                    console.log(index);
                    arr.push({ title :index.title, id:index.id, code :index.jobCode } );
                });
                this.setState({
                    JobProfiles: arr
                });
            });
       
    }
    render() {
        const recruiters = this.state.recruiters.map((item, index) => <option key={index} value={item.value}>{item.label}</option>);

        return (
            <div>
                <AdminNavBar/>
                <div className="ViewRecruiterJP">
                
                    <div className="title">
                        <p>Dashboard <span id="bold"> &gt; Recruiter Overview</span></p>
                    </div>

                    <div className="head">
                        <label id="headTitle">Recruiter Overview</label>
                        <select id="selectElement" onChange={this.handleRecruiterChange}><option>Select Recruiter</option>{recruiters}</select>
                    </div>
            
                    <div id="contTable">
                        { 
                            this.state.selectedRecruiter === 'Select Recruiter' ? 
                                <p>Please select a recruiter</p> : 
                        
                                this.state.JobProfiles.length > ZERO ? <div id="table">
                                    <div className="tHead">
                                        <div className="tHeading">
                                            <label >Job Code</label>
                                        </div>
                                        <div className="tHeading">
                                            <label>Job Title</label>
                                        </div>
                                    </div>
                                    {
                                        this.state.JobProfiles.map((index, row) => {
                                            return (
                                                <div key={row} className="tBody" id="row">
                                                    <div className="tContent">
                                                        <label>{index.code}</label>
                                                    </div>
                                                    <div className="tContent">
                                                        <label>{index.title}</label>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                    
                                </div> : <p>No job profiles found for {this.state.selectedRecruiter}</p>
                        }
                        
                    </div>
                
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
                    response.Recruiters.forEach((recruiters) => {
                        arr.push({
                            id: recruiters.ID,
                            value: recruiters.ID,
                            label: recruiters.Name + ' ' + recruiters.Surname
                        });
                    });
                    this.setState({ recruiters: arr });
                },
                (error) => {
                    alert(error);
                });
    }
}

export default ViewRecruiterJP;