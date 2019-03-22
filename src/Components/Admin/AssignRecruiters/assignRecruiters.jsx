import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';
import { BASE_URL, GET_RECRUITERS } from '../../../Shared/Constants';
import axios from 'axios';

class AssignRecruiters extends Component {

    state={
        Recruiter:[],
        //Array of recruiter Ids that we will assign to a job
        RecruitersID:[],
        //This is the Job Id we are assigning recruiters to
        jobProfileCode: 0
    };

    componentDidMount() {
        fetch(BASE_URL + GET_RECRUITERS, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('token')
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response => response.json())
            .then(response => {
                const recr=[];
                Object.entries(response["Recruiters"]).forEach(recruiter => {
                    recr.push(recruiter);
                });
                this.setState({ Recruiter:recr });
            },
            error => {
                this.setState({
                    loading: false
                });
                alert(error);
            }
            );
        this.setState({ jobProfileCode:localStorage.getItem('jobProfileCode') });
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
        const userIds= [];
        //Adding the IDs to the recruiter array
        this.selectedCheckboxes.forEach(recruiter => {
            userIds.push(recruiter);
        });
        let body = {
            ids: userIds
        };
        axios.post(BASE_URL + 'JobProfiles' + this.state.jobProfileCode + 'AssignRecruiters', body);
        this.props.handleSubmitted();
        //window.location='/Admin/Congratulations';
    }

    createCheckbox = (label, val) => <RecruitersCheckbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={val}
    />

    createCheckboxes = () => this.state.Recruiter.map(this.createCheckbox)

    render() { 
        return (
            <div>
                <div className="assignRecruiters">
                    <form className="Rectangle-Copy" onSubmit={this.handleFormSubmit}>
                        <div>
                            <label className="Assign-Recruiters">Assign Recruiter(s) to Job Profile:</label>
                            <br/>
                            <label className="Call-Centre-Supervis" >{localStorage.getItem('jobProfileName')}</label >
                            <div className="checkBoxesContainer">
                                {this.createCheckboxes()}
                            </div>
                        </div>
                        <div className="assignFooter">
                            <button type="sumbit" onClick className="Rectangle-Copy-14">Done</button> 
                            <a href="/Admin/CreateJobProfilePage4" className="Cancel">Cancel</a>
                        </div>
                                           
                    </form>
                </div>
            </div>
            
        );
    }
}
 
export default AssignRecruiters;