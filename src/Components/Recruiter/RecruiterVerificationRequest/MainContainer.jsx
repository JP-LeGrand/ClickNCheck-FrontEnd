import React from 'react';
import './MainContainerStyle.scss';
import XLSX from 'xlsx';
import { RecruiterConstants } from './recruiterConstants';
import Footer from '../../Shared/Footer/Footer';
import Axios from 'axios';
import rollingImg from '../../../Assets/Rolling.svg';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';
import CaptureCandidateDetails from './CaptureCandidateDetails';
import * as CandidateActions from './CandidateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            switchDiv: false,
            excelRows: [],
            fieldState: [],
            getFile: false,
            fileSize: '',
            email: '',
            id: '',
            number: '',
            tableErrors: { email: '', id: '', phone: '' },
            emailValid: false,
            idValid: false,
            numberValid: false,
            tableValid: false,
            loading: false,
        };
        this.submit = this.submit.bind(this);
        this.addBulkCandidates = this.addBulkCandidates.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    removeRow(index) {

        let arrayRows = this.state.excelRows.filter((value, i) => i !== index);
        let newNum = arrayRows.length;

        this.setState({
            excelRows: arrayRows,
            fileSize: newNum
        });

    }

    changeDiv(event) {
        const indi = event.target.id;
        console.log(indi);
        if (indi === 'individual') {
            this.setState({
                switchDiv: true
            });
        } else {
            this.setState({
                switchDiv: false
            });
        }

    }
    handleUserInput(index, event) {

        let propName = '';
        switch (event.target.name) {
            case 'name':
                propName = 'Name';
                break;
            case 'surname':
                propName = 'Surname';
                break;
            case 'madein':
                propName = 'Maiden_Surname';
                break;
            case 'id':
                propName = 'ID_Passport';
                if (event.target.value.length !== RecruiterConstants.idNumberLen) {
                    document.getElementById(event.target.id).setAttribute('class', 'InvalidField');

                } else {
                    document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
                    this.setState({
                        idValid: true
                    });
                }
                break;
            case 'dob':
                propName = 'Birthday';
                break;
            case 'email':
                propName = 'Email';
                if (!event.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    document.getElementById(event.target.id).setAttribute('class', 'InvalidField');

                } else {
                    document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
                    this.setState({
                        idValid: true
                    });
                }
                break;
            default:
                propName = 'Phone';
                if (event.target.value.length !== RecruiterConstants.phoneNumberLen) {
                    document.getElementById(event.target.id).setAttribute('class', 'InvalidField');

                } else {
                    document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
                    this.setState({
                        numberValid: true
                    });
                }
        }

        const newRows = [...this.state.excelRows];
        newRows[index][propName] = event.target.value;
        this.setState({
            excelRows: newRows,
            tableValid: this.state.emailValid && this.state.idValid && this.state.numberValid
        });
        this.props.update(this.state.excelRows)
        
    }
    nextStep() {
        window.location = '/VerificationConfirmed';
    }
    prevStep() {
        window.location = '/ReviewChecks';
    }
    submit() {
        let inputFile = document.getElementById('getFile');
        let reader = new FileReader();

        reader.onload = e => {
            let workbook = XLSX.read(e.target.result, {
                type: 'binary'
            });

            let firstSheet = workbook.SheetNames[0];
            let exceRows = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[firstSheet]
            );
            let number = exceRows.length;
            this.setState({
                excelRows: exceRows,
                getFile: true,
                fileSize: number
            });


            console.log(this.state.fileSize)

        };
        reader.readAsBinaryString(inputFile.files[0]);
    }
    addBulkCandidates() {
        this.setState({
            loading: true,
        });

        let body = {
            candidates: this.state.excelRows,
        };
        console.log(body);
        let var_check = localStorage.getItem('ver_check');
        Axios.post(BASE_URL + CREATE_CANDIDATE + var_check, body)
            .then(() => {
                window.location = '/VerificationConfirmed';
            });

    }

    review() {

        return (
            <fieldset className="field1 current">
                <table className="ImportTable">
                    <thead className="Headers">
                        <tr className="Headers">
                            <th>First Full Name</th>
                            <th>Surname</th>
                            <th>Maiden Name</th>
                            <th>ID/Passport</th>
                            <th>Birthday</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="Headers">
                        {this.state.excelRows.map((user, index) => {
                            return (
                                <tr className="Shape" key={index}>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" name="name" value={user.Name} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" name="surname" value={user.Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" name="madein" defaultValue={user.Maiden_Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" id={index+'id'} name="id" value={user.ID_Passport} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" name="dob" value={user.Birthday} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" id={index+'email'} name="email" value={user.Email} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td className="fieldContainer"><input className="FieldValue" type="text" id={index+'phone'} name="phone" value={user.Phone} onChange={event => this.handleUserInput(index, event)}/></td>
                                    <td><a href="#" onClick={(user) => this.removeRow(index, user)}><img src="https://img.icons8.com/ultraviolet/20/000000/delete.png" /></a></td>
                                </tr>
                            );
                        })}
                    </tbody>
                                    
                </table>
            </fieldset>
        );
    }

    bulk() {
        return (
            <fieldset className="field1 current">
                <div id="bulkForm">
                    <div className="upload-area" id="uploadfile">
                        <img
                            src={require('../../../Assets/upload-file.svg')}
                            alt="upload files here"
                        />
                        <h3>Drag and Drop or Click to upload File</h3>
                        <br />

                        <div className="upload-btn-wrapper">
                            <input
                                type="file"
                                name="file"
                                id="getFile"
                                onChange={() => this.submit()}
                            />
                            <a href="https://cncdocuments.blob.core.windows.net/recruiters/CandidateTemplate.xlsx" download>
                                <img
                                    src={require('../../../Assets/downloadFile.svg')}
                                    alt="download-fav"
                                />
                Download Excel Template
                            </a>
                        </div>
                    </div>
                </div>
            </fieldset>
                           
        );
    }

    render() {
        console.log(this.props);
        console.log(this.state.excelRows);
        return <div>
            {!this.state.getFile ? this.bulk() : this.review()}
        </div>;
    }
}

const mapStateToProps = state => ({
    bulkArray : state.candidateState.candidateBody
});

const mapActionToProps = (dispatch) => ({
    update : bindActionCreators (CandidateActions.updateArray, dispatch)
});
export default connect(mapStateToProps, mapActionToProps)(MainContainer);