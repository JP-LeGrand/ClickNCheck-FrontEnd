import React, { Fragment } from 'react';
import './MainContainerStyle.scss';
import XLSX from 'xlsx';
import { RecruiterConstants } from './recruiterConstants';
import Footer from '../../Shared/Footer/Footer';
import Axios from 'axios';
import rollingImg from '../../../Assets/Rolling.svg';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';
import * as CandidateActions from './CandidateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'mdbreact';

class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            excelRows: [],
            email: '',
            id: '',
            number: '',
            tableErrors: { email: '', id: '', phone: '' },
            emailValid: '',
            idValid: false,
            numberValid: false,
            sloading: false,
        };
        this.submit = this.submit.bind(this);
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
        });
        this.props.getSize(newNum);

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
                this.props.checkID(false);
            } else {
                document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
                this.props.checkID(true);
            }
            break;
        case 'dob':
            propName = 'Birthday';
            break;
        case 'email':
            propName = 'Email';
            let testing = event.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) 
            if (testing === null) {
                document.getElementById(event.target.id).setAttribute('class', 'InvalidField');
                this.props.checkEmail(false);
            } else {
                document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
                this.props.checkEmail(true);
            }
           
            break;
        default:
            propName = 'Phone';
            if (event.target.value.length !== RecruiterConstants.phoneNumberLen) {
                document.getElementById(event.target.id).setAttribute('class', 'InvalidField');

            } else {
                document.getElementById(event.target.id).setAttribute('class', 'FieldValue');
           
            }
        }

        const newRows = [ ...this.state.excelRows ];
        newRows[index][propName] = event.target.value;
        this.setState({
            excelRows: newRows,
        });
        this.props.update(this.state.excelRows);

    }
    nextStep() {
        window.location = '/VerificationConfirmed';
    }
    prevStep() {
        window.location = '/ReviewChecks';
    }
    submit(e) {
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
               
            });

          
            this.props.update(this.state.excelRows);
            this.props.getFile(e);
            this.props.getSize(number);
        };
        reader.readAsBinaryString(inputFile.files[0]);
    }


    review() {

        return (
            <Fragment>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
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
                                        <td className=""><input className="FieldValue" type="text" name="name" value={user.Name} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="surname" value={user.Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="madein" defaultValue={user.Maiden_Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" id={index+'id'} name="id" maxLength={'13'} value={user.ID_Passport} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="dob" value={user.Birthday} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" id={index+'email'} name="email" value={user.Email} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className=""><input className="FieldValue" type="text" id={index+'phone'} name="phone" maxLength={'10'} value={user.Phone} onChange={event => this.handleUserInput(index, event)}/></td>
                                        <td className="trash"><a href="#" onClick={(user) => this.removeRow(index, user)}><img src="https://img.icons8.com/ultraviolet/20/000000/delete.png" /></a></td>
                                    </tr>
                                );
                            })}
                        </tbody>    
                                    
                    </table>
                </fieldset>
            </Fragment>
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
                        /><br/>
                        <label className="candidateDetails"><strong>Drag and Drop or Click to upload File</strong></label>
                        <br />

                        <div className="upload-btn-wrapper">
                            <input
                                type="file"
                                name="file" 
                                id="getFile"
                                onChange={() => this.submit(false)}
                            />
                            <a href="https://clicknchecksite.blob.core.windows.net/excel-templates/CandidateTemplate.xlsx" download>
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
        return <div>
            {this.props.getFileState ? this.bulk() : this.review()}
        </div>;
    }
}

const mapStateToProps = state => ({
    bulkArray : state.candidateState.candidateBody,
    getFileState : state.candidateState.fileState,
    idValid : state.candidateState.idValid 
  
});

const mapActionToProps = (dispatch) => ({
    update : bindActionCreators (CandidateActions.updateArray, dispatch),
    getFile : bindActionCreators (CandidateActions.reviewBulk, dispatch),
    getSize : bindActionCreators (CandidateActions.getFileSize, dispatch),
    checkTableValid : bindActionCreators (CandidateActions.isTableValid, dispatch),
    checkID : bindActionCreators (CandidateActions.idValid, dispatch),
    checkEmail : bindActionCreators (CandidateActions.emailValid, dispatch)

});
export default connect(mapStateToProps, mapActionToProps)(MainContainer);
