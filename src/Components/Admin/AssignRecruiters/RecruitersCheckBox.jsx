import React, { Component } from 'react';

class RecruiterCheckBox extends Component {
    state = { 
        isChecked: false
    }
     toggleCheckboxChange = () => {
         const { handleCheckboxChange, label } = this.props;
    
         this.setState(({ isChecked }) => (
             {
                 isChecked: !isChecked,
             }
         ));
    
         handleCheckboxChange(label);
     }
    
     render() { 
         const { label } = this.props;
         const { isChecked } = this.state;
         return (
             
             <div className="checkbox">
                 <label>
                     <input
                         type="checkbox"
                         value={label['id']}
                         checked={isChecked}
                         onChange={this.toggleCheckboxChange}
                     />
                     {label['name'] + ' ' + label['surname']}
                 </label>
             </div>
         );
     }
}
 
export default RecruiterCheckBox;