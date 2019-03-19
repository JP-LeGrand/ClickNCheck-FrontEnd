/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import { BASE_URL } from '../../../Shared/Constants';
import NavBar from '../NavBar/NavBar';
import ReactSelect from '../RecruiterVerificationRequest/ReactSelect';
import { connect } from 'react-redux';
import AddRemoveChecks from './AddRemoveChecks';
import ProfileChecks from './ProfileChecks'

class ReviewChecks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cursor: 'grab',
            checks: [],
            displayChecks: true,
        };
        this.addRemoveChecks = this.addRemoveChecks.bind(this);
        this.individualForm = this.individualForm.bind(this);
        this.verificationChecks = this.verificationChecks.bind(this);
    }

    verificationChecks(){
        window.location = '/NewVerificationRequest';
    }
    addRemoveChecks(){
        if (this.state.displayChecks){
            this.setState({ displayChecks: false });
        } else {
            this.setState({ displayChecks: true });
        }
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
        return (
            <div className="bodyPage" style={{ display: this.state.display }}>
                <NavBar />
                <div id="spanHolder">
                    <span className="New-Verification-Req">New Verification Request</span>
                    <span className="Job-Profile">Job Profile</span>
                </div>
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Select verification checks</li>
                        <li>Candidate Details</li>
                        <li>Next Steps</li> 
                    </ul>
                    <h3>Job Profile</h3>
                    <ReactSelect defaultProf={localStorage.getItem('jp')}/>
                    <hr className="Line" />
                    {
                        this.state.displayChecks ?
                        <ProfileChecks addRemove={this.addRemoveChecks}/> : <AddRemoveChecks addRemove={this.addRemoveChecks} defaultChecks={this.state.checks}/>
                        
                    }
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
      if (this.state.checks.length == 0){
          fetch(BASE_URL+'JobProfiles/jobChecks/'+localStorage.getItem('jpID') , {
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
                            category: check.category,
                            categoryID: check.checkCategoryID,
                            location: 'onRight',
                            id: check.id
                        });
                    });
                    this.setState({ checks: arr });

                },
                (error) => {
                    alert(error);
                });
        }
  }
}

export default connect() (ReviewChecks);