/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import './candidateUploadContainer.scss';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../Shared/Constants';

class ProfileChecks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let imgStyle = {
            width: '15px',
            objectFit: 'contain',
            padding: '0 20px 0 0'
        };

        const listItems = this.props.checks.map((item) => <div className="returnedCheckCategory">
                <li id="jobProfileChecks"><img style={imgStyle} src={require('../../../Assets/' + item.category.toString().toLowerCase() + '.svg')}></img>   {item.category}</li>

            </div>
        );
        let addRemoveCheckStyle = {
            width: '592px',
            height: '22px',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.57',
            letterSpacing: '0.9px',
            color: '#0091d1'
        };
        return (
            <div className="">
                <p className="Verification-checks">Verification checks required for {localStorage.getItem('jp')}</p>
                <ul>
                    {listItems}
                </ul>
                <a id="addRemoveChecks" style={addRemoveCheckStyle} onClick={this.props.addRemove}>+ Add or - Remove verification checks </a>
                <a id="reorderChecks" onClick={this.props.addRemove}> Re-order sequences of checks </a>
            </div >
        );
    }
}

export default connect()(ProfileChecks);