import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import imgMain from '../../../Assets/main.svg';
import './Consent.scss';
class Consent extends React.PureComponent {
    render() {
        return ( 
            <div className="mainSection">
                <header className="form-group">
                    <img src={imgMain}/>
                </header>
                <div className="black">
                    <h3>Hi {this.props.consentState.name}</h3>
                    <p>
                        <strong>
                            {this.props.consentState.organisation}
                        </strong> 
						has submitted a request to conduct the following checks on your profile:
                    </p>
                    <p>
                        <strong>
                            <ul >
                                <li>check1</li>
                                <li>check1</li>
                                <li>check1</li>
                            </ul>
                            <ul >
                                {
                                    this.props.consentState.checks.map(
                                        function(index,name){
                                            return <li key={index} >{name}</li>;
                                        }
                                    )
                                }
                            </ul>
                        </strong>
                    </p>
                    <p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices feugiat tempor. 
						Donec erat justo, condimentum vitae molestie vitae, blandit sed tortor. 
						Maecenas dui risus, tristique dictum finibus nec, maximus elementum risus. Sed fermentum ornare sagittis. 
						Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum ante sapien, nec luctus magna malesuada vitae.
                    </p>
                </div>
                <br/>
                <br/>
                <label id="lblCheck">
                    <input type="checkbox" data-bind="checked: consented"/>I Hereby give consent for the above mentioned checks to be performed.
                </label>
                <br/>
                <div className="form-group">
                    <button >Submit</button>
                </div> 
            </div>
        );
    }
}

Consent.propTypes = {
    consentState: PropTypes.shape({
        name: PropTypes.string.isRequired,
        organisation: PropTypes.string.isRequired,
        checks: PropTypes.array.isRequired
    })
};

const mapStateToProps = (state) => {
    return {
        consentState: state.consentState
    };
};

export default connect(mapStateToProps)(Consent);