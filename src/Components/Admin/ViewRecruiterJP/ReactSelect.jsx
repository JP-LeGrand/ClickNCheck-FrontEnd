import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import ReactAI from 'react-appinsights';

class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }
    handleChange = (e) =>{
        this.props.handleRecruiterChange(e);
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
                border: 'solid 1px #e6e9ec',
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
                options={this.props.recruiters}
                styles={customStyle}
                defaultValue={{ value: this.props.defaultRec, label: this.props.defaultRec }}
                onChange={this.handleChange}
            />
        </div>;
    }
}

export default ReactAI.withTracking(connect() (ReactSelect));