import React from 'react';
import Footer from '../../../Shared/Footer/Footer';
import NavBar from '../../AdminNavBar/adminNavBar';
import '../Page3/CreateJobProfilePage3.scss';
import gridview from '../../../../Assets/gridview.svg';
import saveImg from '../../../../Assets/save.svg';
import dragImg from '../../../../Assets/drag.svg';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { BASE_URL, CREATE_JOBPROFILE } from '../../../../Shared/Constants';
import Axios from 'axios';
import { element } from 'prop-types';

const SortableItem = sortableElement(({ value }) => <li><img src={gridview}/>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

class CreateJobProfilePage3 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            jobProfileName: localStorage.getItem('jobProfile'),
            token: sessionStorage.getItem('token'),
            jobProfileCode: localStorage.getItem('jobCode'),
            JobProfile: {},
            checks: JSON.parse(sessionStorage.getItem('services'))
        };
         
        this.nextStep = this.nextStep.bind(this);
        this.saveProgress = this.saveProgress.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }
    prevStep() {
        window.location = '/Admin/CreateJobProfile';
    }

    saveProgress() {
        //TODO
        //Save this to the database.
    }

    nextStep(e) {
        e.preventDefault();
        this.createJobProfile().then(response => {
            sessionStorage.setItem('JobProfileID', response.data);
            window.location = '/Admin/CreateJobProfilePage4';
        },
        (error) => {
            alert(error);
        }
        );
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ checks }) => ({
            checks: arrayMove(checks, oldIndex, newIndex),
        }));
    };

    createJobProfile(){
        
        let ids = this.state.checks.map(x=>x.id);
        const JobProfile = { 'title':this.state.jobProfileName,
            'code':this.state.jobProfileCode,
            'isCompleted':true,
            'checks':ids,
            'checksNeedVerification':true
        };
        const url = BASE_URL+CREATE_JOBPROFILE;
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' +sessionStorage.getItem('token')
            }
        };

        return Axios.post(url,JobProfile,config);
    }

    render() {
        const { checks } = this.state;
        return (
            <div className="createJobProfile3">
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar_taf">
                        <li className="active">Job Profile Name</li>
                        <li className="active">Select Verification Checks</li>
                        <li className="active">Re-order Check Sequence</li>
                        <li >Next Steps</li>
                    </ul>
                    <h3 className="Re-order-Check-Seque">Re-order Check Sequence for</h3>
                    <h4 className="Re-order-Check-Seque text-style-1">{this.state.jobProfileName} {this.state.jobProfileCode}</h4>
                    <p className="The-checks-with-the">The checks with the highest candidate failure / dropout rates will be done first</p>
                    <hr className="Line" />
                    <div className="flex-container">
                        <img src={dragImg} alt="gridview image"></img>
                        <p className="Change-the-sequence">Change the sequence by dragging items to re-order. </p>
                    </div>
                    <div id="Sortable-Checks">
                        <SortableContainer onSortEnd={this.onSortEnd}>
                            {checks.map((value, index) => <SortableItem key={`item-${value.id}`} index={index} value={value.name} />)}
                        </SortableContainer>
                    </div>
                    <div id="buttonFooter">
                        <button id="prev" onClick={this.prevStep}>BACK</button>
                        <div id="saveButtonDiv">
                            <img src={saveImg} alt="save img"/>
                            <button id="save" onClick={this.saveProgress}>Save and continue later</button>
                        </div>
                        <button id="next" onClick={this.nextStep}>NEXT</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default CreateJobProfilePage3;