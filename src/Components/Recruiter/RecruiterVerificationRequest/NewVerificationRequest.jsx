import React from "react";
import "./MainContainerStyle.scss";
import Footer from "../../Shared/Footer/Footer"
//import { GET_ALL_JOB_PROFILE_CHECKS } from "../../../Shared/Constants";

class NewVerificationRequest extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        
    };
  }

  render() {
    /**Run through the tasks array inside state and put each check on the left or right
     * side of the page depending on whether it came with the jobProfile or not
    */
    return (
        <div className="bodyPage">
            <div id="formContainer">
                <ul id='progress_bar'>
                    <li className="active">Select verification checks</li>
                    <li>Candidate Details</li>
                    <li>Next Steps</li> 
                </ul>
                <h3>Job Profile</h3>
                <div className="form-group">
                    <input id="profileName" placeholder = "Enter job profile"/>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
}

export default NewVerificationRequest;