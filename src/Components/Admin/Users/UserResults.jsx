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
            <td className="col" >{ item[ONE]['Name']}</td>
            <td className="col" >{ item[ONE]['Surname']}</td>
            <td className="col" >{ item[ONE]['Status']}</td>
            <td className="col" >{ item[ONE]['Roles']}</td>
            <td className="col" ><a href={'/Admin/Users/CreateAmendUser?user_id=' + item[ONE]['ID']} >Amend User</a></td>
        </tr>
        );
        
        return (
            <table>
                <tbody>
                    <tr className="thead">
                        <td className="col" >Name</td>
                        <td className="col" >Surname</td>
                        <td className="col" >Status</td>
                        <td className="col" >Role(s)</td>
                        <td className="col" >Action</td>
                    </tr>                
                
                    {resultItems}
                </tbody>
                            
            </table>
        );
    }
}
export default ReactAI.withTracking(connect()(JobProfileResults));