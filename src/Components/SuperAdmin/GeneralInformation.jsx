import React, { Component } from 'react';

class GeneralInformation extends Component {
    state = {  }
    render() { 
        return  <div>
            <input type="text" id="OrganisationName"></input>
            <input type="text" id="OrganisationTaxNumber"></input>
            <input type="text" id="OrganisationCostCenterNumber"></input>
        </div>;
            
         
    }
}
 
export default GenralInformation;