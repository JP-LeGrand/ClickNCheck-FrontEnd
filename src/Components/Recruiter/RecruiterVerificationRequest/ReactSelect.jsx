import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }
    handleChange = (e) =>{
        this.props.onSelectProfile({ selectedProfile: e.value });
    }
    render(){
        let customStyle = {      
            control: provided => ({
                ...provided,           
                height: 2,
                width: 300,
                padding: 5,
                marginBottom: 39,
                marginLeft: 0,
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
                borderBottom: 'solid 1px #e6e9ec',
                borderRadius: 3,
                '&:hover': {
                    backgroundColor: '#e6e9ec',
                    zIndex: 20
                },
                zIndex: 22                
            })
        }; 

        return <div id="selectElement">
            <Select 
                options={this.props.jobProfiles}
                styles={customStyle}
                defaultValue={{ value: this.props.defaultProf, label: this.props.defaultProf }}
                onChange={this.handleChange}
            />
        </div>;
    }
}

export default connect() (ReactSelect);