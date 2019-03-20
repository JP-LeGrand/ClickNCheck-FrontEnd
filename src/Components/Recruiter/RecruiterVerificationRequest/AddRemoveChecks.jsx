import React from 'react';
import './MainContainerStyle.scss';
import { BASE_URL } from '../../../Shared/Constants';
import { connect } from 'react-redux';

class AddRemoveChecks extends React.Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.checkboxClicked = this.checkboxClicked.bind(this);
    }
    nextStep(){
        window.location = '/candidate/individual';
    }

    prevStep(){
        //@TODO move to JobProfiles.jsx or NewVerificationRequest??
    }

    checkboxClicked(e){
        if (e.target.checked){
            for (let c = 0; c < this.props.allChecks.length; c++){
                if (e.target.name == this.props.allChecks[c].value){
                    let obj = {
                        category: this.props.allChecks[c].value,
                        categoryId: this.props.allChecks[c].checkTypeID,
                        id: this.props.allChecks[c].id
                    }
                    this.props.allChecks[c].checked = true;
                    this.props.updateAllChecks(this.props.allChecks);
                    this.props.defaultChecks.push(obj);
                    this.props.addCheck(this.props.defaultChecks);
                    this.forceUpdate();
                    return;
                }
            }
        } else {
            for (let c = 0; c < this.props.defaultChecks.length; c++){
                if (e.target.name == this.props.defaultChecks[c].category){
                    this.props.defaultChecks.splice(c, 1);
                    this.props.removeCheck(this.props.defaultChecks);

                    break;
                }
            }
            for (let c = 0; c < this.props.allChecks.length; c++){
                if (e.target.name == this.props.allChecks[c].value){
                    this.props.allChecks[c].checked = false;
                    this.props.updateAllChecks(this.props.allChecks);
                    this.forceUpdate();
                    break;
                }
            }
        }

    }

    render() {
        let checks = [];
        for (let c = 0; c < this.props.allChecks.length; c++){
            for (let k = 0; k < this.props.defaultChecks.length; k++){
                if (this.props.allChecks[c].value.toString().toLowerCase() == this.props.defaultChecks[k].category.toString().toLowerCase()){
                    this.props.allChecks[c].checked = true; //dont update prop, update global state
                }
            }
        }
        for (let c = 0; c < this.props.allChecks.length-1; c += 2){
            checks.push(
                <tr>
                    <td>
                        <h3>{this.props.allChecks[c].value}</h3>
                        <img src={ require('../../../Assets/'+this.props.allChecks[c].value.toString().toLowerCase()+'.svg') } alt="VerificationChecks" style={{ width: 50, height:50 }}/>
                        <div>
                            <input type="checkbox" id="checkbox" name={this.props.allChecks[c].value.toString()} onChange={this.checkboxClicked} checked={this.props.allChecks[c].checked}/>
                        </div>
                    </td>
                    <td>
                        <h3>{this.props.allChecks[c+1].value}</h3>
                        <img id="checkImage" src={require('../../../Assets/'+this.props.allChecks[c+1].value.toString().toLowerCase()+'.svg')} alt="Credit check" style={{ width: 50, height:50 }} />
                        <div id="checkDiv">
                            <input type="checkbox" id="checkbox" name={this.props.allChecks[c+1].value.toString()} onChange={this.checkboxClicked} checked={this.props.allChecks[c+1].checked}/>
                        </div>
                    </td>
                </tr>
            );
        }
        return (
            <div>
                <form>
                    <table id="checksTable">  
                        <tbody>
                            {checks}
                        </tbody>
                    </table>
                </form>
                <a id="addRemoveChecks" onClick={this.props.addRemove}> Back to check order</a>
            </div>
            
        );
    }
}

export default connect() (AddRemoveChecks);