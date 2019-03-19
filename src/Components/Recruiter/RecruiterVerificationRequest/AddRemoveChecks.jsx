import React from 'react';
import './MainContainerStyle.scss';
import { BASE_URL } from '../../../Shared/Constants';
import { connect } from 'react-redux';

class AddRemoveChecks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allChecks: [],
            newChecks: []
        };
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }
    nextStep(){
        window.location = '/candidate/individual';
    }

    prevStep(){
        this.setState({ display: 'block' });
    }

    checkboxClicked(e){
        if (e.target.checked){
            //@TODO add event name to state
        } else {
            if (this.state.newChecks.indexOf(e.target.name) >= 0){
                this.state.newChecks.splice(this.state.newChecks.indexOf(e.target.name)-1, 1)
            } 
        }
    }

    render() {
        let checks = [];
        for (let c = 0; c < this.state.allChecks.length-1; c++){
            checks.push(
                <tr>
                    <td>
                        <h3>{this.state.allChecks[c].label}</h3>
                        <img src={ require('../../../Assets/personal.svg') } alt="VerificationChecks" style={{ width: 50, height:50 }}/>
                        <div>
                            <input type="checkbox" id="checkbox" name={this.state.allChecks[c].label.toString()} onChange={this.checkboxClicked}/>
                        </div>
                    </td>
                    <td>
                        <h3>{this.state.allChecks[c+1].label}</h3>
                        <img id="checkImage" src={require('../../../Assets/'+this.state.allChecks[c+1].label.toString().toLowerCase()+'.svg')} alt="Credit check" style={{ width: 50, height:50 }} />
                        <div id="checkDiv">
                            <input type="checkbox" id="checkbox" name={this.state.allChecks[c+1].label.toString()} onChange={this.checkboxClicked}/>
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

    componentDidMount(){
        let arr = [];
        fetch(BASE_URL+'JobProfiles/getAllChecks' , {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        } )
            .then((response) => response.json())  
            .then(
                response => {
                    response.forEach((check) =>{
                        arr.push({
                            id: check.id,
                            checkTypeID: check.checkTypeID,
                            value: check.checkType,
                            label: check.checkType
                        });
                    });
                    this.setState({ allChecks: arr });
                },
                (error) => {
                    alert(error);
                });
    }
}

export default connect() (AddRemoveChecks);