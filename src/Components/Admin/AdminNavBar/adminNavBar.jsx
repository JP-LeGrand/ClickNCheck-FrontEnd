import React from 'react';
import './adminNavBar.scss';
import Logo from '../../../Assets/main.svg';
import Dashboard from '../../../Assets/dashboard.svg';
import VerificationRequest from '../../../Assets/verification.svg';
import JobProfile from '../../../Assets/job_profile.svg';
import Reports from '../../../Assets/reports.svg';
import Candidates from '../../../Assets/candidates.svg';
import Users from '../../../Assets/users.svg';
import Notification from '../../../Assets/notification.svg';
import { FaBars, FaAngleDown } from 'react-icons/fa';
import 'typeface-roboto';
import logoutImg from '../../../Assets/logout.svg';

class adminNavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isTopNav: true,
            user_img: '',
            isTopNav: true,
            showContent: false
        };
        this.handleMenuButton = this.handleMenuButton.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.logout = this.logout.bind(this);
        this.btnShow = this.btnShow.bind(this);
        this.btnUnshow = this.btnUnshow.bind(this);
    }

    handleMenuButton() {
        if (this.state.isTopNav) {
            this.setState({ isTopNav: false });
        } else {
            this.setState({ isTopNav: true });
        }
    }

    getLocation(loc) {
        let currLocation = window.location.toString();
        let zero = 0;
        if (currLocation.indexOf(loc) > zero) {
            return true;
        }

        return false;
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location = '/';
    }
    btnShow() {
        this.setState({ showContent: true });
    }
    btnUnshow() {
        this.setState({ showContent: false });
    }

    render() {
        return (
            <div className="adminNavBar">
                <div className="navbar">
                    <div
                        className={this.state.isTopNav ? 'topnav' : 'topnav responsive'}
                        id="myTopnav"
                    >
                        <div className="noHover">
                            <a className="centerLogo" href="/admin/recuiterJopProfiles">
                                <img id="logo" src={Logo} alt="clickncheck" />
                            </a>
                            <a className="icon" onClick={this.handleMenuButton}>
                                <FaBars id="miniBars" />
                            </a>
                        </div>

                        <div id="mobile">
                            <a href="/admin/recuiterJopProfiles"
                                className={
                                    this.getLocation('/admin/recuiterJopProfiles')
                                        ? 'active'
                                        : 'inactive'
                                }>
                                <div className="navTab">
                                    <img className="navIcon" src={Dashboard} alt="clickncheck" />
                                    <label className="navLabel">Dashboard</label>
                                </div>
                            </a>
                            <a
                                href="/Admin/CreateJobProfile"
                                className={
                                    this.getLocation('/Admin/CreateJobProfile')
                                        ? 'active'
                                        : 'inactive'
                                }
                            >
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={VerificationRequest}
                                        alt="clickncheck"
                                    />
                                    <label className="navLabel">Create Job Profile</label>
                                </div>
                            </a>
                            <a href="/JobProfiles"
                                className={
                                    this.getLocation('/JobProfiles')
                                        ? 'active'
                                        : 'inactive'
                                }
                            >
                                <div className="navTab">
                                    <img className="navIcon" src={JobProfile} alt="clickncheck" />
                                    <label className="navLabel">Job Profiles</label>
                                </div>
                            </a>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img className="navIcon" src={Reports} alt="clickncheck" />
                                    <label className="navLabel">Reports</label>
                                </div>
                            </a>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img className="navIcon" src={Candidates} alt="clickncheck" />
                                    <label className="navLabel">Candidates</label>
                                </div>
                            </a>
                            <a href="/Admin/AddUser"
                                className={
                                    this.getLocation('/Admin/AddUser')
                                        ? 'active'
                                        : 'inactive'
                                }>
                                <div className="navTab">
                                    <img className="navIcon" src={Users} alt="clickncheck" />
                                    <label className="navLabel">Users</label>
                                </div>
                            </a>
                            <button
                                id="toggle"
                                type="button"
                                className={
                                    navigator.onLine
                                        ? 'btn btn-sm btn-secondary btn-toggle active'
                                        : 'btn btn-sm btn-secondary btn-toggle'
                                }
                                data-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                            >
                                <div className="handle" />
                            </button>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={Notification}
                                        alt="clickncheck"
                                    />
                                </div>
                            </a>
                            <div onMouseEnter={this.btnShow} onMouseLeave={this.btnUnshow} id="user">
                                <img id="user_img" className="user" src={sessionStorage.getItem('user_img')} />
                                <label className="user" id="user_name">{sessionStorage.getItem('user_name')}</label>
                                <div className="dropdown">
                                    <button className="dropbtn" onFocus={this.btnShow} onBlur={this.btnUnshow}><FaAngleDown id="angleDown" /></button>
                                    <div className="dropdown-content" style={{ display: this.state.showContent ? 'inherit' : 'none' }}>
                                        <a href="mailto:clickncheckservice@gmail.com?subject=User Profile Help">
                                            <label className="dropLabel">Help</label>
                                        </a>
                                        <a href="#" onClick={() => this.logout()}>
                                            <label className="dropLabel">logout</label>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={this.state.isTopNav ? 'main' : 'main responsive'} />
            </div>
        );
    }
}
export default adminNavBar;