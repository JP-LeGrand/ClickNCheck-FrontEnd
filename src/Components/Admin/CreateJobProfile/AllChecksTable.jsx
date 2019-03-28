import React from 'react';
import { BASE_URL } from '../../../Shared/Constants';

class AllChecksTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allServices: [],
            newChecks: []
        };

        this.checkboxClicked = this.checkboxClicked.bind(this);
    }

    checkboxClicked(e) {
        if (e.target.checked) {
            for (let c = 0; c < this.state.allServices.length; c++) {
                if (e.target.name === this.state.allServices[c].checktype) {
                    this.state.newChecks.push(this.state.allServices[c]);
                    return;
                }
            }
        } else {
            for (let c = 0; c < this.state.newChecks.length; c++) {
                if (e.target.name === this.state.newChecks[c].checktype) {
                    this.state.newChecks.splice(c, 1);
                    return;
                }
            }
        }
    }

    componentDidMount() {
        let arr = [];
        fetch(BASE_URL + 'JobProfiles/getAllChecks', {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    response.forEach((check) => {
                        arr.push({
                            id: check.id,
                            name: check.name,
                            isavailable: check.isAvailable,
                            checktype: check.checkType,
                            selected: false
                        });
                    });
                    this.setState({ allServices: arr });
                },
                (error) => {
                    alert(error);
                });
    }

    render() {
        let checks = [];
        for (let c = 0; c < this.state.allServices.length - 1; c += 2) {
            checks.push(
                <tr>
                    <td>
                        <h3>{this.state.allServices[c].checktype}</h3>
                        <img src={require('../../../Assets/' + this.state.allServices[c].checktype.toString().toLowerCase() + '.svg')} alt="VerificationChecks" style={{ width: 50, height: 50 }} />
                        <div>
                            {
                                this.state.allServices[c].selected ? <input type="checkbox" id="checkbox" checked name={this.state.allServices[c].checktype.toString()} onChange={this.checkboxClicked} /> : <input type="checkbox" id="checkbox" name={this.state.allServices[c].checktype.toString()} onChange={this.checkboxClicked} />
                            }
                        </div>
                    </td>
                    <td>
                        <h3>{this.state.allServices[c + 1].checktype}</h3>
                        <img id="checkImage" src={require('../../../Assets/' + this.state.allServices[c + 1].checktype.toString().toLowerCase() + '.svg')} alt="VerificationChecks" style={{ width: 50, height: 50 }} />
                        <div id="checkDiv">
                            {
                                this.state.allServices[c + 1].selected ? <input type="checkbox" id="checkbox" checked name={this.state.allServices[c + 1].checktype.toString()} onChange={this.checkboxClicked} /> : <input type="checkbox" id="checkbox" name={this.state.allServices[c + 1].checktype.toString()} onChange={this.checkboxClicked} />
                            }
                        </div>
                    </td>
                </tr>
            );
        }
        return (
            <div className = "scrollbar">
              <div className = "force-overflow">
                    <table id="checksTable">
                        <tbody>
                            {checks}
                        </tbody>
                    </table>
                </div>
                </div>
           

        );
    }
}
export default AllChecksTable;