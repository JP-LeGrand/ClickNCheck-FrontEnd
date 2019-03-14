import React from "react";
import "./MainContainerStyle.scss";
import XLSX from "xlsx";
import { RecruiterConstants } from "./recruiterConstants";

class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            excelRows: [],
            getFile: false,
            email: "",
            id: "",
            number: "",
            tableErrors: { email: "", id: "", phone: "" },
            emailValid: false,
            idValid: false,
            numberValid: false,
            tableValid: false,
            fieldID: "FieldValue",
            fieldEmail: "FieldValue",
            fieldPhone: "FieldValue"
        };
        this.submit = this.submit.bind(this);
        this.bulk = this.bulk.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let idValid = this.state.idValid;
        let numberValidator = this.state.numberValid;
        let tableValidationErrors = this.state.tableErrors;

        switch (fieldName) {
        case "email":
            emailValid = value.match(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            tableValidationErrors.email = emailValid ? true : false;
            break;

        case "id":
            idValid = value.length === RecruiterConstants.idNumberLen;
            tableValidationErrors.id = idValid ? true : false;
            break;

        case "phone":
            numberValidator = value.length === RecruiterConstants.phoneNumberLen;
            tableValidationErrors.phone = numberValidator ? true : false;
            break;

        default:
            break;
        }
        this.setState(
            {
                tableErrors: tableValidationErrors,
                emailValid: emailValid,
                numberValid: numberValidator,
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
                fieldID: "InvalidField"
            });
        } else {
            this.setState({
                fieldID: "FieldValue"
            });
        }

        if (this.state.emailValid === false) {
            this.setState({
                fieldEmail: "InvalidField"
            });
        } else {
            this.setState({
                fieldEmail: "FieldValue"
            });
        }

        if (this.state.numberValid === false) {
            this.setState({
                fieldPhone: "InvalidField"
            });
        } else {
            this.setState({
                fieldPhone: "FieldValue"
            });
        }
    }

    submit() {
        let inputFile = document.getElementById("getFile");
        let reader = new FileReader();

        reader.onload = e => {
            let workbook = XLSX.read(e.target.result, {
                type: "binary"
            });

            let firstSheet = workbook.SheetNames[0];
            let exceRows = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[firstSheet]
            );

            this.setState({
                excelRows: exceRows,
                getFile: true
            });

            this.state.excelRows.map(name => {
                return (
                    this.validateField("email", name.Email),
                    this.validateField("id", name.IDorPassport),
                    this.validateField("phone", name.Phone)
                );
            });
        };
        reader.readAsBinaryString(inputFile.files[0]);
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
                        </tr>
                    </thead>
                    <tbody className="Headers">
                        {this.state.excelRows.map((name, key) => {
                            return (
                                <tr className="Shape" key={key.IDs}>
                                    <td className="fieldContainer">
                                        <input
                                            className="FieldValue"
                                            type="text"
                                            name="name"
                                            defaultValue={name.FirstName}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className="FieldValue"
                                            type="text"
                                            name="surname"
                                            defaultValue={name.Surname}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className="FieldValue"
                                            type="text"
                                            name="madein"
                                            defaultValue={name.MaidenSurname}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className={this.state.fieldID}
                                            type="text"
                                            name="id"
                                            defaultValue={name.IDorPassport}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className="FieldValue"
                                            type="text"
                                            name="dob"
                                            defaultValue={name.Birthday}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className={this.state.fieldEmail}
                                            type="text"
                                            name="email"
                                            defaultValue={name.Email}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                    <td className="fieldContainer">
                                        <input
                                            className={this.state.fieldPhone}
                                            type="text"
                                            name="phone"
                                            defaultValue={name.Phone}
                                            onChange={event => this.handleUserInput(event)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <validationErrors tableErrors={this.state.tableErrors} />
                    {/* <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.state.tableValid}
          >
            submit table
          </button> */}
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
                            src={require("../../../Assets/upload-file.svg")}
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
                                    src={require("../../../Assets/downloadFile.svg")}
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
        return <div>{!this.state.getFile ? this.bulk() : this.review()}</div>;
    }
}
export default MainContainer;
