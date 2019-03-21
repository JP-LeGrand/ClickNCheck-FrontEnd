import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import DropdownInput from 'react-dropdown-input';
import { throws } from 'assert';

class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }
    handleChange = (e) =>{
        this.props.onSelectProfile(e.value);
    }
    render(){
        let customStyle = {      
            control: provided => ({
                ...provided,           
                height: 2,
                width: 300,
                padding: 5,
                marginBottom: 39,
                marginLeft: 490,
                border: '0',
                borderRadius: 0,
                boxShadow: '0 !important',
                '&:hover': {
                    borderBottom: '1px solid black'
                },
                borderBottom: '1px solid black',
                fontSize: 18,
                color: '#2b3844',
                outline: 'none'            
            }),
            option: given => ({
                ...given,
                backgroundColor: '#FFFFFF',
                border: 'solid 1px #e6e9ec',
                width: 300, 
                borderRadius: 3,
                '&:hover': {
                    backgroundColor: '#e6e9ec',
                    zIndex: 20
                },
                zIndex: 22                
            })
        }; 

        return <div id="selectElement">
            <DropdownInput 
                options={this.props.jobProfiles}
                defaultValue={{ value: this.props.defaultProf}}
                onChange={this.handleChange}
                onSelect={this.handleChange}
            />
        </div>;
    }
}

export default connect() (ReactSelect);