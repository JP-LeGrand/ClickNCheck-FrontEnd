import React, { Component } from 'react';

class ContractUpload extends Component {
    
    render() { 
        return (
            <form>
                <h1 className="ui centered">Organisation Contract</h1>
                <label>Organisation Contract</label>
                <input type="file" id="OrganisationName" placeholder="Organisation Name"></input>
                <input type="submit" value="Save and continue"></input>
            </form>  
        );
    }
}
 
export default ContractUpload;