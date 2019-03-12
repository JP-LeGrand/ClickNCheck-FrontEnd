import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import imgMain from '../../../Assets/main.svg';
class ChangePassword extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            errorMessage: '',
            passwordStrength: '',
        };
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
                  score +=1;
              }
          });
          switch (score) {
          case 0:
          case 1:
              passwordStrength='weak';
              break;
          case 2:
          case 3:
              passwordStrength='good';
              break;
          case 4:
          case 5:
              passwordStrength='strong';        
              break;
          default:
          }

          this.setState({
              passwordStrength
          });
      }
    
      validate = (e) => {
          let password  = e.target.value;
          let errorMessage;
          let capsCount, smallCount, numberCount, symbolCount;
          if (password.length < 8) {
              this.setState({
                  errorMessage: 'password must be min 8 char',
              });
          }
          else {
              capsCount = (password.match(/[A-Z]/g) || []).length;
              smallCount = (password.match(/[a-z]/g) || []).length;
              numberCount = (password.match(/[0-9]/g) || []).length;
              symbolCount = (password.match(/\W/g) || []).length;
              if (capsCount < 1) {
                  errorMessage = 'must contain caps';
              }
              else if (smallCount < 1) {
                  errorMessage = 'must contain small';
              }
              else if (numberCount < 1) {
                  errorMessage = 'must contain a number';
              }
              else if (symbolCount < 1) {
                  errorMessage = 'must contain a special character';
              }
              this.setState({
                  errorMessage
              });
              this.measureStrength(password);
          }
      }
    
      handleChange = (e) => {
          this.validate(e);
          this.setState({ password: e.target.value });
      }
      render(){
          return (
              <div className="changePassword">
                  <header className="headSection">
                      <img src={imgMain}/>
                  </header>

                  <div className="mainSection">
                      <div className="registrationHeading">Change Password</div>
                      <div className="sendWhat">
                          <label className="inp">
                              <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="&nbsp;"/>
                              <span className="label">Password</span>
                              <span className="border"></span>
                          </label>
                          {this.state.errorMessage}
                          <label className="inp">
                              <input type="password" placeholder="&nbsp;"/>
                              <span className="label">Confirm Password</span>
                              <span className="border"></span>
                          </label>
                          <button id="btnSend" >Send</button>
                      </div>
                  </div>
              </div>
          );
      }
}

ChangePassword.propTypes = {
    homeState: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
};

const mapStateToProps = (state) => {
    return {
        homeState: state.homeState
    };
};
export default connect()(ChangePassword);