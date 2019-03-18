import React from 'react';
import { connect } from 'react-redux';
import './NavBar.scss';
import Logo from '../../../Assets/main.svg';
import Dashboard from '../../../Assets/dashboard.svg'; 
import VerificationRequest from '../../../Assets/verification.svg'; 
import JobProfile from '../../../Assets/job_profile.svg'; 
import Reports from '../../../Assets/reports.svg'; 
import Candidates from '../../../Assets/candidates.svg'; 
import { FaBars , FaAngleDown } from 'react-icons/fa';
import 'typeface-roboto';

class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user_img: '',
            isTopNav: true
        };
        this.handleMenuButton = this.handleMenuButton.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    handleMenuButton() {
        if (this.state.isTopNav) {
            this.setState( { isTopNav: false } );
        } else {
            this.setState( { isTopNav: true } );
        }
    }

    getLocation(loc) {
        let currLocation = window.location.toString();
        let zero = 0;
        if ( currLocation.indexOf(loc) > zero){
            return true;
        }

        return false;
    }

    render() {
        //check online or offline
			
        return (
            <div>
                <div className="navbar">
                    <div className={this.state.isTopNav ? 'topnav' : 'topnav responsive'} id="myTopnav">
                        <div className="noHover">
                            <a className="centerLogo" href="#">
                                <img id="logo" src={Logo} alt="clickncheck" />
                            </a>
                            <a className="icon" onClick={this.handleMenuButton}>
                                <FaBars id="miniBars" />
                            </a>
                        </div>
                        
                        <div id="mobile">
                            <a href="#" className="">
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={Dashboard}
                                        alt="clickncheck" />
                                    <label className="navLabel">Dashboard</label>
                                </div>
                            </a>
                            <a href="/NewVerificationRequest" className={ this.getLocation('/NewVerificationRequest') ? 'active' : 'inactive' }>
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={VerificationRequest}
                                        alt="clickncheck" />
                                    <label className="navLabel">Verification Request</label>
                                </div>
                            </a>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={JobProfile}
                                        alt="clickncheck" />
                                    <label className="navLabel">Job Profiles</label>
                                </div>
                            </a>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={Reports}
                                        alt="clickncheck" />
                                    <label className="navLabel">Reports</label>
                                </div>
                            </a>
                            <a href="#" className="">
                                <div className="navTab">
                                    <img
                                        className="navIcon"
                                        src={Candidates}
                                        alt="clickncheck" />
                                    <label className="navLabel">Candidates</label>
                                </div>  
                            </a>
                            <button id="toggle" type="button" className={navigator.onLine ? 'btn btn-sm btn-secondary btn-toggle active' : 'btn btn-sm btn-secondary btn-toggle' } data-toggle="button" aria-pressed="false" autoComplete="off">
                                <div className="handle"></div>
                            </button>
                            <div id="user">
                                <img id="user_img" className="user" src={sessionStorage.getItem('user_img')} />
                                <label className="user" id="user_name">{sessionStorage.getItem('user_name')}</label><FaAngleDown id="angleDown" />
                            </div>
                        </div>
                        
                    </div>         
                </div>

                <div className={this.state.isTopNav ? 'main' : 'main responsive'}>

                </div>
            </div>
            
        );   
    }
}
export default connect()(NavBar);