import React from 'react';
import NavBar from '../NavBar/NavBar';
import './ParentContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import rollingImg from '../../../Assets/Rolling.svg';
import CaptureCandidateDetails from './CaptureCandidateDetails';
import MainContainer from './MainContainer';
class ParentContainer extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            switchState: true,
        
        };
        this.changeDiv = this.changeDiv.bind(this);

    }

    changeDiv (e) {
        this.setState({
            switchState : e,
          
        });
    }
    render () {

        return (
            <div className="candidateNav">
                <NavBar />
                <div className="bodyPage">
                    <h2 id="newVTitile"><b>New Verification Request</b></h2>
                    <h3 id="JPTitle">Job Profile</h3>
                    <div className="formBox">
                        <fieldset className="field1 current">
                            <div id="singleForm">
                                <div className="">
                                    <ul id="progress_bar">
                                        <li className="active">Select Verification Checks</li>
                                        <li className="active"><b>Candidate Details</b></li>
                                        <li>Next Steps</li>
                                    </ul>
                                    <label className="candidateDetails">Capture Candidate Details</label>
                                    {this.state.switchState ? 
                                        <div className="uploadSwitch">
                                            <button className="indi" id="individual" onClick={() => this.changeDiv(true)}>INDIVIDUAL</button>
                                            <button className="bulk" id="bulk" onClick={() => this.changeDiv(false)}> BULK</button>

                                        </div>
                                        :
                                        <div className="uploadSwitch">
                                            <button className="indiNew" id="individual" onClick={() => this.changeDiv(true)}>INDIVIDUAL</button>
                                            <button className="bulkNew" id="bulk" onClick={() => this.changeDiv(false)}> BULK</button>

                                        </div>
                                    }
                                    
                                    <section>
                                        {this.state.switchState ? <CaptureCandidateDetails/> : <MainContainer />}
                                    </section>
                                </div>
                            </div>
                        
                        </fieldset>
                        <div id="buttonFooter">
                            <button id="prev" onClick={this.prevStep}>BACK</button>
                            <button id="next" disabled={!this.state.tableValid} onClick={this.sendCandidates}>SUBMIT</button>
                            <div className="loading">{this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        );
    }
}
export default ParentContainer;