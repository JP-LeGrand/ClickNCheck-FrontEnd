import React from "react";
import "./MainContainerStyle.scss";
import { GET_ALL_JOB_PROFILE_CHECKS } from "../../../Shared/Constants";

class ReviewChecks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cursor: "grab",
      checks: []
    };
  }

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
        <div id="vendor" style={{cursor:this.state.cursor, backgroundColor: this.state.bgColor}} draggable onDragStart={(e) => this.onDragStart(e, check.vendors[0], check.category)} onDragEnd={(e) => this.onDragEnd(e)}>
          <h3>{check.category}</h3>
          <p>{check.vendors}</p>
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
    let cat = ev.dataTransfer.getData("category");
    let tasks = this.state.checks.filter((check) => {
        if (check.vendors[0] == vendor) {
          check.location = pos;
          this.state.checks.forEach((c) =>{
            if(c.category == cat && c.location != pos){
              c.vendors.push(check.vendors[0]);
              return c;
            }
          });     
        }       
        return check;       
     }); 
    
     this.setState({           
        ...this.state,           
        tasks       
     });
     this.setState({cursor: "grab"});
     console.log(this.state);
  }
    

  onDragOver(event){
    event.preventDefault();
    this.setState({cursor: "grabbing"});
  }

  onDragStart(event, vendor, cat){
    this.setState({cursor: "grabbing"});
    event.dataTransfer.setData("vendor", vendor);
    event.dataTransfer.setData("category", cat);
  }
  
  onDragEnd(e){
    this.setState({cursor: "grab"});
  }

  componentDidMount(){
    var arr = [];
    fetch('https://localhost:44347/api/'+'JobProfiles/jobChecks/1' , {
      method: 'GET',
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'manual', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client 
    } )
    .then((response) => response.json())  
    .then(
       response => {
        response.forEach((check) =>{
          arr.push({
            vendors: [check.name],
            category: check.category,
            categoryID: check.checkCategoryID,
            location: "onLeft",
            id: check.id
          })
        });
    },
    (error) => {
      alert(error);
    });

    fetch('https://localhost:44347/api/JobProfiles/'+'getAllChecks' , {
      method: 'GET',
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'manual', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client 
    } )
    .then((response) => response.json())  
    .then(
       response => {
        response.forEach((check) =>{
          arr.push({
            vendors: [check.name],
            category: check.checkType,
            categoryID: check.checkTypeID,
            location: "onRight",
            id: check.id
          })
        });
        this.setState({checks: arr});
    },
    (error) => {
      alert(error);
    });

    
  }
 
}
  

export default ReviewChecks;


