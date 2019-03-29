import React, { Fragment } from 'react';
import './CaptureCandidateDetailStyle.scss';
import './MainContainerStyle.scss';
import Radio from '@material-ui/core/Radio';
//import 'semantic-ui-css/semantic.min.css';
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
import * as CandidateActions from './CandidateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'typeface-roboto';
import Axios from 'axios';
import { RecruiterConstants } from './recruiterConstants';
import { rollingImg } from '../../../Assets/Rolling.svg';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';
import { ToastContainer, toast } from 'mdbreact';
import saveImg from '../../../Assets/save_white.svg';
//import { Form, Radio } from 'semantic-ui-react';

class CaptureCandidateDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            firstName: '',
            surname: '',
            mSurname: '',
            email: '',
            phone: '',
            idNumber: '',
            idChoice: '',
            dob: '',
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
        this.validateField = this.validateField.bind(this);
        this.userDobHandler = this.userDobHandler.bind(this);
        this.submitIndividual = this.submitIndividual.bind(this);
    }

    prevStep() {
        window.location = '/ReviewChecks';
    }

    submitIndividual() {
        
        if (this.props.tableValid) {
            if (this.state.firstName !== '' && this.state.surname !== '' || this.state.mSurname !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.idNumber !== '') {
                let body = {
                    Name: this.state.firstName,
                    Surname: this.state.surname,
                    Maiden_Surname: this.state.mSurname || this.state.surname,
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
                this.props.udpateIndividual(aryCandaidate);
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
                toast.warn('Oops! All fields must be field before saving', {
                    autoClose: 5000
                });
            }
        } else {
            toast.warn('Oops! There is an invalid field. Please correct', {
                autoClose: 5000
            });
        }


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
        if (event.target.value.length <= 13) {
            this.validateField(event.target.name, event.target.value);
            this.setState({ idNumber: event.target.value });
        }

    }
    usermSurnameHandler(event) {

        this.setState({ mSurname: event.target.value });
    }
    userEmailHandler(event) {
        this.validateField(event.target.name, event.target.value);
        this.setState({ email: event.target.value });
    }
    userPhoneHandler(event) {

        if (event.target.value.length <= 10) {
            this.validateField(event.target.name, event.target.value);
            this.setState({ phone: event.target.value });
        }

    }
    userChoice(event) {
        this.setState({ idChoice: event.target.value });

    }
    userDobHandler(event) {
        this.setState({ dob: event.target.value });
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
            if (!tableValidationErrors.email) {
                this.setState({
                    errorEmail: 'invalid email',
                    fieldEmail: 'invalid',
                });

            } else {
                this.setState({
                    errorEmail: '',
                    fieldEmail: 'inp',
                });
            }
            break;

        case 'id':
            idValid = value.length === RecruiterConstants.idNumberLen;
            tableValidationErrors.id = idValid ? true : false;
            if (!tableValidationErrors.id) {
                this.setState({
                    errorID: 'invalid id number',
                    fieldID: 'invalid',
                });

            } else {
                this.setState({
                    errorID: '',
                    fieldID: 'inp',
                });
            }
            break;

        case 'phone':
            numberValid = value.length === RecruiterConstants.phoneNumberLen;
            tableValidationErrors.phone = numberValid ? true : false;
            if (!tableValidationErrors.phone) {
                this.setState({
                    errorPhone: 'invalid phone number',
                    fieldPhone: 'invalid',
                });

            } else {
                this.setState({
                    errorPhone: '',
                    fieldPhone: 'inp',
                });
            }
            break;

        default:
            break;

        }
        this.setState(
            {
                tableErrors: tableValidationErrors,
                emailValid: tableValidationErrors.email,
                numberValid: tableValidationErrors.phone,
                idValid: tableValidationErrors.id,
            });
        if (tableValidationErrors.email && tableValidationErrors.phone && tableValidationErrors.id) {
            this.props.checkTableValid(true);
        } else if (!tableValidationErrors.email || !tableValidationErrors.phone || !tableValidationErrors.id){
            this.props.checkTableValid(false);
        }
 
    }
    addCandidate() {
        
        if (this.state.firstName !== '' && this.state.surname !== '' || this.state.mSurname !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.idNumber !== '') {
            let body = {
                Name: this.state.firstName,
                Surname: this.state.surname,
                Maiden_Surname: this.state.mSurname || this.state.Surname,
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
            this.props.udpateIndividual(aryCandaidate);
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
            toast.warn('Oops! All fields must be filled before saving', {
                autoClose: 5000
            });
        }

    }

    render() {
        return (
            <Fragment>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000} />
                <div className="scrollbar" id="style-1">
                    <div className="force-overflow">
                        <div className="innerFormBox ">
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
                                <p className="Add-another-candid">{this.props.tableValid ? <a href="#" onClick={this.addCandidate}>+ Add another candidate</a> : 'Add another candidate'}</p>

                            </div>
                            <div id="singleForm">

                                <table className="rightTable">
                                    <thead />

                                    <tbody>
                                        <h1 className="personalHeader"><strong>Personal</strong> Details</h1>
                                        <tr>
                                            <td>
                                                <div className="form-group">

                                                    <img src={userImg} />
                                                    <p id="required">*</p>
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
                                                    <p id="required">*</p>
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
                                        <tr>
                                            <div className="radios">
                                                <p id="requiredRadio">*</p>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" />
                                                    <RadioGroup roboto-label="ID or Passport" name="ID or Passport" className="radios" color="black" onClick={(event) => this.userChoice(event)}>
                                                        <FormControlLabel id="ID" className="" value="ID" control={<Radio />} label="ID" />
                                                        <FormControlLabel id="passport" className="" value="Passport" control={<Radio />} label="Passport" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <img src={userImg} />
                                                    <p id="required">*</p>
                                                    <label className={this.state.fieldID}>
                                                        <input id="idNumberForm" placeholder="&nbsp;" type="number" name="id" value={this.state.idNumber} onChange={(event) => this.userIdNumber(event)} />
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
                                                    <p id="required">*</p>
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
                                                    <p id="required">*</p>
                                                    <label className={this.state.fieldPhone}>
                                                        <input id="phone" placeholder="&nbsp;" name="phone" type="number" maxLength={'10'} value={this.state.phone} onChange={(event) => this.userPhoneHandler(event)} />
                                                        <span className="label">Telephone Number</span>
                                                        <span className="border"></span>
                                                        <label className="error">
                                                            {this.state.errorPhone}
                                                        </label>
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <button type="button" onClick={this.submitIndividual} placeholder="Save Candidate" className="Rectangle-Copy-14">
                                                <img id="saveImg" src={saveImg} /><p id="saveBtnText">Save Candidate</p>
                                            </button>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    candidateIndividual: state.candidateState.candidateBody,
    tableValid: state.candidateState.tableValid

});

const mapActionToProps = (dispatch) => ({
    udpateIndividual: bindActionCreators(CandidateActions.updateArray, dispatch),
    checkTableValid: bindActionCreators(CandidateActions.isTableValid, dispatch),
    sendBulk: bindActionCreators(CandidateActions.submitCandidate, dispatch),
    clearTable: bindActionCreators(CandidateActions.clearTable, dispatch)
});
export default connect(mapStateToProps, mapActionToProps)(CaptureCandidateDetails);
