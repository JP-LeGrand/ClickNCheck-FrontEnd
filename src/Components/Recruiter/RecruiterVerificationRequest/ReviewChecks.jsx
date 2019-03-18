/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import { BASE_URL } from '../../../Shared/Constants';
import NavBar from '../NavBar/NavBar';
import ReactSelect from '../RecruiterVerificationRequest/ReactSelect';

class ReviewChecks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cursor: 'grab',
            checks: []
        };
        this.individualForm = this.individualForm.bind(this);
    }

    verificationChecks(){
        window.location = '/NewVerificationRequest';
    }
    individualForm(){
        let checks = [];
        this.state.checks.forEach((check) => {
            if (check.location == 'onLeft'){
                checks.push(check.id);
            }
        });
        let createVerReq = {
            checks: checks,
            IsComplete: true
        };
        fetch(BASE_URL+'VerificationChecks/CreateVerificationCheck/'+localStorage.getItem('jpID'), {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ sessionStorage.getItem('token')
            },
            body: JSON.stringify(createVerReq),
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        } )
        .then((response) => response.json())  
        .then(
            response => {
                localStorage.setItem('ver_check', response);
                window.location = '/candidate/individual';
            },
            (error) => {
                alert(error);
            });
    }
    render() {
        let checks = {
            onLeft: [],
            onRight: []
        };

        /**Run through the tasks array inside state and put each check on the left or right
     * side of the page depending on whether it came with the jobProfile or not*/
        
        this.state.checks.forEach((check) => {
            checks[check.location].push(check);
        });
        const listItems = checks.onLeft.map((item) =>
            <li id="jobProfileChecks">{item.category}</li>
        );
        return (
            <div className="bodyPage">
                <NavBar />
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Select verification checks</li>
                        <li>Candidate Details</li>
                        <li>Next Steps</li> 
                    </ul>
                    <h3>Job Profile</h3>
                    <ReactSelect defaultProf={localStorage.getItem('jp')}/>
                    <hr className="Line" />
                    <p className="Verification-checks">Verification checks required for {localStorage.getItem('jp')}</p>
                    <ul>
                        {listItems}
                    </ul>
                </div>
                <div id="buttonFooter">
                    <button id="prev" onClick={this.verificationChecks}>BACK</button>
                    <button id="next" onClick={this.individualForm}>NEXT</button>
                </div>
                <Footer />
            </div>
        );
    }

  onDrop = (ev, pos) => {
      let vendor = ev.dataTransfer.getData('vendor');
      let cat = ev.dataTransfer.getData('category');
      let tasks = this.state.checks.filter((check) => {
          if (check.vendors[0] == vendor) {
              check.location = pos;
              if (check.bgColor == '#FFFFFF'){
                  check.bgColor = '#0091d1';
                  check.color = 'white';
              } else {
                  check.bgColor = '#FFFFFF';
                  check.color = 'black';
              }
              this.state.checks.forEach((c) =>{
                  if (c.category == cat && c.location != pos){
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
      this.setState({ cursor: 'grab' });
  }

  onDragOver(event){
      event.preventDefault();
      this.setState({ cursor: 'grabbing' });
  }

  onDragStart(event, vendor, cat){
      this.setState({ cursor: 'grabbing' });
      event.dataTransfer.setData('vendor', vendor);
      event.dataTransfer.setData('category', cat);
  }
  
  onDragEnd(e){
      this.setState({ cursor: 'grab' });
  }

  componentDidMount(){
      let arr = [];
      fetch(BASE_URL+'JobProfiles/jobChecks/'+localStorage.getItem('jpID'), {
          method: 'GET',
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ sessionStorage.getItem('token')
          },
          redirect: 'manual', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client 
      })
          .then((response) => response.json())  
          .then(
              response => {
                  response.forEach((check) =>{
                      arr.push({
                          vendors: [ check.name ],
                          category: check.category,
                          categoryID: check.checkCategoryID,
                          location: 'onLeft',
                          id: check.id,
                          bgColor: '#0091d1',
                          cssID: 'vendor2',
                          color: 'white'
                      });
                  });
                  this.setState({ checks: arr });
              },
              (error) => {
                  alert(error);
              });

      fetch(BASE_URL+'JobProfiles/getAllChecks' , {
          method: 'GET',
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ sessionStorage.getItem('token')
          },
          redirect: 'manual', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client 
      })
          .then((response) => response.json())  
          .then(
              response => {
                  response.forEach((check) =>{
                      arr.push({
                          vendors: [ check.name ],
                          category: check.checkType,
                          categoryID: check.checkTypeID,
                          location: 'onRight',
                          id: check.id,
                          bgColor: '#FFFFFF',
                          cssID: 'vendor1',
                          color: 'black'
                      });
                  });
                  this.setState({ checks: arr });
              },
              (error) => {
                  alert(error);
              });
  }
}

export default ReviewChecks;