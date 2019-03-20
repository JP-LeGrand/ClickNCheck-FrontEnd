import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL, GET_RECRUITERS } from '../../../Shared/Constants';
import axios from 'axios';

class AssignRecruiters extends Component {

    state={
        Recruiter:[]
    };

    componentDidMount() {
        axios.get(BASE_URL + GET_RECRUITERS)
            .then(response => {
                const recr=[];
                response.data.forEach(recruiter => {
                    recr.push(recruiter);
                });
                //Setting Recruiter state to the response
                this.setState({ Recruiter:recr });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
        window.location='/Admin/Congratulations';
    }

    createCheckbox = (label, val) => (
        <RecruitersCheckbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={val}
        />
    )

    createCheckboxes = () => (
        this.state.Recruiter.map(this.createCheckbox)
    )

    render() { 
        return(
            <div>
                <AdminNavBar />
                <div className="assignRecruiters">
                    <form className="Rectangle-Copy" onSubmit={this.handleFormSubmit}>
                        <div>
                            <label className="Assign-Recruiters">Assign Recruiter(s) to Job Profile:</label>
                            <br/>
                            <label className="Call-Centre-Supervis" >Call Centre Supervisor</label >
                            {this.createCheckboxes()}
                        </div>
                        <a href="/Admin/AdminPage" className="Cancel">Cancel</a>                  
                        <button type="sumbit" className="Rectangle-Copy-14">Done</button>                     
                    </form>
                </div>
            </div>
            
        );
    }
}
 
export default AssignRecruiters;