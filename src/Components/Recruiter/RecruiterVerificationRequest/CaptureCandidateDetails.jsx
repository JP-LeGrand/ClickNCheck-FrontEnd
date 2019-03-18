import React from 'react';
import './CaptureCandidateDetailStyle.scss';
import './MainContainerStyle.scss';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MainContainer from './MainContainer';
import Footer from '../../Shared/Footer/Footer';
import FooterPrevNext from '../../Shared/FooterPreviousNext/FooterPreviousNext';
import NavBar from '../NavBar/NavBar';
import userImg from '../../../Assets/user.svg';
import email from '../../../Assets/email.svg';
import phone from '../../../Assets/phone.svg';
import 'typeface-roboto';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Axios from 'axios';

class CaptureCandidateDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            div: false,
            candidates: [],
            firstName: '',
            surname: '',
            mSurname: '',
            email : '',
            phone : '',
            idNumber: '',
            idChoice: '',
            tableErrors: { email: '', id: '', phone: '' },
            emailValid: false,
            idValid: false,
            numberValid: false,
            tableValid: false,
            fieldID: 'FieldValue',
            fieldEmail: 'FieldValue',
            fieldPhone: 'FieldValue',
        };
        this.userNameHandler = this.userNameHandler.bind(this);
        this.userSurnameHandler =this.userSurnameHandler.bind(this);
        this.usermSurnameHandler = this.usermSurnameHandler.bind(this);
        this.userIdNumber = this.userIdNumber.bind(this);
        this.userEmailHandler = this.userEmailHandler.bind(this);
        this.userPhoneHandler = this.userPhoneHandler.bind(this);
        this.addCandidate = this.addCandidate.bind(this);
        this.userChoice = this.userChoice.bind(this);
        this.sendCandidates = this.sendCandidates.bind(this);
    }

    prevStep(){
        window.location = '/ReviewChecks';
    }
    changeDiv(event) {
        const indi = event.target.id;
        if (indi === 'bulk') {
            this.setState({
                div: true
            });
        } else {
            this.setState({
                div: false
            });
        }

    }
    sendCandidates(){
        console.log(this.state.candidates);
    }
    userNameHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            //   this.validateField(name, value);
        });
      
        // this.setState({ firstName: event.target.value });
    }
    userSurnameHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            // this.validateField(name, value);
        });
    }
    userIdNumber(event){
        this.setState({ idNumber: event.target.value });
    }
    usermSurnameHandler(event){
        this.setState({ mSurname: event.target.value });
    }
    userEmailHandler(event){
        this.setState({ email: event.target.value });
    }
    userPhoneHandler(event){
        this.setState({ phone: event.target.value });
    }
    userChoice(event){
        this.setState({ idChoice: event.target.value });
        console.log(this.state.idChoice)
    }
    addCandidate() {
        let body = {  
            Name: this.state.firstName,
            Surname: this.state.surname,
            Maiden_Surname: this.state.mSurname,   
            Email: this.state.email,
            Phone: this.state.phone,
            ID_Type: 'ID',
            ID_Passport: this.state.idNumber,
          
        }
        let aryCandaidate = [ ...this.state.candidates ];
        aryCandaidate.push(body);
        this.setState({
            candidates : aryCandaidate
        })
       

        this.setState({
            firstName : '',
            surname : '',
            mSurname : '',
            email : '',
            phone : '',
            idNumber : ''
        })

        //  Axios.post('https://localhost:44347/api/candidates/CreateCandidate/1', cadBody);

    }

    individual() {
        return (

            <div className="bodyPage">
                <div className="formBox">
                    <fieldset className="field1 current">
                        <div id="singleForm">
                            <div className="">
                                <ul id="progress_bar">
                                    <li className="active">Create Job Profile Name</li>
                                    <li className="active">Candidate Details</li>
                                    <li>Next Steps</li>
                                </ul>
                                <label className="candidateDetails">Capture Candidate Details</label>
                                <div className="uploadSwitch">
                                    <button className="indi" id="individual" onClick={event => this.changeDiv(event)}>INDIVIDUAL</button>
                                    <button className="bulk" id="bulk" onClick={event => this.changeDiv(event)}> BULK</button>

                                </div>
                                <br className="Line" />
                                <div className="innerFormBox">
                                    <div className="candidatesColumn">
                                        <h1 className="candidateHeader">Candidate(s)</h1>
                                        {this.state.candidates.map((user, index) => {
                                            return (
                                                <div className="wrappingDiv" key={index}>
                                                    <div className="Rectangle">
                                                        <p className="Candidate">{user.Name} {user.Surname}</p>
                                                    </div>
                               
                                                </div>
                                            );
                                        })
                                        }
                                        <p className="Add-another-candid"><a href="#" onClick={this.addCandidate}>+ Add another candidate</a></p>
                   
                                    </div>
                                    <div id="singleForm">
               
                                        <table className="rightTable">
                                            <thead />
                      
                                            <tbody>
                                                <h1 className="personalHeader">Personal Details</h1>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={userImg} />
                                                            <label className="inp">
                                                                <input id="firstName" placeholder="&nbsp;" name="firstName" value ={this.state.firstName} onChange={this.userNameHandler} />
                                                                <span className="label">Full First Name</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>  
                                                    </td>
                                                    <td> 
                                                        <div className="form-group">
                                                            <img src={userImg} />
                                                            <label className="inp">
                                                                <input id="surname" placeholder="&nbsp;" name="surname" value= {this.state.surname} onChange={this.userSurnameHandler} />
                                                                <span className="label">Surname</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={userImg} />
                                                            <label className="inp">
                                                                <input id="maidenName" placeholder="&nbsp;" name="maidenName" value ={this.state.mSurname} onChange={this.usermSurnameHandler} />
                                                                <span className="label">Maiden Surname</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <div className="radios">
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend" />
                                                        <RadioGroup roboto-label="ID or Passport" name="ID or Passport" className="radios" color="black" onClick={(event) => this.userChoice(event)}>
                                                            <FormControlLabel id="ID" className="" value="ID" control={<Radio />} label="ID" />
                                                            <FormControlLabel id="passport" className="" value="Passport" control={<Radio />} label="Passport" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="inp id">
                                                                <input id="idNumberForm" placeholder="&nbsp;" name="idNumberForm" value ={this.state.idNumber} onChange={this.userIdNumber}/>
                                                                <span className="label">ID Number</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={email} />
                                                            <label className="inp">
                                                                <input id="email" placeholder="&nbsp;" name="email" value ={this.state.email} onChange={this.userEmailHandler}/>
                                                                <span className="label">Email Address</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={phone} />
                                                            <label className="inp">
                                                                <input id="phone" placeholder="&nbsp;" name="phone" value ={this.state.phone} onChange={this.userPhoneHandler}/>
                                                                <span className="label">Telephone Number</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div id="buttonFooter">
                    <button id="prev" onClick={this.prevStep}>BACK</button>
                    <button id="next" onClick={this.sendCandidates}>SUBMIT</button>
                </div>
                <Footer />
            </div>
             
        );
    }
    render() {
        return (
            <div>
                <NavBar />
                {!this.state.div ? this.individual() : <MainContainer />}
                                
            </div>
        );
    }
}
export default CaptureCandidateDetails;