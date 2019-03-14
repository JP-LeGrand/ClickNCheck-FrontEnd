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
            <div className="navbar">
                <div className={this.state.isTopNav ? 'topnav' : 'topnav responsive'} id="myTopnav">
                    <a className="icon" onClick={this.handleMenuButton}>
                        <FaBars />
                    </a>
                    <a className="centerLogo">
                        <img id="logo" src={Logo} alt="clickncheck" />
                    </a>
                    <a href="#" className="active">
                        <img
                            src={Dashboard} 
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                    Dashboard
                    </a>
                    <a href="#">
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
                    <div id="user">
                        <img id="user_img" className="user" src="data:image/png;base64,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"/>
                        <label className="user" id="user_name">Mpinane Mohale</label><FaAngleDown id="angleDown"/>
                    </div>
                    
                </div>         
            </div>
            
        );   
    }
}
export default connect()(NavBar);