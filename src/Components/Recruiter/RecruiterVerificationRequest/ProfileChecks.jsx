/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../Shared/Constants';

class ProfileChecks extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const listItems = this.props.checks.map((item) =>
            <li id="jobProfileChecks" style={{ listStyleImage: require('../../../Assets/'+item.category.toString().toLowerCase()+'.svg') }}>{ item.category}</li>
        );

        return (
            <div>
                <p className="Verification-checks">Verification checks required for {localStorage.getItem('jp')}</p>
                <ul>
                    { listItems }
                </ul>
                <a id="addRemoveChecks" onClick={this.props.addRemove}>+ Add or - Remove verification checks </a>
                <a id="reorderChecks" onClick={this.props.addRemove}> Re-order sequence of checks </a>
            </div>
        );
    }
}

export default connect() (ProfileChecks);