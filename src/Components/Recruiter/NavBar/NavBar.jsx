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
        
    }

    handleMenuButton() {
        if (this.state.isTopNav) {
            this.setState( { isTopNav: false } );
        } else {
            this.setState( { isTopNav: true } );
        }
    }

    render() {
        //check online or offline
			
        return (
            <div>
                <div className="navbar">
                    <div className={this.state.isTopNav ? 'topnav' : 'topnav responsive'} id="myTopnav">
                        <div className="noHover">
                            <a className="centerLogo">
                                <img id="logo" src={Logo} alt="clickncheck" />
                            </a>
                            <a className="icon" onClick={this.handleMenuButton}>
                                <FaBars />
                            </a>
                        </div>
                        
                        <div id="mobile">
                            <a href="#" className="active">
                                <img
                                    src={Dashboard} 
                                    alt="clickncheck"
                                    height="20px"
                                    width="30px" />
                    Dashboard
                            </a>
                            <a href="/NewVerificationRequest">
                                <img
                                    src={VerificationRequest} 
                                    alt="clickncheck"
                                    height="20px"
                                    width="30px" />
                    Verification Request
                            </a>
                            <a href="#">
                                <img
                                    src={JobProfile}
                                    alt="clickncheck"
                                    height="20px"
                                    width="30px" />
                Job Profiles
                            </a>
                            <a href="#">
                                <img
                                    src={Reports} 
                                    alt="clickncheck"
                                    height="20px"
                                    width="30px" />
                Reports
                            </a>
                            <a href="#">
                                <img
                                    src={Candidates} 
                                    alt="clickncheck"
                                    height="20px"
                                    width="30px" />
                Candidates
                            </a>
                            <button id="toggle" type="button" className={navigator.onLine ? 'btn btn-sm btn-secondary btn-toggle active' : 'btn btn-sm btn-secondary btn-toggle' } data-toggle="button" aria-pressed="false" autoComplete="off">
                                <div className="handle"></div>
                            </button>
                        </div>
                        <div id="user">
                            <img id="user_img" className="user" src={sessionStorage.getItem('user_img')}/>
                            <label className="user" id="user_name">{sessionStorage.getItem('user_name')}</label><FaAngleDown id="angleDown"/>
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