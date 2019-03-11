import React, { Component } from 'react';

class AccountsPerson extends Component {
   
    render() { 
        return (
            <form>
                <h1 className="ui centered">Accounts Person Details</h1>
                <label>Accounts Person Name</label>
                <input type="text" id="AccountsPersonName" placeholder="Accounts Person Name"></input> 
                <label>Accounts Person Phone</label>
                <input type="text" id="AccountsPersonPhone" placeholder="Accounts Person Phone"></input>          
                <label>Accounts Person Email</label>
                <input type="text" id="AccountsPersonEmail" placeholder="Accounts Person Email"></input> 
                <label>Accounts Person City</label>
                <input type="submit" value="Back"></input>     
                <input type="submit" value="Save and continue"></input>
            </form> 
        );
    }
}
 
export default AccountsPerson;