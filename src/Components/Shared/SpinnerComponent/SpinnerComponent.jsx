import React from 'react';
import { connect } from 'react-redux';
import './SpinnerComponent.scss';
import rollingImg from '../../../Assets/Rolling.svg';

class SpinnerComponent extends React.PureComponent {  
    render() {
        return (
            <div className="SpinnerDiv">
                    <img className="Inner" src={rollingImg} />
            </div>
        );
    }
}

export default connect()(SpinnerComponent);