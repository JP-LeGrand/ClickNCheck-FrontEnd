import React from 'react';
import { connect } from 'react-redux';
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
        return (
            <div className="navbar">
                <div className={this.state.isTopNav ? 'topnav' : 'topnav responsive'} id="myTopnav">
                    <a>
                        <img id="/" src={Logo} alt="clickncheck" />
                    </a>
                    <a href="#" className="active">
                        <img id="logo" 
                            src={Dashboard} 
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                    Dashboard
                    </a>
                    <a href="#">
                        <img id="logo" 
                            src={VerificationRequest} 
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                    Verification Request
                    </a>
                    <a href="#">
                        <img id="logo" 
                            src={JobProfile}
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                Job Profiles
                    </a>
                    <a href="#">
                        <img id="logo" 
                            src={Reports} 
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                Reports
                    </a>
                    <a href="#">
                        <img id="logo" 
                            src={Candidates} 
                            alt="clickncheck"
                            height="20px"
                            width="30px" />
                Candidates
                    </a>
                    <a className="icon" onClick={this.handleMenuButton}>
                        <i className="fa fa-bars"></i>
                    </a>

                    <div>
                        <button id="toggle" type="button" className="btn btn-sm btn-secondary btn-toggle" data-toggle="button" aria-pressed="false" autoComplete="off">
                            <div className="handle"></div>
                        </button>
                    </div>

                    <div id="user">
                        <img id="user_img" src="data:image/jpeg;base64,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"/>
                        <label id="user_name">Mpinane Mohale</label><i className="glyphicon">&#xe114;</i>
                    </div>
                </div>         
            </div>
            
        );   
    }
}
export default connect()(NavBar);