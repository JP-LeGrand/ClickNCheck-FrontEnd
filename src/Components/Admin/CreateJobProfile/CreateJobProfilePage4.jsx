import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import './CreateJobProfile.scss';

class CreateJobProfilePage4 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state.props = {};
        //get this value from local storage or
        //it is passed to you at creation of page 
        // 1. Job profile name and code. 
        // Joseph did this page.
        // you pass him the Job profile name and code.
        // after you have saved them into the database.
        // you do this in page 3.
    }
    rendor() {
        return (
            <div className="bodyPage">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li>Job Profile Name</li>
                        <li>Select Verification Checks</li>
                        <li>Re-order Check Sequence</li>
                        <li className="active">Next Steps</li>
                    </ul>

                </div>
                <Footer />
            </div>
        );
    }
}
export default CreateJobProfilePage4;