import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ONE } from '../../../Shared/IntConstants';
import ReactAI from 'react-appinsights';
import './JobProfiles.scss';
class JobProfileResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            results: props.allJobProfiles
        };
        this.assignRecruiter = this.assignRecruiter.bind(this);
    }

    assignRecruiter(event){
        alert('Assign to Job Profile ' + event.target.id);
    }
    
    render() {
        // eslint-disable-next-line react/prop-types    
        const resultItems = Object.entries(this.props.allJobProfiles).map((item,index) => <ul className="row" id="dataRow" key={index}>
            <div className="col-sm">{ item[ONE]['JobCode']}</div>
            <div className="col-sm">{ item[ONE]['Title']}</div>
            <div className="col-sm">{ item[ONE]['AssignedRecruiter']}</div>
            <div className="col-sm" id={ item[ONE]['ID']} onClick={(event) => this.assignRecruiter(event)}>
                <u>Assign Recruiter</u>
            </div>
        </ul>
        );
        
        return (
            <div className="table">
                <ul className="row" id="headingRow">
                    <div className="col-sm font-weight-bold text-primary">Job Code</div>
                    <div className="col-sm font-weight-bold text-primary">Job Title</div>
                    <div className="col-sm font-weight-bold text-primary">Assigned Recruiter</div>
                    <div className="col-sm font-weight-bold text-primary">Action</div>
                </ul>
                {resultItems}
                            
            </div>
        );
    }
}
export default ReactAI.withTracking(connect()(JobProfileResults));