import React, { Component } from 'react';

class ContactPerson extends Component {
    
    render() { 
        return (
            <form>
                <h1 className="ui centered">Contact Person Details</h1>
                <label>Contact Person Name</label>
                <input type="text" id="ContactPersonName" placeholder="Contact Person Name"></input> 
                <label>Contact Person Phone</label>
                <input type="text" id="ContactPersonPhone" placeholder="ContactPerson Phone"></input>          
                <label>Contact Person Email</label>
                <input type="text" id="ContactPersonEmail" placeholder="ContactPerson Email"></input> 
                <label>Contact Person City</label>
                <input type="submit" value="Back"></input>     
                <input type="submit" value="Save and continue"></input>
            </form> 
        );
    }
}
 
export default ContactPerson;