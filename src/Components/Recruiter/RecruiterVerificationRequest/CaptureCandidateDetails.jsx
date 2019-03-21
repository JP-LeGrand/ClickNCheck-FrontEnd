import React from 'react';
import './CaptureCandidateDetailStyle.scss';
import './MainContainerStyle.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MainContainer from './MainContainer';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../NavBar/NavBar';
import userImg from '../../../Assets/user.svg';
import email from '../../../Assets/email.svg';
import phone from '../../../Assets/phone.svg';
import white_save from '../../../Assets/white_save.svg';

import 'typeface-roboto';
import Axios from 'axios';
import { RecruiterConstants } from './recruiterConstants';
import rollingImg from '../../../Assets/Rolling.svg';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';
import './candidateUploadContainer.scss';

class CaptureCandidateDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            div: false,
            candidates: [],
            firstName: '',
            surname: '',
            mSurname: '',
            email: '',
            phone: '',
            idNumber: '',
            idChoice: '',
            tableErrors: { email: '', id: '', phone: '' },
            emailValid: true,
            idValid: true,
            numberValid: true,
            tableValid: false,
            fieldID: 'inp',
            fieldEmail: 'inp',
            fieldPhone: 'inp',
            errorID: '',
            errorPhone: '',
            errorEmail: '',
            loading: false,
        };
        this.userNameHandler = this.userNameHandler.bind(this);
        this.userSurnameHandler = this.userSurnameHandler.bind(this);
        this.usermSurnameHandler = this.usermSurnameHandler.bind(this);
        this.userIdNumber = this.userIdNumber.bind(this);
        this.userEmailHandler = this.userEmailHandler.bind(this);
        this.userPhoneHandler = this.userPhoneHandler.bind(this);
        this.addCandidate = this.addCandidate.bind(this);
        this.userChoice = this.userChoice.bind(this);
        this.sendCandidates = this.sendCandidates.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    prevStep() {
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
    sendCandidates() {
        this.setState({
            loading: true
        });
        let candidate = {
            candidates: this.state.candidates,
        };
        let ver_check = localStorage.getItem('ver_check');

        Axios.post(BASE_URL + CREATE_CANDIDATE + ver_check, candidate)
            .then((response) => {
                window.location = '/VerificationConfirmed';
            },
            (error) => {
                console.log(error);
            }

            );
    }
    userNameHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            //   this.validateField(name, value);
        });

        // this.setState({ firstName: event.target.value });
    }
    userSurnameHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            // this.validateField(name, value);
        });
    }
    userIdNumber(event) {
        this.validateField(event.target.name, event.target.value);
        this.setState({ idNumber: event.target.value });
    }
    usermSurnameHandler(event) {

        this.setState({ mSurname: event.target.value });
    }
    userEmailHandler(event) {
        this.validateField(event.target.name, event.target.value);
        this.setState({ email: event.target.value });
    }
    userPhoneHandler(event) {
        this.validateField(event.target.name, event.target.value);
        this.setState({ phone: event.target.value });
    }
    userChoice(event) {
        this.setState({ idChoice: event.target.value });

    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let idValid = this.state.idValid;
        let numberValid = this.state.numberValid;
        let tableValidationErrors = this.state.tableErrors;

        switch (fieldName) {
        case 'email':
            emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            tableValidationErrors.email = emailValid ? true : false;
     
            if (!tableValidationErrors.email){
                this.setState({
                    errorEmail : 'invalid email'
                });
         
            } else {
                this.setState({
                    errorEmail: '',
                });
            }
            break;

        case 'id':
            idValid = value.length === RecruiterConstants.idNumberLen;
            tableValidationErrors.id = idValid ? true : false;
            if (!tableValidationErrors.id) {
                this.setState({
                    errorID: 'invalid id number'
                });

            } else {
                this.setState({
                    errorID: '',
                });
            }
            break;

        case 'phone':
            numberValid = value.length === RecruiterConstants.phoneNumberLen;
            tableValidationErrors.phone = numberValid ? true : false;
            if (!tableValidationErrors.phone) {
                this.setState({
                    errorPhone: 'invalid phone number'
                });

            } else {
                this.setState({
                    errorPhone: '',
                });
            }
            break;

        default:
            break;

        }
        this.setState(
            {
                tableErrors: tableValidationErrors,
                emailValid: emailValid,
                numberValid: numberValid,
                idValid: idValid
            },
            this.validateTable
        );
    }
    validateTable() {
        this.setState({
            tableValid:
                this.state.emailValid && this.state.idValid && this.state.numberValid
        });

        if (this.state.idValid === false) {
            this.setState({
                fieldID: 'invalid'
            });
        } else {
            this.setState({
                fieldID: 'inp'
            });
        }
        console.log(this.state.tableErrors.email)
        if (this.state.tableErrors.email === false) {
            this.setState({
                fieldEmail: 'invalid'
            });
        } else {
            this.setState({
                fieldEmail: 'inp'
            });
        }

        if (this.state.numberValid === false) {
            this.setState({
                fieldPhone: 'invalid'
            });
        } else {
            this.setState({
                fieldPhone: 'inp'
            });
        }
    }

    addCandidate() {

        if (this.state.firstName !== '' && this.state.surname !== '' && this.state.mSurname !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.idNumber !== '') {
            let body = {
                Name: this.state.firstName,
                Surname: this.state.surname,
                Maiden_Surname: this.state.mSurname,
                Email: this.state.email,
                Phone: this.state.phone,
                ID_Type: 'ID',
                ID_Passport: this.state.idNumber,

            };
            let aryCandaidate = [...this.state.candidates];
            aryCandaidate.push(body);
            this.setState({
                candidates: aryCandaidate
            });

            this.setState({
                firstName: '',
                surname: '',
                mSurname: '',
                email: '',
                phone: '',
                idNumber: '',
                emailValid: true,
                idValid: true,
                numberValid: true,

                fieldID: 'inp',
                fieldEmail: 'inp',
                fieldPhone: 'inp',
            });
        } else {
            window.alert('All fields must be filled');
        }

    }

    individual() {
        return (

            <div className="bodyPage">
                <h2 id="newVTitile"><b>New Verification Request</b></h2>
                <h3 id="JPTitle">Job Profile</h3>
                <div className="formBox">
                    <fieldset className="field1 current">
                        <div id="singleForm">
                            <div className="">
                                <ul id="progress_bar">
                                    <li className="active">Select Verification Checks</li>
                                    <li className="active"><b>Candidate Details</b></li>
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
                                        <p className="Add-another-candid">{this.state.tableValid ? <a href="#" onClick={this.addCandidate}>+ Add another candidate</a> : "Add another candidate"}</p>

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
                                                                <input id="firstName" placeholder="&nbsp;" name="firstName" value={this.state.firstName} onChange={this.userNameHandler} />
                                                                <span className="label">Full First Name</span>
                                                                <span className="border"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={userImg} />
                                                            <label className="inp">
                                                                <input id="surname" placeholder="&nbsp;" name="surname" value={this.state.surname} onChange={this.userSurnameHandler} />
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
                                                                <input id="maidenName" placeholder="&nbsp;" name="maidenName" value={this.state.mSurname} onChange={this.usermSurnameHandler} />
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
                                                            <label className={this.state.fieldID}>
                                                                <input id="idNumberForm" placeholder="&nbsp;" maxLength={'13'} name="id" value={this.state.idNumber} onChange={(event) => this.userIdNumber(event)} />
                                                                <span className="label">ID Number</span>
                                                                <span className="border"></span>
                                                                <label className="error">
                                                                    {this.state.errorID}
                                                                </label>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={email} />
                                                            <label className={this.state.fieldEmail}>
                                                                <input id="email" placeholder="&nbsp;" name="email" value={this.state.email} onChange={(event) => this.userEmailHandler(event)} />
                                                                <span className="label">Email Address</span>
                                                                <span className="border"></span>
                                                                <label className="error">
                                                                    {this.state.errorEmail}
                                                                </label>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <img src={phone} />
                                                            <label className={this.state.fieldPhone}>
                                                                <input id="phone" placeholder="&nbsp;" name="phone" maxLength={'10'} value={this.state.phone} onChange={(event) => this.userPhoneHandler(event)} />
                                                                <span className="label">Telephone Number</span>
                                                                <span className="border"></span>
                                                                <label className="error">
                                                                    {this.state.errorPhone}
                                                                </label>
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
                    <button id="next" disabled={!this.state.tableValid} onClick={this.sendCandidates}>SUBMIT</button>
                    <div className="loading">{this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}</div>

                </div>
                <Footer />
            </div>

        );
    }
    render() {
        return (
            <div className="candidateNav">
                <NavBar />
                {!this.state.div ? this.individual() : <MainContainer />}

            </div>
        );
    }
}
export default CaptureCandidateDetails;