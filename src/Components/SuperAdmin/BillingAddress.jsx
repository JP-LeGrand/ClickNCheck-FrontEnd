import React, { Component } from 'react';

class BillingAddress extends Component {
    render() { 
        return <form>
            <h1 className="ui centered">Billing Address</h1>
            <label>Billing Name</label>
            <input type="text" id="BillingName" placeholder="Billing Name"></input> 
            <label>Billing Street Name</label>
            <input type="text" id="BillingStreetName" placeholder="Billing Street Name"></input>          
            <label>Billing Suburb</label>
            <input type="text" id="BillingCity" placeholder="Billing City"></input> 
            <label>Billing City</label>
            <label>Billing Postal code </label>
            <input type="text" placeholder="Billing Postal Code"></input>
            <input type="text" placeholder="Billing City"></input> 
            <input type="submit" value="Back"></input>     
            <input type="submit" value="Save and continue"></input>
        </form>;
    }
}
 
export default BillingAddress;