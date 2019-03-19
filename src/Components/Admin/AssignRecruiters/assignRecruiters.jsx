import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';

const Recruiters = [
    'Joseph LeGrand',
    'Keoabetswe Morake',
    'Fiwa Lekhuleni',
];
class AssignRecruiters extends Component {

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
    }

    createCheckbox = label => (
        <RecruitersCheckbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    )

    createCheckboxes = () => (
        Recruiters.map(this.createCheckbox)
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
                    <a href="#" className="Cancel">Cancel</a>                  
                    <button type="sumbit" className="Rectangle-Copy-14">Done</button>                     
                </form>
            </div>
            
        );
    }
}
 
export default AssignRecruiters;