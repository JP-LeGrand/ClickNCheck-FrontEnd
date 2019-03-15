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

class CaptureCandidateDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            div: false
        };
    }

    prevStep(){
        window.location = '/ReviewChecks';
    }
    changeDiv(event) {
        const indi = event.target.id;
        if (indi == 'bulk') {
            this.setState({
                div: true
            });
        } else {
            this.setState({
                div: false
            });
        }

        //  cont indi1 = event.target.id;
        console.log(indi);
    }
    individual() {
        return (
            <div className="innerFormBox">
                <div className="candidatesColumn">
                    <h1 className="candidateHeader">Candidate(s)</h1>
                    <div className="wrappingDiv">
                        <div className="Rectangle">
                            <p className="Candidate">Candidate 1</p>
                        </div>
                        <p className="Add-another-candid">+ Add another candidate</p>
                    </div>
                </div>
                <div id="singleForm">
                    <table className="rightTable">
                        <thead />
                        <tbody>
                            <h1 className="candidateHeader">Personal Details</h1>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <img src={userImg} />
                                        <label className="inp">
                                            <input id="firstName" placeholder="&nbsp;" name="firstName" />
                                            <span className="label">Full First Name</span>
                                            <span className="border"></span>
                                        </label>
                                    </div>  
                                </td>
                                <td> 
                                    <div className="form-group">
                                        <img src={userImg} />
                                        <label className="inp">
                                            <input id="surname" placeholder="&nbsp;" name="surname" />
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
                                            <input id="maidenName" placeholder="&nbsp;" name="maidenName" />
                                            <span className="label">Maiden Surname</span>
                                            <span className="border"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <div className="radios">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" />
                                    <RadioGroup roboto-label="ID or Passport" name="ID or Passport" className="radios" color="black" >
                                        <FormControlLabel id="ID" className="" value="ID" control={<Radio />} label="ID" />
                                        <FormControlLabel id="passport" className="" value="Passport" control={<Radio />} label="Passport" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label className="inp id">
                                            <input id="idNumberForm" placeholder="&nbsp;" name="idNumberForm" />
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
                                            <input id="email" placeholder="&nbsp;" name="email" />
                                            <span className="label">Email Address</span>
                                            <span className="border"></span>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <img src={phone} />
                                        <label className="inp">
                                            <input id="phone" placeholder="&nbsp;" name="phone" />
                                            <span className="label">Telephone Number</span>
                                            <span className="border"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr />
                            <tr>
                             
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <NavBar />
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
                                        <button
                                            className="indi"
                                            id="individual"
                                            onClick={event => this.changeDiv(event)}
                                        >
                      INDIVIDUALLY
                                        </button>
                                        <button
                                            className="bulk"
                                            id="bulk"
                                            onClick={event => this.changeDiv(event)}
                                        >
                      BULK
                                        </button>
                                    </div>
                                    <br className="Line" />
                                    {!this.state.div ? this.individual() : <MainContainer />}
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div id="buttonFooter">
                        <button id="prev" onClick={this.prevStep}>BACK</button>
                        <button id="next">NEXT</button>
                    </div>
                    <Footer />
                </div>
                <Footer />
            </div>
        );
    }
}
export default CaptureCandidateDetails;