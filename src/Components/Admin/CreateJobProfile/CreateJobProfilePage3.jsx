import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../AdminNavBar/adminNavBar';
import './CreateJobProfile.scss';
import gridview from '../../../Assets/gridview.svg';
import saveImg from '../../../Assets/save.svg';
import dragImg from '../../../Assets/drag.svg';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'array-move';

const SortableItem = sortableElement(({ value }) => <li><img src={gridview}/>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

class CreateJobProfilePage3 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            jobProfileName: localStorage.getItem('jobProfileName'),
            JobProfile: {},
            checks: [ 'TransUnion Credit Report','Experian Credit Report','XDS Credit Report','Criminal Check - Attach Fingerprints Captured' ]
        };

        this.nextStep = this.nextStep.bind(this);
        this.saveProgress = this.saveProgress.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }
    prevStep() {
        window.location = '/Admin/CreateJobProfilePage2';
    }

    saveProgress() {
        //TODO
        //Save this to the database.
    }

    nextStep() {
        //make the job profile object
        //and store them in the local storage
        window.location = '/Admin/CreateJobProfilePage4';
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ checks }) => ({
            checks: arrayMove(checks, oldIndex, newIndex),
        }));
    };

    render() {
        const { checks } = this.state;
        return (
            <div>
                <NavBar />
                <div className="createJobProfile">
                    <div id="spanHolder">
                        <span className="New-Verification-Req">New Job Profile</span>
                    </div>
                    <div id="formContainer">
                        <ul id="progress_bar">
                            <li>Job Profile Name</li>
                            <li>Select Verification Checks</li>
                            <li className="active">Re-order Check Sequence</li>
                            <li>Next Steps</li>
                        </ul>
                        <h3 className="Re-order-Check-Seque">Re-order Check Sequence for</h3>
                        <h4 className="Re-order-Check-Seque text-style-1">{this.state.jobProfileName}</h4>
                        <p className="The-checks-with-the">The checks with the highest candidate failure / dropout rates will be done first</p>
                        <hr className="Line" />
                        <div className="flex-container">
                            <img src={dragImg} alt="gridview image"></img>
                            <p className="Change-the-sequence">Change the sequence by dragging items to re-order. </p>
                        </div>
                        <div id="Sortable-Checks">
                            <SortableContainer onSortEnd={this.onSortEnd}>
                                {checks.map((value, index) => <SortableItem key={`item-${index}`} index={index} value={value} />)}
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
            </div>
            
        );
    }
}
export default CreateJobProfilePage3;