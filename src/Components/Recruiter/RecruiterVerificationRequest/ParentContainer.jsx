import React, { Fragment } from 'react';
import NavBar from '../NavBar/NavBar';
import './ParentContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import rollingImg from '../../../Assets/Rolling.svg';
import CaptureCandidateDetails from './CaptureCandidateDetails';
import MainContainer from './MainContainer';
import * as CandidateActions from './CandidateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'mdbreact';

class ParentContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.changeDiv = this.changeDiv.bind(this);
        this.sendCandidate = this.sendCandidate.bind(this);
        this.backstep = this.backstep.bind(this);
    }
    
    changeDiv(e) {
        this.props.changeView(e);
    }

    sendCandidate() {
        this.setState({
            loading: true
        });
        let candidates = this.props.candidateArray
      
        let ver_check = localStorage.getItem('ver_check');
        this.props.sendBulk('1', candidates);

    }
    backstep() {
        window.location = '/ReviewChecks';
    }

    render() {
        return (
            <Fragment>
                <ToastContainer 
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
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
                                        <label className="candidateDetails">Capture Candidate Details</label><br />
                                        {this.props.candidateState ?
                                            <div className="switchButton">
                                                <button className="indi" id="individual" onClick={() => this.changeDiv(true)}>INDIVIDUAL</button>
                                                <button className="bulk" id="bulk" onClick={() => this.changeDiv(false)}> BULK</button>

                                            </div>
                                            :
                                            this.props.fileState ?

                                                <div className="switchButton">
                                                    <button className="indiNew" id="individual" onClick={() => this.changeDiv(true)}>INDIVIDUAL</button>
                                                    <button className="bulkNew" id="bulk" onClick={() => this.changeDiv(false)}> BULK</button>

                                                </div>
                                                :
                                                <div className="">
                                                    <label className="reviewDetails">Review Candidate Details</label><br /><br />
                                                    <label className="reviewDetails"><strong>{this.props.fileSize} Entries</strong> (click to edit)</label><br />
                                                </div>

                                        }
                                        <section>
                                            {this.props.candidateState ? <CaptureCandidateDetails /> : <MainContainer />}
                                        </section>
                                    </div>
                                </div>

                            </fieldset>
                            {this.props.candidateState ? 
                                <div id="buttonFooter">
                                    <button id="prev" onClick={this.backstep}>BACK</button>
                                    <button id="next" onClick={this.sendCandidate} >SUBMIT</button>
                                    <div className="loading">
                                        {this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                                    </div>
                                </div>
                                :
                                this.props.fileState ? 
                                    <div id="buttonFooter">
                                        <button id="prev" onClick={this.backstep}>BACK</button>
                                    </div>
                                    : 
                                    <div id="buttonFooter">
                                        <button id="prev" onClick={this.backstep}>BACK</button>
                                        <button id="next" onClick={this.sendCandidate} >SUBMIT</button>
                                        <div className="loading">
                                            {this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                                        </div>
                                    </div>
                            }
                            
                        </div>
                        <Footer />
                    </div>
                </div>
            </Fragment>                      
        );
    }
}

ParentContainer.propTypes = {
    candidateState: PropTypes.bool,
    changeView: PropTypes.func
};
const mapStateToProps = state => ({
    candidateState: state.candidateState.displayCandidate,
    candidateArray: state.candidateState.candidateBody,
    fileState: state.candidateState.fileState,
    fileSize: state.candidateState.fileSize,
    tableValid: state.candidateState.tableValid
});

const mapActionsToProps = (dispatch) => ({
    changeView: bindActionCreators(CandidateActions.changeView, dispatch),
    sendBulk: bindActionCreators(CandidateActions.submitCandidate, dispatch)

});
export default connect(mapStateToProps, mapActionsToProps)(ParentContainer);