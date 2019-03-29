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
                        <td className="jpCols">Job Code</td>
                        <td className="jpCols">Job Title</td>
                        <td className="jpCols">Assigned Recruiter</td>
                        <td className="jpCols">Action</td>
                    </tr>                
                
                    {resultItems}
                </tbody>
                            
            </table>
        );
    }
}
export default connect()(JobProfileResults);