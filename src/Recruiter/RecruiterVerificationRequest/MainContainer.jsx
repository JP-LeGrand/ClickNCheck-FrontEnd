import React from 'react';
import "./MainContainerStyle.scss";

class MainContainer extends React.Component {
constructor(props){
    super(props)
    this.state={
        page:0
    }
}
    next=()=>{
        this.setState({page:1})
    }
   render() {
       const nav =(
        <ul id='progress_bar'>
        <li class="active">Create Job Profile Name</li>
        <li>Candidate Details</li>
        <li>Next Steps</li> 
    </ul>
       )

       const nv=(
        <fieldset class="field1 current">
        {/* <!--Job profile name--> */}
        <h3>Job profile</h3>
        <div class="form-group">
            <label class="inp">
                {/* <select  id ="profileName" data-bind="options: jobProfiles(), optionsCaption: 'Choose a Job Profile', optionsText: function(item){return item.title}, value: function(item){return item.title},"></select>
*/}
                <select id="profileName" text="Choose.." value="Software Dev">
               <option>Name</option>
                </select>
            <span class="border"></span>
            </label>
      
        </div>
        
    </fieldset>
       )
      return (
        <div class="bodyPage">
       <div id="formContainer">

            {this.state.page==0?nav:nv
            }
            
            
           
            </div>


            <div id="buttonFooter">
                <button id = "prev">BACK</button>
                <button id = "next" onClick={()=>this.next()}>NEXT</button>
            </div>
</div>
      );
   }
}
export default MainContainer;
