import React from "react";
import "./MainContainerStyle.scss";

class ReviewChecks extends React.Component {

  state = {

  };

  render() {
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

          <div id="droppableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
            <div className="checkType">
              <h4>Credit</h4>
              <div id="vendor" draggable onDragStart={(e) => this.onDragStart(e)}>
                <p>Experian Credit check</p>
              </div>
            </div>
          </div>
          <div id="draggableContainer" droppable="true" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
            <div className="checkType">
              <h4>Criminal</h4>
              <div id="vendor" draggable  onDragStart={(e) => this.onDragStart(e)}>
                <p>Compuscan Criminal check</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  onDrop(event){
    event.preventDefault();
  }

  onDragOver(event){
    event.preventDefault();
  }

  onDragStart(event){
    event.preventDefault();
  }
}


export default ReviewChecks;
