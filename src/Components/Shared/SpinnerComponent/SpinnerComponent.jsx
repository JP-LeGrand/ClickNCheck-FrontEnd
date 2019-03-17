import React from 'react';
import { connect } from 'react-redux';
import './SpinnerComponent.scss';
import rollingImg from '../../../Assets/Rolling.svg';

class SpinnerComponent extends React.PureComponent {  
    render() {
        return (
            <div className="SpinnerDiv">
                <div className="Inner">
                    <img src={rollingImg} />
                </div>
            </div>
        );
    }
}

export default connect()(SpinnerComponent);