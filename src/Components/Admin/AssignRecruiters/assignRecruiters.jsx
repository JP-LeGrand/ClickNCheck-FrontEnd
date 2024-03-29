import React, { Component } from 'react';
import './assignRecruiters.scss';
import RecruitersCheckbox from './RecruitersCheckBox';
import { BASE_URL, GET_RECRUITERS,GET_RECRUITERS_NAMES } from '../../../Shared/Constants';
import axios from 'axios';
import Congratulations from '../Congratulations/Congratulations';
import ReactAI from 'react-appinsights';

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
            jobProfileCode: 0,
            done: false
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
        this.setState({ JpName: localStorage.getItem('jobProfile') });
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
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' +sessionStorage.getItem('token')
            }
        };
        
        axios.post(BASE_URL +'JobProfiles/'+ this.state.jobProfileCode +'/AssignRecruiters', body,config);
        const response = await axios.post(BASE_URL + GET_RECRUITERS_NAMES, userIds, config);
        this.setState({ RecruiterNames: response.data });
        this.setState({ done: true });
    }

    createCheckbox = (label, val) => <RecruitersCheckbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={val}
    />

    createCheckboxes = () => this.state.Recruiter.map(this.createCheckbox)

    ReturnNames(){
        this.state.RecruiterNames.map((Names)=> <li key={Names.toString()}>{Names}</li>);
    }

    render() { 
        return (
            <div>
                <div className="assignRecruiters">
                    {!this.state.done &&
                        <form className="Rectangle-Copy" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label className="Assign-Recruiters">Assign Recruiter(s) to Job Profile:</label>
                                <br/>
                                <label className="Call-Centre-Supervis" >{localStorage.getItem('jobProfile')}</label >
                                <div className="checkBoxesContainer">
                                    {this.createCheckboxes()}
                                </div>
                            </div>
                            <div className="assignFooter">
                                <button type="sumbit" className="Rectangle-Copy-14">Done</button> 
                                <a href="/Admin/CreateJobProfilePage4" className="Cancel">Cancel</a>
                            </div>           
                        </form>
                    }
                    {this.state.done && <Congratulations JobProfileName={this.state.JpName} RecruitersIDs={this.state.RecruiterNames.map((Names)=> <li key={Names.toString()}>{Names}</li>)}/>}
                </div>
            </div>
            
        );
    }
}
 
export default ReactAI.withTracking(AssignRecruiters);