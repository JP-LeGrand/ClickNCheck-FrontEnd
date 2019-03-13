import React, { Component } from 'react';

class GeneralInformation extends Component {
    state = { 
        Name:'',
        RegistrationNumber:'',
        TaxNumber:'',
        CostCenterNumber:''
    }
    render() { 
        return <form>
            <h1 className="ui centered">Organisation General Information</h1>
            <label>Organisation Name</label>
            <input type="text" id="OrganisationName" placeholder="Organisation Name"></input> 
            <label>Organisation Registration Number</label>
            <input type="text" id="OrganisationRegistrationNumber" placeholder="Organisation Registration Number"></input>          
            <label>Organisation Tax Number</label>
            <input type="text" id="OrganisationTaxNumber" placeholder="Organisation Tax Number"></input> 
            <label>Organisation Cost Center Number</label>
            <input type="text" id="OrganisationTaxNumber" placeholder="Organisation Tax Number"></input>      
            <input type="submit" id="OrganisationTaxNumber" placeholder="Organisation Tax Number" value="Save and continue"></input>
        </form>;
        
    }
}
 
export default GeneralInformation;