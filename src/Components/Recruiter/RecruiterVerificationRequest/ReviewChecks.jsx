import React from "react";
import "./MainContainerStyle.scss";

class ReviewChecks extends React.Component {

  state = {
    cursor: "grab",
    checks: [{vendor:"Compuscan Credit check",
             category:"Credit",
             location: "onRight",
             opacity: 1,
             bgColor: "#0091d1"
            },  
          
            {vendor:"Experian Criminal Check", 
             category:"Criminal",
             location: "onLeft",
             opacity: 1,
             bgColor: "#0091d1"
            },  
          
            {vendor:"XDS Identity Check", 
             category:"Identity",
             location: "onRight",
             opacity: 1,
             bgColor: "#0091d1"
            },

            {vendor:"MIE Drivers Check", 
             category:"Drivers",
             location: "onLeft",
             opacity: 1,
             bgColor: "#0091d1"
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
        <div id="vendor" style={{cursor:this.state.cursor, backgroundColor: this.state.bgColor}} draggable onDragStart={(e) => this.onDragStart(e, check.vendor)} onDragEnd={(e) => this.onDragEnd(e)}>
          <h3>{check.category}</h3>
          <p>{check.vendor}</p>
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

          <div id="droppableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "onLeft")}>
            {checks.onLeft}
          </div>
          <div id="draggableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "onRight")}>
            {checks.onRight}
          </div>
        </div>
      </div>
    );
  }


  onDrop = (ev, pos) => {
    let vendor = ev.dataTransfer.getData("vendor");
    let tasks = this.state.checks.filter((check) => {
        if (check.vendor == vendor) {
          check.location = pos;           
        }              
        return check;       
     });        
     this.setState({           
        ...this.state,           
        tasks       
     });
     this.setState({cursor: "grab"});
  }
    

  onDragOver(event){
    event.preventDefault();
    this.setState({cursor: "grabbing"});
  }

  onDragStart(event, vendor){
    this.setState({cursor: "grabbing"});
    event.dataTransfer.setData("vendor", vendor);
  }
  
  onDragEnd(e){
    this.setState({cursor: "grab"});
  }

}


export default ReviewChecks;
