import React from 'react';
import './CreateJobProfile.scss';
import { connect } from 'react-redux';

class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div id="inputWrapper">
            <h3 className="jobProfileHeading">Enter Job profile</h3>
            <input id="jobProfileInput" type="text" name="profile" placeholder="e.g Job profile here" onChange={this.props.onEnterProfile} />
            <h3 className="jobProfileHeading">Code</h3>
            <input id="jobCodeInput" type="text" name="code"  placeholder="e.g Job code here" onChange={this.props.onEnterCode}/>
        </div>;
    }
}

export default connect() (ReactSelect);