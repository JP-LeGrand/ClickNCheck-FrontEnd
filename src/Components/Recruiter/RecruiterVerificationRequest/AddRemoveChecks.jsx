import React from 'react';
import './MainContainerStyle.scss';
import { BASE_URL } from '../../../Shared/Constants';
import { connect } from 'react-redux';

class AddRemoveChecks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allChecks: [],
            newChecks: props.defaultChecks
        };
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.checkboxClicked = this.checkboxClicked.bind(this);
    }
    nextStep(){
        window.location = '/candidate/individual';
    }

    prevStep(){
        this.setState({ display: 'block' });
    }

    checkboxClicked(e){
        if (e.target.checked){
            for(let c = 0; c < this.state.allChecks.length; c++){
                if(e.target.name == this.state.allChecks[c].label){
                    this.state.newChecks.push(this.state.allChecks[c]);
                    return;
                }
            }
        } else {
            for (let c = 0; c < this.state.newChecks.length; c++){
                if(e.target.name == this.state.newChecks[c].label){
                    this.state.newChecks.splice(c, 1);
                    return;
                }
            }
        }
    }

    render() {
        let checks = [];
        for (let c = 0; c < this.state.allChecks.length; c++){
            for (let k = 0; k < this.props.defaultChecks.length; k++){
                if (this.state.allChecks[c].label.toString().toLowerCase() == this.props.defaultChecks[k].category.toString().toLowerCase()){
                    this.state.allChecks[c].checked = true;
                }
            }
        }
        for (let c = 0; c < this.state.allChecks.length-1; c += 2){
            checks.push(
                <tr>
                    <td>
                        <h3>{this.state.allChecks[c].label}</h3>
                        <img src={ require('../../../Assets/'+this.state.allChecks[c].label.toString().toLowerCase()+'.svg') } alt="VerificationChecks" style={{ width: 50, height:50 }}/>
                        <div>
                            {
                                this.state.allChecks[c].checked ? <input type="checkbox" id="checkbox" checked name={this.state.allChecks[c].label.toString()} onChange={this.checkboxClicked}/> : <input type="checkbox" id="checkbox" name={this.state.allChecks[c].label.toString()} onChange={this.checkboxClicked}/>
                            }
                        </div>
                    </td>
                    <td>
                        <h3>{this.state.allChecks[c+1].label}</h3>
                        <img id="checkImage" src={require('../../../Assets/'+this.state.allChecks[c+1].label.toString().toLowerCase()+'.svg')} alt="Credit check" style={{ width: 50, height:50 }} />
                        <div id="checkDiv">
                            {
                                this.state.allChecks[c+1].checked ? <input type="checkbox" id="checkbox" checked name={this.state.allChecks[c+1].label.toString()} onChange={this.checkboxClicked}/> : <input type="checkbox" id="checkbox" name={this.state.allChecks[c+1].label.toString()} onChange={this.checkboxClicked}/>
                            }
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
        let obj = {};
        let found = false;
        if (this.state.allChecks.length == 0){
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
            })
                .then((response) => response.json())  
                .then(
                    response => {
                        response.forEach((check) =>{
                            obj = {
                                id: check.id,
                                checkTypeID: check.checkTypeID,
                                value: check.checkType,
                                label: check.checkType,
                                checked: false
                            };
                            arr.forEach((dup) => {
                                if (dup.checkTypeID == obj.checkTypeID){
                                    found = true;
                                }
                            });
                            
                            if (found !== true){
                                console.log('Found is: '+found)
                                arr.push(obj);
                            }
                        });
                        this.setState({ allChecks: arr });
                        console.log('length '+this.state.allChecks.length);
                    },
                    (error) => {
                        alert(error);
                    });        
        }
    }
}

export default connect() (AddRemoveChecks);