import React, { Fragment } from 'react';
import './MainContainerStyle.scss';
import XLSX from 'xlsx';
import { RecruiterConstants } from './recruiterConstants';
import * as CandidateActions from './CandidateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactAI from 'react-appinsights';
import { ToastContainer } from 'mdbreact';
import PropTypes from 'prop-types';

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
            idValid: '',
            numberValid: '',
            loading: false,
        };
        this.validateRow = this.validateRow.bind(this);
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

    validateRow(row) {
        const validateId = (id) => {
            return id && id.length === RecruiterConstants.idNumberLen;
        };

        const validateCellNo = (cellNo) => {
            return cellNo && cellNo.length === RecruiterConstants.phoneNumberLen;
        };

        const validateEmail = (email) => {
            const tester = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return email && tester.test(email);
        };

        return {
            emailValid: validateEmail(row['Email']),
            idValid: validateId(row['ID_Passport']),
            cellNoValid: validateCellNo(row['Phone'])
        };
    }
    handleUserInput(index, event, propName) {
        //debugger;
        const newRows = [ ...this.props.candidateArray ];
        newRows[index] = {
            ...newRows[index],
            [propName]: event.target.value
        };

        const rowValidations = this.validateRow(newRows[index]);
        newRows[index] = {
            ...newRows[index],
            ...rowValidations
        };

        const isTableValid = newRows.every(row => row.emailValid && row.cellNoValid && row.idValid);
        console.log(isTableValid)
        this.props.update(newRows); 
        this.props.checkTableValid(isTableValid);
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
            ).map(row => {
             
                const rowValidations = this.validateRow(row);
                return {
                    ...row,
                    ...rowValidations
                };
            });

            let number = exceRows.length;
            const isTableValid = exceRows.every(row => row.emailValid && row.cellNoValid && row.idValid);
            this.props.update(exceRows);
            this.props.checkTableValid(isTableValid);
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
                        
                            {this.props.candidateArray.map((user, index) => {
                                console.log(this.props.candidateArray)
                                return (
                                    <tr className="Shape" key={index}>
                                        <td className=""><input className="FieldValue" type="text" name="name" value={user.Name} onChange={event => this.handleUserInput(index, event, 'Name')}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="name" value={user.Surname} onChange={event => this.handleUserInput(index, event, 'Surname')}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="madein" value={user.Maiden_Surname} onChange={event => this.handleUserInput(index, event, 'Maiden_Surname')}/></td>
                                        <td className=""><input className={`${user.idValid ? 'FieldValue' : 'InvalidField'}`} type="text" id={index+'id'} name="id" maxLength={'13'} value={user.ID_Passport} onChange={event => this.handleUserInput(index, event, 'ID_Passport')}/></td>
                                        <td className=""><input className="FieldValue" type="text" name="dob" value={user.Birthday} onChange={event => this.handleUserInput(index, event, 'Birthday')}/></td>
                                        <td className=""><input className={`${user.emailValid ? 'FieldValue' : 'InvalidField'}`} type="text" id={index+'email'} name="email" value={user.Email} onChange={event => this.handleUserInput(index, event, 'Email')}/></td>
                                        <td className=""><input className={`${user.cellNoValid ? 'FieldValue' : 'InvalidField'}`} type="text" id={index+'phone'} name="phone" maxLength={'10'} value={user.Phone} onChange={event => this.handleUserInput(index, event, 'Phone')}/></td>
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
MainContainer.propTypes = {
   
    emailValid :  PropTypes.bool,
    numberValid :  PropTypes.bool,
    idValid  : PropTypes.bool,
    getFileState : PropTypes.func,
    checkTableValid : PropTypes.func,
    getSize : PropTypes.func,
    getFile : PropTypes.func,
    update : PropTypes.func,
    candidateArray : PropTypes.array

};

const mapStateToProps = state => ({
    bulkArray : state.candidateState.candidateBody,
    getFileState : state.candidateState.fileState,
    idValid : state.candidateState.idValid,
    numberValid : state.candidateState.numberValid,
    emailValid : state.candidateState.emailValid,
    candidateArray : state.candidateState.candidateBody
  
});

const mapActionToProps = (dispatch) => ({
    update : bindActionCreators (CandidateActions.updateArray, dispatch),
    getFile : bindActionCreators (CandidateActions.reviewBulk, dispatch),
    getSize : bindActionCreators (CandidateActions.getFileSize, dispatch),
    checkTableValid : bindActionCreators (CandidateActions.isTableValid, dispatch)

});
export default ReactAI.withTracking(connect(mapStateToProps, mapActionToProps)(MainContainer));
