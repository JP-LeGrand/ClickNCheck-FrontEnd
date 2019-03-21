import React from 'react';
import Footer from '../../../Shared/Footer/Footer';
import AdminNavBar from '../../AdminNavBar/adminNavBar';
import check from '../../../../Assets/green_check.svg';
import './CreateJobProfilePage4.scss';
import 'typeface-roboto';
class CreateJobProfilePage4 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: 'Software Developer',
            jobCode:''
        };
        //get this value from local storage or
        //it is passed to you at creation of page 
        // 1. Job profile name and code. 
        // Joseph did this page.
        // you pass him the Job profile name and code.
        // after you have saved them into the database.
        // you do this in page 3.
        this.logout = this.logout.bind(this);
    }
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location = '/';
    }
    render() {
        return (
            
            <div className="createJobProfilePage4">
                <AdminNavBar />
                <div className="title">
                    New job profile
                    </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Job Profile Name</li>
                        <li className="active">Select verification checks</li>
                        <li className="active">Re-order Check Sequence</li>
                        <li className="active">Next Steps</li>
                    </ul>
                    <div className="body">
                        <img src={check} />
                        <h1 id="congrats">Congratulations!</h1>
                        <p>You have successfully created a new Job Profile: </p>
                        <p className="bold">{this.state.jobTitle}</p>
                        <p>Would you like to</p>
                        <a className="links" href="#">Assign this {this.state.jobTitle} to a recruiter</a>
                        <a className="links" href="/Admin/CreateJobProfile">Create a new Job Profile</a>
                        <a className="links" href="#" onClick={this.logout}>Logout</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default CreateJobProfilePage4;