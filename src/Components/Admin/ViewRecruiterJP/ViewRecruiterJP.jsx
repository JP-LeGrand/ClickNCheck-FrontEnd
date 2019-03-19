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
class ViewRecruiterJP extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            recruiters: [ 'name', 'name', 'name', 'name', 'name' ],
            selectedRecruiter: 'Select Recruiter'
        };
        this.handleRecruiterChange = this.handleRecruiterChange.bind(this);
    }
    handleRecruiterChange(e) {
        console.log('from e in vp:' + e);
        this.setState({ selectedRecruiter: e.value });
        console.log(this.state);
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
}

export default ViewRecruiterJP;