import React, { Component } from 'react';

class RecruiterCheckBox extends Component {
    state = { 
        isChecked: false
    }
     toggleCheckboxChange = (e) => {
         const { handleCheckboxChange, label } = this.props;
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
            
             <div className={'checkbox'}>
                 <label className={this.state.isChecked ? 'tickedBox' : ' '}>
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