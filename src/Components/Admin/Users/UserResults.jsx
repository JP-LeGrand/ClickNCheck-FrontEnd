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
            <td>{ item[ONE]['Name']}</td>
            <td>{ item[ONE]['Surname']}</td>
            <td>{ item[ONE]['Roles']}</td>
            <td><a href={'/Admin/Users/CreateAmendUser?user_id=' + item[ONE]['ID']} >Amend User</a></td>
        </tr>
        );
        
        return (
            <table>
                <tbody>
                    <tr className="thead">
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Role(s)</td>
                        <td>Action</td>
                    </tr>                
                
                    {resultItems}
                </tbody>
                            
            </table>
        );
    }
}
export default connect()(JobProfileResults);