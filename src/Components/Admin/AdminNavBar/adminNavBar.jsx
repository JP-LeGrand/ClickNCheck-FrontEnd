import React from 'react';
import './adminNavBar.scss';
import Logo from '../../../Assets/main.svg';
import Dashboard from '../../../Assets/dashboard.svg';
import VerificationRequest from '../../../Assets/verification.svg';
import JobProfile from '../../../Assets/job_profile.svg';
import Users from '../../../Assets/users.svg';
import Chevron from '../../../Assets/chevron.svg';
import 'typeface-roboto';

class adminNavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user_img: '',
            showContent: false
        };
        this.getLocation = this.getLocation.bind(this);
        this.logout = this.logout.bind(this);
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

    render() {
        return (
            <div className="adminNavBar">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light bg-white ">
                        <a className="navbar-brand" href="/admin/recuiterJopProfiles">
                            <img className="clickncheckLogo" src={Logo} alt="clickncheck" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link navItems" href="/admin/recuiterJopProfiles"><img className="navIcon ml-2 mr-2 " src={Dashboard} alt="clickncheck" /> Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className={ this.getLocation('/admin/recuiterJopProfiles') ? 'nav-link navItems active' : ' nav-link navItems inactive' } href="/admin/recuiterJopProfiles" ><img className="navIcon ml-2 mr-2" src={VerificationRequest} alt="clickncheck"/> Create Job Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className={ this.getLocation('/JobProfiles') ? 'nav-link navItems active' : ' nav-link navItems inactive' } href="/JobProfiles" ><img className="navIcon ml-2 mr-2" src={JobProfile} alt="clickncheck"/> Job Profiles</a>
                                </li>
                                <li className="nav-item">
                                    <a className={ this.getLocation('/Users') ? 'nav-link navItems active' : 'nav-link navItems inactive' } href="/Users"> <img className="navIcon ml-2 mr-2" src={Users} alt="clickncheck" /> Users</a>
                                </li>
                            </ul>
                    
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link user">
                                        <img id="user_img" className="img-circle mr-3" src={sessionStorage.getItem('user_img')} /> <span className="userName">{sessionStorage.getItem('user_name')}</span></a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle ml-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img className="drops ml-1 " src={Chevron} alt="clickncheck" /></a>
                                    <div className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="mailto:clickncheckservice@gmail.com?subject=User Profile Help"> Help</a>
                                        <a className="dropdown-item" href="#" onClick={() => this.logout()}> Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div> 
                    </nav>
                </div>
            </div>
            
            
        );
    }
}
export default adminNavBar;