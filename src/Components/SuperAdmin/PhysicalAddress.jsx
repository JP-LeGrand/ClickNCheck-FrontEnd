import React, { Component } from 'react';

class PhysicalAddress extends Component {
   
    render() { 
        return <form>
            <h1 className="ui centered">Physical Physical Address Details</h1>
            <label>Physical Name</label>
            <input type="text" id="PhysicalName" placeholder="Physical Name"></input> 
            <label>Physical Street Name</label>
            <input type="text" id="PhysicalStreetName" placeholder="Physical Street Name"></input>          
            <label>Physical Suburb</label>
            <input type="text" id="PhysicalCity" placeholder="Physical Suburb"></input> 
            <label>Physical City</label>
            <input type="text" placeholder="Physical City"></input> 
            <label>Physical Postal code </label>
            <input type="text" placeholder="Physical Postal Code"></input>
            <input type="submit" value="Back"></input>     
            <input type="submit" value="Save and continue"></input>
        </form>;
    }
}
 
export default PhysicalAddress;