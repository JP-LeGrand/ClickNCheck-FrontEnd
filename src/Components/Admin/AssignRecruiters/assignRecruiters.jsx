import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';
import AdminNavBar from '../AdminNavBar/adminNavBar';
import { BASE_URL, GET_RECRUITERS } from '../../../Shared/Constants';
import axios from 'axios';
import Congratulations from '../Congratulations/Congratulations';

class AssignRecruiters extends Component {
    constructor(props){
        super(props);
        this.state = {
            Recruiter:[],
            //Array of recruiter Names that have been assign to a job
            RecruitersIds:[],
            RecruiterNames:[],
            JpName:'',
            testing1: '',
            //This is the Job Id we are assigning recruiters to
            jobProfileCode: 0
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
   

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
        this.setState({ jobProfileCode:sessionStorage.getItem('JobProfileID') });
        this.setState({ JpName: localStorage.getItem('jobProfileName') });
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
    
    async handleFormSubmit(FormEvent) {
        FormEvent.preventDefault();
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
        let userIds= [...this.state.RecruitersIds];
        //Adding the IDs to the recruiter array
        this.selectedCheckboxes.forEach(recruiter => {
            userIds.push(recruiter);
        });
      
        let body = {
            ids: userIds
        };
        this.setState({
            RecruitersIds:userIds 
        });
        console.log("sdsds", this.state.RecruitersIds);
        axios.post(BASE_URL +'JobProfiles/'+ this.state.jobProfileCode +'/AssignRecruiters', body);

        console.log(userIds);
        const response = await axios.post('https://localhost:44347/api/Users/GetRecruiterNames', userIds);
        this.setState({ RecruiterNames:response.data });
        console.log("pos",response.data);
        console.log("test", this.state.RecruiterNames);
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
                <Congratulations JobProfileName={this.state.JpName} RecruitersIDs={this.state.RecruiterNames}/>
            </div>
            
        );
    }
}
 
export default AssignRecruiters;