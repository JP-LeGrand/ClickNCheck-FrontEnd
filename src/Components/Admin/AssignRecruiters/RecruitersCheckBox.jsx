import React, { Component } from 'react';

class RecruiterCheckBox extends Component {
    state = { 
        isChecked: false
    }
     toggleCheckboxChange = (e) => {
         const { handleCheckboxChange, label } = this.props;
         console.log(e.target.value);
         this.setState(({ isChecked }) => (
             {
                 isChecked: !isChecked,
             }
         ));
    
         handleCheckboxChange(e.target.value);
     }
    
     render() { 
         const { label } = this.props;
         const { isChecked } = this.state;
         let one = 1;
         return (
            
             <div className="checkbox">
                 <label>
                     
                     <input
                         type="checkbox"
                         value={label[one]['ID']}
                         checked={isChecked}
                         onChange={this.toggleCheckboxChange}
                     />
                     {label[one]['Name'] + ' ' + label[one]['Surname']}
                 </label>
             </div>
         );
     }
}
 
export default RecruiterCheckBox;