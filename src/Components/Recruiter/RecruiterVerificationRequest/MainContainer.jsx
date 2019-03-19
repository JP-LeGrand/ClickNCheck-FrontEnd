import React from 'react';
import './MainContainerStyle.scss';
import XLSX from 'xlsx';
import { RecruiterConstants } from './recruiterConstants';
import Footer from '../../Shared/Footer/Footer';
import Axios from 'axios';
import rollingImg from '../../../Assets/Rolling.svg';


class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            div: true,
            excelRows: [],
            getFile: false,
            email: '',
            id: '',
            number: '',
            tableErrors: { email: '', id: '', phone: '' },
            emailValid: false,
            idValid: false,
            numberValid: false,
            tableValid: false,
            fieldID: 'FieldValue',
            fieldEmail: 'FieldValue',
            fieldPhone: 'FieldValue',
            loading:false,
        };
        this.submit = this.submit.bind(this);
        this.addBulkCandidates = this.addBulkCandidates.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    removeRow(index, user){
        
        let arrayRows = this.state.excelRows.filter((value, i) => i !== index);
        this.setState({
            excelRows : arrayRows,
        }, () => {
            console.log(JSON.stringify(this.state.excelRows, null, 3));
        });
    }

    changeDiv(event) {
        const indi = event.target.id;
        if (indi === 'bulk') {
            this.setState({
                div: false
            });
        } else {
            this.setState({
                div: true
            });
        }

    }
    handleUserInput(index, event) {
        
        let propName = '';
        console.log(event.target.name);
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
            break;
        case 'dob':
            propName = 'Birthday';
            break;
        case 'email':
            propName = 'Email';
            break;
        default:
            propName = 'Phone';
        }
        
        const newRows = [...this.state.excelRows];
        newRows[index][propName] = event.target.value;
        this.validateField(event.target.name, event.target.value);
        console.log(newRows[index][propName])
        this.setState({ 
            excelRows : newRows
        });

        // const name = event.target.name;
        /* this.setState({ name:event.target.value }); */
    }

    // handleUserInput(event) {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     this.setState({ [name]: value }, () => {
    //         this.validateField(name, value);
    //     });
    // }
    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let idValid = this.state.idValid;
        let numberValid = this.state.numberValid;
        let tableValidationErrors = this.state.tableErrors;

        switch (fieldName) {
        case 'email' || 'Email' :
            emailValid = value.match(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            tableValidationErrors.email = emailValid ? true : false;
            break;

        case 'id':
            idValid = value.length === RecruiterConstants.idNumberLen;
            tableValidationErrors.id = idValid ? true : false;
            break;

        case 'phone':
            numberValid = value.length === RecruiterConstants.phoneNumberLen;
            tableValidationErrors.phone = numberValid ? true : false;
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

  
    nextStep(){
        window.location = '/VerificationConfirmed';
    }
    prevStep(){
        window.location = '/ReviewChecks';
    }
    validateTable() {
        this.setState({
            tableValid:
        this.state.emailValid && this.state.idValid && this.state.numberValid
        });
        if (this.state.idValid === false) {
            this.setState({
                fieldID: 'InvalidField'
            });
        } else {
            this.setState({
                fieldID: 'FieldValue'
            });
        }

        if (this.state.emailValid === false) {
            this.setState({
                fieldEmail: 'InvalidField'
            });
        } else {
            this.setState({
                fieldEmail: 'FieldValue'
            });
        }

        if (this.state.numberValid === false) {
            this.setState({
                fieldPhone: 'InvalidField'
            });
        } else {
            this.setState({
                fieldPhone: 'FieldValue'
            });
        }
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

            this.setState({
                excelRows: exceRows,
                getFile: true
            });

            // this.state.excelRows.map(name => {
            //     return (
            //         this.validateField('email', name.Email),
            //         this.validateField('id', name.IDorPassport),
            //         this.validateField('phone', name.Phone)
            //     );
            // });
        };
        reader.readAsBinaryString(inputFile.files[0]);
    }
    review() {
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
                                            </tr>
                                        </thead>
                                        <tbody className="Headers">
                                            {this.state.excelRows.map((user, index) => {
                                                return (
                                                    <tr className="Shape" key={index}>
                                                        <td className="fieldContainer"><input className="FieldValue" type="text" name="name" value={user.Name} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className="FieldValue" type="text" name="surname" value={user.Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className="FieldValue" type="text" name="madein" defaultValue={user.Maiden_Surname} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className={this.state.fieldID} type="text" name="id" value={user.ID_Passport} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className="FieldValue" type="text" name="dob" value={user.Birthday} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className={this.state.fieldEmail} type="text" name="email" value={user.Email} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td className="fieldContainer"><input className={this.state.fieldPhone} type="text" name="phone" value={user.Phone} onChange={event => this.handleUserInput(index, event)}/></td>
                                                        <td><a href="#" onClick={(user) => this.removeRow(index, user)}><img src="https://img.icons8.com/ultraviolet/20/000000/delete.png" /></a></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <validationErrors tableErrors={this.state.tableErrors} />
                 
                                    </table>
                                </fieldset>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div id="buttonFooter">
                    <button id="prev" onClick={this.prevStep}>BACK</button>
                    <button id="next" onClick={this.addBulkCandidates}>SUBMIT</button>
                    <div className="loading">{this.state.loading && <img src={rollingImg} id="spinner" alt="loading..." />}</div> 
                </div>
                <Footer />
            </div>

        );
    }
    addBulkCandidates(){
        this.setState({
            loading: true
        });
        let body = {
            candidates : this.state.excelRows,
        }
        console.log(body);
        let var_check = localStorage.getItem("ver_check");
        Axios.post('https://localhost:44347/api/candidates/CreateCandidate/' + var_check, body)
        .then(() => {
            window.location = '/VerificationConfirmed';
        });
        
    }

    bulk() {
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
                                                <a
                                                    href="https://cncdocuments.blob.core.windows.net/recruiters/CandidateTemplate.xlsx"
                                                    download
                                                >
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
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div id="buttonFooter">
                    <button id="prev" onClick={this.prevStep}>BACK</button>
                </div>
                <Footer />
            </div>

        );
    }

    render() {
        return <div>{!this.state.getFile ? this.bulk() : this.review()}</div>;
    }
}
export default MainContainer;