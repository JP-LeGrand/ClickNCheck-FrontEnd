import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }
    handleChange = (e) =>{
        this.props.handleRecruiterChange(e);
        console.log('selected val in select event: '+e.value);
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
                options={[ { label: 'name1', value: 1 }, { label: 'name2', value: 2 }, { label: 'name3', value: 3 }, { label: 'name4', value: 4 }, { label: 'name5', value: 5 } ]}
                styles={customStyle}
                defaultValue={{ value: this.props.defaultRec, label: this.props.defaultRec }}
                onChange={this.handleChange}
            />
        </div>;
    }
}

export default connect() (ReactSelect);