import React from 'react';
import './CreateJobProfile.scss';
import { connect } from 'react-redux';

class SelectVendors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            selectedChecks: []
        }
        this.checkboxClicked = this.checkboxClicked.bind(this);
    }

    checkboxClicked(e){
        if (e.target.checked){
            this.setState({selectedChecks: this.state.selectedChecks.concat(e.target.value)});
        } else {
            this.setState({selectedChecks: this.state.selectedChecks.splice(this.state.selectedChecks.indexOf(e.target.value),1)});
        }
        this.props.onCheckBoxClicked(this.state.selectedChecks);
    }

    componentDidMount(){
        let checks = [];
        let checkIDs = [];
        let count = 0;
        for (let c = 0; c < this.props.allChecks.length; c++){
            if(!checkIDs.includes(this.props.allChecks[c].checkTypeID)){
                checkIDs.push(this.props.allChecks[c].checkTypeID);
                checks[this.props.allChecks[c].checkTypeID] = {
                    checkType: this.props.allChecks[c].checkType,
                    checkTypeID: this.props.allChecks[c].checkTypeID,
                    vendors: []
                };
                count++;
            }
        }
        count = 0;
        for (let c = 0; c < this.props.allChecks.length; c++){
            for (let k = 0; k < checkIDs.length; k++){
                if (checkIDs[k] == this.props.allChecks[c].checkTypeID){
                    checks[checkIDs[k]].vendors.push({
                        id: this.props.allChecks[c].id,
                        name: this.props.allChecks[c].name,
                        available: this.props.allChecks[c].isAvailable,
                        checked: false
                    });
                }
            }
        }

        let vendors = [];
        vendors[0] = [];
        vendors[1] = [];
        let elements = [];
        for (let c = 1; c < checks.length-1; c += 2){
            for (let m = 0; m < checks[c].vendors.length; m++){
                vendors[0].push(<label><input type="checkbox" id="checkbox" value={checks[c].vendors[m].id} name={checks[c].checkType.toString()} onClick={this.checkboxClicked} />{checks[c].vendors[m].name}<br/></label>);
            }
            for (let m = 0; m < checks[c+1].vendors.length; m++){
                vendors[1].push(<label><input type="checkbox" id="checkbox" value={checks[c+1].vendors[m].id} name={checks[c+1].checkType.toString()} onClick={this.checkboxClicked}/>{checks[c+1].vendors[m].name}<br/></label>);
            }
            elements.push(
                <tr>
                    <td>
                        <h3>{checks[c].checkType}</h3>
                        <img src={ require('../../../Assets/'+checks[c].checkType.toString().toLowerCase()+'.svg') } alt="VerificationChecks" style={{ width: 50, height:50, float: 'left' }}/>
                        <div>
                            {vendors[0]}
                        </div>
                    </td>
                    <td>
                        <h3>{checks[c+1].checkType}</h3>
                        <img id="checkImage" src={require('../../../Assets/'+checks[c+1].checkType.toString().toLowerCase()+'.svg')} alt="Credit check" style={{ width: 50, height:50, float: 'left'}} />
                        <div id="checkDiv">
                            {vendors[1]}
                        </div>
                    </td>
                </tr>
            );
            vendors[0] = [];
            vendors[1] = [];
        }

        this.setState({elements: elements });
    }

    render() {
        
        return (
            <div>
                <h3>Select verification checks required for {this.props.jobProfile}</h3>
                <hr className="Line" />
                <p id='jpParagraph'>Verification checks required for <span id="jpSpan">{this.props.jobProfile}</span></p>
                <form>
                    <table id="checksTable">  
                        <tbody>
                            {this.state.elements}
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}

export default connect() (SelectVendors);