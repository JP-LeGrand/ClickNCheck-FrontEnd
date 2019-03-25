import React, { Component } from 'react';
import check from '../../../Assets/green_check.svg';
import './congratulations.scss';
import * as JobProfileActions from '../AssignRecruiters/jobProfileActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Congratulations extends Component {
    state={
        RecruiterNames:[]
    }
  
    handleFormSubmit = () => {
       
        window.location='/Admin/AdminPage';
    }

    componentDidMount() {
        this.props.jobProfileActions.getRecruiters(this.props.userIds);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.recruiterNames);
    }
    
    render() { 
  
        return ( 
            <div>
                <div className="congratulations">
                    <div className="Rectangle-Copy">
                        <div>
                            <img src={check} /><br></br>
                            <label className="Congratulation">Congratulations!</label> 
                            <br></br> 
                            <div className="You-have-successfully">
                                <p>You have successfully assigned job title
                                    <span className="text-style-1"> {this.props.JobProfileName} </span>to 
                                    <span className="text-style-1">
                                        {this.props.RecruitersIDs}
                                    </span>   
                                </p>
                            </div>                      
                        </div>
                        <br></br>
                        <button onClick={this.handleFormSubmit} className="Rectangle-Copy-14">Done</button>                     
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // userIds: state.jobProfileActions.userIds,
    // recruiterNames: state.jobProfileState.recruiterList
});

const mapActionsToProps = (dispatch) => ({
    jobProfileActions: bindActionCreators(JobProfileActions, dispatch)
});
 
export default connect(mapStateToProps, mapActionsToProps)(Congratulations);