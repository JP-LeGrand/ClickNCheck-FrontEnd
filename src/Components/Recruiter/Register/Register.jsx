import React from 'react';
import { connect } from 'react-redux'; 
import vv from 'prop-types';
import './Register.scss';
import imgMain from '../../../Assets/main.svg';
import { ChangePasswordConstrants } from '../../Shared/ChangePassword/ChangePasswordConstants';
import { BASE_URL, CHANGE_PASSWORD, OTP_AUTHENTICATION,GET_MANAGERS } from '../../../Shared/Constants';
import passImg from '../../../Assets/password.svg';
import rollingImg from '../../../Assets/Rolling.svg';
import ManagerSelect from './ManagerSelect';
class Register extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmpassword:'',
            errorMessage: '',
            passwordStrength: '',
            passwordMatchMessage:'',
            canSubmit:'disabled',
            loading:false,
            defaultManager:'Select your Manager',
            managers:[],
            selectedManager: 'Select your Manager'
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    measureStrength = (password) => {
        let score = 0;
        let passwordStrength;
        let regexPositive = [
            '[A-Z]',
            '[a-z]',
            '[0-9]',
            '\\W',
        ];
        regexPositive.forEach((regex, index) => {
            if (new RegExp(regex).test(password)) {
                score += ChangePasswordConstrants.ScoreIncrement;
            }
        });
        switch (score) {
        case ChangePasswordConstrants.ReallyWeak:
        case ChangePasswordConstrants.Weak:
            passwordStrength='weak';
            break;
        case ChangePasswordConstrants.Good:
        case ChangePasswordConstrants.ReallyGood:
            passwordStrength='good';
            break;
        case ChangePasswordConstrants.Strong:
        case ChangePasswordConstrants.ReallyStrong:
            passwordStrength='strong';     
            break;
        default:
        }

        this.setState({
            passwordStrength
        });
    }
    
      validate = (e) => {
          let password = e.target.value;
          let errorMessage;
          let capsCount, smallCount, numberCount, symbolCount;
          if (password.length < ChangePasswordConstrants.MinPassLenght) {
              this.setState({
                  errorMessage: 'password must be min 8 characters',
              });
          } else {
              capsCount = (password.match(/[A-Z]/g) || []).length;
              smallCount = (password.match(/[a-z]/g) || []).length;
              numberCount = (password.match(/[0-9]/g) || []).length;
              symbolCount = (password.match(/\W/g) || []).length;
              if (capsCount < ChangePasswordConstrants.MinCapsCount) {
                  errorMessage = 'must contain caps';
              } else if (smallCount < ChangePasswordConstrants.MinSmallCount) {
                  errorMessage = 'must contain small';
              } else if (numberCount < ChangePasswordConstrants.MinNumberCount) {
                  errorMessage = 'must contain a number';
              } else if (symbolCount < ChangePasswordConstrants.MinSpecialCount) {
                  errorMessage = 'must contain a special character';
              }
              this.setState({
                  errorMessage
              });
              this.measureStrength(password);
          }
      }

      validatePasswordMatch = (e) =>{
          let confirmPassword = e.target.value;
          let canSubmit = this.state.canSubmit;
          let passwordMatchMessage;
          if (confirmPassword.length >= ChangePasswordConstrants.Mincount && this.state.password.length >= ChangePasswordConstrants.Mincount ){
              if (confirmPassword !== this.state.password){
                  passwordMatchMessage = 'passwords do not match';
              } else {
                  canSubmit = '';
                  this.setState({ canSubmit
                  });
              }
          }
          this.setState({
              passwordMatchMessage
          });
      }
    
      handlePasswordChange = (e) => {
          this.validate(e);
          this.setState({ password: e.target.value });
      }
      
      handleConfirmChange = (e) =>{
          this.validatePasswordMatch(e);
          this.setState({ confirmpassword: e.target.value });
      }

      handleSubmit(event){
          this.setState({ loading:true }, () =>{
              this.setState({ canSubmit:false });
              event.preventDefault();
              let userid = localStorage.getItem('user_id');
              fetch(BASE_URL+CHANGE_PASSWORD+userid, {
                  method: 'POST',
                  mode: 'cors', // no-cors, cors, *same-origin
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'same-origin', // include, *same-origin, omit
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  redirect: 'manual', // manual, *follow, error
                  referrer: 'no-referrer', // no-referrer, *client
                  body: JSON.stringify(this.state.password), 
              } )
                  .then(
                      () => {
                          fetch(BASE_URL + OTP_AUTHENTICATION, {
                              method: 'POST',
                              mode: 'cors', // no-cors, cors, *same-origin
                              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                              credentials: 'same-origin', // include, *same-origin, omit
                              headers: {
                                  'Content-Type': 'application/json',
                              },
                              redirect: 'manual', // manual, *follow, error
                              referrer: 'no-referrer', // no-referrer, *client
                              body: JSON.stringify(userid), 
                          } )
                              .then((response) => response.json())  
                              .then(
                                  () => {
                                      window.location = '/otp';
                                  },
                                  (error) => {
                                      alert(error);
                                  }     
                              );
                          window.redirect = '';
                      },
                      (error) => {
                          alert(error);
                          this.setState({ loading:false });
                          this.setState({ canSubmit:true });
                      }
                  );
          });
      }

      handleChange = (e) =>{
          this.setState({ selectedManager: e.selectedManager });
      }

      render(){
          return (
              <div className="changePassword">
                  <header className="headSection">
                      <img src={imgMain} alt="Company Logo"/>
                  </header>

                  <div className="mainSection">
                      <div className="registrationHeading">User Registration</div>
                      <div className="sendWhatmanager">
                        <ManagerSelect managers={this.state.managers} defaultManager={this.state.defaultManager} onSelectManager={this.handleChange}/>
                      </div>
                      <div className="registrationHeading">Create New Passowrd</div>
                      <div className="sendWhat">
                          <label className="passwordSpecDiv">
                              Password Requirements:
                              <ul>
                                  <li>A minimum of 8 characters</li>
                                  <li>Must contain a special character</li>
                                  <li>Must contain a Number</li>
                                  <li>Must contain a Caps</li>
                              </ul>
                          </label>
                          <div className="form-group">
                              <img src={passImg} alt="Lock"/>
                              <label className="inp">
                                  <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="&nbsp;"/>
                                  <span className="label">Password</span>
                                  <span className="border"></span>
                              </label>
                          </div>
                          <div className="form-group">
                              <img src={passImg} alt="Lock"/>
                              <label className="inp">
                                  <input type="password" value={this.state.confirmpassword} onChange={this.handleConfirmChange} placeholder="&nbsp;"/>
                                  <span className="label">Confirm Password</span>
                                  <span className="border"></span>
                                  <label className="error">
                                      {this.state.passwordMatchMessage}
                                  </label>
                              </label>
                          </div>
                          <div className="form-group">
                              <div className="registrationHeading">Select Profile Picture</div>
                              <img src={passImg} alt="Lock"/>
                              <label className="inp">
                                  <input type="file" value={this.state.password} onChange={this.handlePasswordChange} placeholder="&nbsp;"/>
                                  <span className="label">Image</span>
                                  <span className="border"></span>
                              </label>
                          </div>
                          <div className="form-group">
                              <button id="btnSend" onClick={this.handleSubmit} disabled={this.state.canSubmit}>Send</button>
                          </div>
                      </div>
                      <div className="loading">
                          {this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                      </div>
                  </div>
              </div>
          );
      }

      componentDidMount(){
          let arr = [];
          fetch(BASE_URL+GET_MANAGERS+'4', {
              method: 'GET',
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  'Content-Type': 'application/json'
              },
              redirect: 'manual', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client 
          } )
              .then((response) => response.json())  
              .then(
                  response => {
                      response.forEach((manager) =>{
                          arr.push({
                              id: manager.id,
                              value: manager.name+' '+manager.surname,
                              label: manager.name+' '+manager.surname
                          });
                      });
                      this.setState({ managers: arr });
                  },
                  (error) => {
                      alert(error);
                  });
      }
}

export default connect()(Register);