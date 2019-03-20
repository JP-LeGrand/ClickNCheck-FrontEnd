import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';
import axios from 'axios';

const Recruiters = [
    'Joseph LeGrand',
    'Keoabetswe Morake',
    'Fiwa Lekhuleni',
];
class AssignRecruiters extends Component {

    state={
        Recruiter:[]
    };

    componentDidMount() {
        axios.get('https://clickncheck.azurewebsites.net/api/Users/Organization/1/recruiters')
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
            
        );
    }
}
 
export default AssignRecruiters;