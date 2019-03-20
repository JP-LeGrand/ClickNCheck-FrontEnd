import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ONE } from '../../../Shared/IntConstants';

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
            <td>{ item[ONE]['JobCode']}</td>
            <td>{ item[ONE]['Title']}</td>
            <td>{ item[ONE]['AssignedRecruiter']}</td>
            <td className="action" id={ item[ONE]['ID']} onClick={(event) => this.assignRecruiter(event)}>
                <u>Assign Recruiter</u>
            </td>
        </tr>
        );
        
        return (
            <table>
                <tbody>
                    <tr className="thead">
                        <td>Job Code</td>
                        <td>Job Title</td>
                        <td>Assigned Recruiter</td>
                        <td>Action</td>
                    </tr>                
                
                    {resultItems}
                </tbody>
                            
            </table>
        );
    }
}
export default connect()(JobProfileResults);