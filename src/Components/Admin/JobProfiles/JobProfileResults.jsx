import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ONE } from '../../../Shared/IntConstants';
import ReactAI from 'react-appinsights';

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
        const resultItems = Object.entries(this.props.allJobProfiles).map((item,index) => <tr key={index}>
            <td className="jpCols">{ item[ONE]['JobCode']}</td>
            <td className="jpCols">{ item[ONE]['Title']}</td>
            <td className="jpCols">{ item[ONE]['AssignedRecruiter']}</td>
            <td className="action jpCols" id={ item[ONE]['ID']} onClick={(event) => this.assignRecruiter(event)}>
                <u>Assign Recruiter</u>
            </td>
        </tr>
        );
        
        return (
            <table>
                <tbody>
                    <tr className="thead">
                        <td className="jpCols"><b>Job Code</b></td>
                        <td className="jpCols"><b>Job Title</b></td>
                        <td className="jpCols"><b>Assigned Recruiter</b></td>
                        <td className="jpCols"><b>Action</b></td>
                    </tr>
                    
                    {resultItems}
                </tbody>
                            
            </table>
        );
    }
}
export default ReactAI.withTracking(connect()(JobProfileResults));