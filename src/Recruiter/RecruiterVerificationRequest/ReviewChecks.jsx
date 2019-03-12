import React from "react";
import "./MainContainerStyle.scss";

class ReviewChecks extends React.Component {

  state = {
    checks: [{vendor:"Compuscan Credit check",
             category:"Credit",
             location: "onRight"
            },  
          
            {vendor:"Experian Criminal Check", 
             category:"Criminal",
             location: "onLeft"
            },  
          
            {vendor:"XDS Identity Check", 
             category:"Identity",
             location: "onRight"
            },

            {vendor:"MIE Drivers Check", 
             category:"Drivers",
             location: "onLeft"
            } 
    ]};

  render() {
    var checks = {
      onLeft: [],
      onRight: []
    }

    /**Run through the tasks array inside state and put each check on the left or right
     * side of the page depending on whether it came with the jobProfile or not
    */
    this.state.checks.forEach((check) => {
      checks[check.location].push(
        <div className="checkType">
          <h4>{check.category}</h4>
          <div id="vendor" draggable onDragStart={(e) => this.onDragStart(e, check.vendor)}>
             <p>{check.vendor}</p>
          </div>
        </div>
      )
    });
    return (
      <div className="bodyPage">
        <div id="formContainer">
          <ul id='progress_bar'>
            <li className="active">Select verification checks</li>
            <li>Candidate Details</li>
            <li>Next Steps</li> 
          </ul>
          <h3>Job Profile</h3>
          <div className="form-group">
            <label className="autocomplete">
              <input id="profileName" placeholder = "Enter job profile"/>
            </label>
          </div>

          <div id="droppableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "left")}>
            {checks.onLeft}
          </div>
          <div id="draggableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "right")}>
            {checks.onRight}
          </div>
        </div>
      </div>
    );
  }


  onDrop = (ev, cat) => {       
    let vendor = ev.dataTransfer.getData("vendor");
    let tasks = this.state.checks.filter((task) => {
      if(task.vendor == vendor) {
        //task.category = cat;           
      }              
       return task;       
    });        

    this.setState({              
      ...this.state, tasks
    });
  }

  onDragOver(event){
    event.preventDefault();
    
  }

  onDragStart(event, vendor){
    console.log("ondragStart: "+vendor);
    event.dataTransfer.setData("vendor", vendor);
  }
}


export default ReviewChecks;
