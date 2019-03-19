import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        alert('Assign' + event.target.id);
    }
    render() {
        return (
            <table>
                <thead>
                    <td>Job Code</td>
                    <td>Job Title</td>
                    <td>Assigned Recruiter</td>
                    <td>Action</td>
                </thead>

                <tr>
                    <td>Job sdf</td>
                    <td>Recruiter</td>
                    <td>Assign Recruiter </td>
                    <td className="action" id="1" onClick={(event) => this.assignRecruiter(event)}>
                        <u>Assign Recruiter</u>
                    </td>
                </tr>
                            
            </table>
        );
    }
}
export default connect()(JobProfileResults);