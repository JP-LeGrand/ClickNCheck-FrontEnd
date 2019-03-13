import React from 'react';
import './NavBar.scss';
import Logo from '../../../Assets/main.svg';
import Dashboard from '../../../Assets/dashboard.svg'; 
import VerificationRequest from '../../../Assets/verification.svg'; 
import JobProfile from '../../../Assets/job_profile.svg'; 
import Reports from '../../../Assets/reports.svg'; 
import Candidates from '../../../Assets/candidates.svg'; 
class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        /*
        //check online or offline
        if (navigator.onLine) {
            $('.btn-toggle').toggleClass('active');
            $('#toggle').attr('disabled', 'disabled');
        }

        //get logged in user and their image
        $('#user_name').text(sessionStorage.getItem('user_name'));
        $('#user_img').attr('src', sessionStorage.getItem('user_img'));*/
    }
    render() {
        return (
            <div className="recruiterNavBar">
                <div className="topnav">
                    <a href="../recruiterDashboard/recruiter_dashboard.html">
                        <img
                            id="home"
                            src={Logo}
                            alt="clickncheck"
                        />
                    </a>
                    <a href="/recruiter/dashboard">
                        <img id="logo" src={Dashboard} alt="dashboard" />
                         Dashboard
                    </a>
                    <a className="active"
                        href="/recruiter/verifcation request" >
                        <img
                            id="logo"
                            src={VerificationRequest}
                            alt="clickncheck"/>
                        Verification Request
                    </a>
                    <a href="#">
                        <img
                            id="logo"
                            src={JobProfile}
                            alt="clickncheck" />
                        Job Profiles
                    </a>
                    <a href="#">
                        <img
                            id="logo"
                            src={Reports}
                            alt="clickncheck" />
                        Reports
                    </a>
                    <a href="#">
                        <img
                            id="logo"
                            src={Candidates}
                            alt="clickncheck"/>
                        Candidates
                    </a>
                    {/* Rounded switch */}
                    <div>
                        <button
                            id="toggle"
                            type="button"
                            className="btn btn-sm btn-secondary btn-toggle"
                            data-toggle="button"
                            aria-pressed="false"
                            autoComplete="off"
                        >
                            <div className="handle" />
                        </button>
                    </div>

                    {/*logged in user*/}
                    <div id="user">
                        <label id="user_name" />
                        <i className="glyphicon">&#xe114;</i>
                    </div>
                </div>
            </div>
        );
    }
}
export default NavBar;