import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Register.scss';
import imgMain from '../../../Assets/main.svg';
import { ChangePasswordConstrants } from '../../Shared/ChangePassword/ChangePasswordConstants';
import { BASE_URL, OTP_AUTHENTICATION, REGISTER_USER } from '../../../Shared/Constants';
import passImg from '../../../Assets/password.svg';
import rollingImg from '../../../Assets/Rolling.svg';
import { ZERO } from '../../../Shared/IntConstants';
import Axios from 'axios';
import { ToastContainer, toast } from 'mdbreact';

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
            file:null,
            userId: ''
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
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
              let userid = this.state.userId;
              let pl = [ userid,this.state.password,this.state.selectedManager ];
              fetch(BASE_URL+'users/register', {
                  method: 'POST',
                  mode: 'cors', // no-cors, cors, *same-origin
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'same-origin', // include, *same-origin, omit
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  redirect: 'manual', // manual, *follow, error
                  referrer: 'no-referrer', // no-referrer, *client
                  body: JSON.stringify(pl), 
              } )
                  .then(
                      () => {
                          fetch(BASE_URL + 'users/'+userid+'/UploadFile', {
                              method: 'POST',
                              mode: 'cors', // no-cors, cors, *same-origin
                              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                              credentials: 'same-origin', // include, *same-origin, omit
                              headers: {
                                  'Content-Type': 'false',
                                  'processData':'false'
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
                                  () => {
                                      this.setState({ loading:false });
                                  }     
                              );
                      },
                      (error) => {
                          this.setState({ loading:false });
                          this.setState({ canSubmit:true });
                      }
                  );
          });
      }

      onChange(e){
          this.setState({ file:e.target.files[ZERO] });
      }

      handleChange(e){
          this.setState({ selectedManager: e.selectedManager });
      }
      
      changePassword(){
          this.setState({ loading:true });
          let userid = this.state.userId;
          let pl = [ userid,this.state.password ];
          const url = BASE_URL+REGISTER_USER;
          const config = {
              headers: {
                  'content-type': 'application/json'
              }
          };

          return Axios.post(url,pl,config);
      }

      fileUpload(file){
          let userid = this.state.userId;
          const url = BASE_URL + 'users/'+userid+'/UploadFile';
          const formData = new FormData();
          formData.append('file',file);
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
          return Axios.post(url, formData,config);
      }

      otp(){
          let userid = this.state.userId;
          const url = BASE_URL + OTP_AUTHENTICATION;
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              } };
          return Axios.post(url,userid,config);
      }

      onFormSubmit(e){
          e.preventDefault(); // Stop form submit
          this.changePassword().then( () => this.fileUpload(this.state.file).then((response)=>{
              if (response.data === 'Upload Success'){
                  this.otp()
                      .then(
                          () => {
                              window.location = '/otp';
                          },
                          (error) => {
                              alert(error);
                          }
                      );
              }
          },
          () => {
              
              this.setState({ loading:false });
              toast.error('There was an error in your file upload', {
                  autoClose: 3000
              });
          }
          ),
          () => {
              toast.error('An error has occured', {
                  autoClose: 3000
              });
          });
      }

      render(){
          return (
              <Fragment>
                  <ToastContainer
                      hideProgressBar={true}
                      newestOnTop={true}
                      autoClose={5000}
                  />
                  <div className="Register">
                      <div className="changePassword">
                          <header className="headSection">
                              <img src={imgMain} alt="Company Logo"/>
                          </header>

                          <div className="mainSection">
                              <div className="registrationHeading">User Registration</div>
                              <div className="registrationHeading3">Create New Passowrd</div>
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
                                  <div className="registrationHeading2">Select new Profile Picture</div>
                                  <input type="file" name="file" id="file" className="inputfile" accept=".jpg,.jpeg,.png,.ico" onChange={this.onChange}/>
                                  <div className="form-group">
                                      <button id="btnSend" type="Submit" onClick={this.onFormSubmit} disabled={this.state.canSubmit}>Send</button>
                                  </div>
                                  <div className="loading">
                                      {this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Fragment>
          );
      }

      componentDidMount(){
          let id = this.props.match.params.userId;
          this.setState({ userId:id });
          localStorage.setItem('user_id', id);
      }
}

export default connect()(Register);