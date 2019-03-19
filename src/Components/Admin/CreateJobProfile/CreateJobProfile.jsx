import React from 'react';
import NavBar from '../../../Components/Admin/AdminNavBar/adminNavBar';
import Footer from '../../Shared/Footer/Footer';
import './CreateJobProfile.scss';
import 'typeface-roboto';

class CreateJobProfile extends React.PureComponent {
    render() {
        return (
            <div className="CreateJobProfile">
                <NavBar />
                <div className="FormContainer">
                    <ul id="ProgressBar">
                        <li className="Active">Create Job Profile Name</li>
                        <li>Select verification checks</li>
                        <li>Re-order Check Sequence</li>
                        <li>Next Steps</li>
                    </ul>

                    <fieldset className="JobProfilePage1">
                        <h3>Select job profile to base checks on</h3>
                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="JobProfileName" placeholder="Enter Job Profile" />
                            </label>
                        </div>
                        <div id="profileError"></div>

                        <div className="form-group">
                            <label className="autocomplete">
                                <input id="JobCode" placeholder="Enter Job Code" />
                            </label>
                        </div>
                        <div id="codeError"></div>
                    </fieldset>
                </div>
                <div className="NavigationButton">
                    <button id="Prev">BACK</button>
                    <button id="Next">NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }
}
export default CreateJobProfile; 