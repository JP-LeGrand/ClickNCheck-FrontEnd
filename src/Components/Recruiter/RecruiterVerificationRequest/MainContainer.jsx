/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import XLSX from 'xlsx';

class MainContainer extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            excelRows: [],
            getFile : false,
            email : '',
            id : '',
            number: '',
            tableErrors: { email:'', id:'' },
            emailValid: false,
            idValid: false,
            numberValid: false,
            tableValid: false

        };
       this.submit = this.submit.bind(this);
       this.bulk = this.bulk.bind(this);
       this.handleUserInput = this.handleUserInput.bind(this);
       this.handleFormValidation = this.handleFormValidation.bind(this);
    }


    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { 
                this.validateField(name, value);
            });
      }
     handleFormValidation(){
        console.log(this.state.tableValid);

      }
      validateField(fieldName, value){
            let emailValid = this.state.emailValid;
            let idValid = this.state.idValid;
            let numberValidator = this.state.numberValid;
            let tableValidationErrors = this.state.tableErrors;

            switch ( fieldName ){
                case 'email' : 
                emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                tableValidationErrors.email = emailValid ? true : false;
                console.log('validationg email');
                break;   

                case 'id' : 
                idValid = value.length === 13;
                tableValidationErrors.id = idValid ? true : false;
                break;   

                case 'phone' :
                numberValidator = 'not entered';
                break; 
                   
                default: 
                break;
            }

            this.setState({
                 tableErrors: tableValidationErrors,
                emailValid: emailValid,
                 idValid: idValid  
            }, this.validateTable);

      }

      validateTable() {
        this.setState({
            tableValid: this.state.emailValid && this.state.idValid
        });
      }

    submit(){
        let inputFile = document.getElementById('getFile');  
        let reader = new FileReader();

        reader.onload = (e) => {
            let workbook = XLSX.read(e.target.result, {
                type: 'binary'
            });
           
            let firstSheet = workbook.SheetNames[0];
            let exceRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
         
            this.setState({
                excelRows: exceRows,
                getFile: true
              });
            
        };
     reader.readAsBinaryString(inputFile.files[0]);
        
    }

    bulk(){
        return(
                        <fieldset className="field1 current">
                        <h3>Capture Candidate Details</h3>
                        <div id="uploadSwitch"> 
                            <button className="btn btn-primary active" id="individual">INDIVIDUALLY</button>
                            <button className="btn btn-default" id="bulk">BULK</button>
                        </div>
    
                        <div id="bulkForm">
                            <div className="upload-area" id="uploadfile">
                                <img src={require('../../../Assets/upload-file.svg')} alt="upload files here" />
                                <h3>Drag and Drop files to upload</h3><br/>
                                <p>Upload only excel documents </p>
                                <div className="upload-btn-wrapper">
                                    <button className="btn btn-primary" id="selectFiles">Select Files</button>
                                    <input type="file" name="file" id="getFile" onChange={() => this.submit() } />
                                    {/* <button id="check" onClick = {this.submit}> </button> */}
                                   
                               </div>
                                <a><img src={require('../../../Assets/downloadFile.svg')} alt="download-fav" />Download Excel Template</a>
                                </div>
                                </div>
                             </fieldset>
        );

    } 
   
    review(){

        
        return(
            <fieldset className="field1 current">
            <table className = "table">
                              <thead>
                                  <tr>
                                     <th>First Full Name</th>
                                      <th>Surname</th>
                                      <th>Maiden Name</th>
                                      <th scope="col">ID/Passport</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Phone</th>
                                  </tr>
                              </thead>
                              <tbody id ="testing">
                              {this.state.excelRows.map((name) => {
                                  return (
                                      // eslint-disable-next-line react/jsx-key
                                      <tr>
                                      <td><input type="text" name="name" defaultValue = {name.FirstName} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="text" name="surname" defaultValue = {name.Surname} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="text" name="madein" defaultValue = {name.MaidenSurname} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="text" name="id" defaultValue = {name.IDorPassport} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="text" name="dob" defaultValue = {name.Birthday} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="email" name="email" defaultValue = {name.Email} onChange={(event) => this.handleUserInput(event)}/></td>
                                      <td><input type="text" name="phone" defaultValue = {name.Phone} onChange={(event) => this.handleUserInput(event)}/></td>
                                  </tr>
                                  );
                              })}
                                  
                              </tbody>
                              <validationErrors tableErrors={this.state.tableErrors} />
                              <button type="submit" className="btn btn-primary" onClick={this.handleFormValidation}>Sign up</button>
                          </table> 
          
                            </fieldset>  
                           
        );
    
    }
    render() {

        const fileState = this.state.getFile;
        console.log(fileState);
        let button;
        
       return (
            <div className="bodyPage">
                <div id="formContainer">
                    <ul id="progress_bar">
                        <li className="active">Create Job Profile Name</li>
                        <li>Candidate Details</li>
                        <li></li> 
                    </ul>
                    {!this.state.getFile ? this.bulk() : this.review()}
                 
                </div>
         <div>
           
           </div>

             <div id="buttonFooter">
                    <button id = "prev">BACK</button>
                    <button id = "next" onClick={()=>this.next()}>NEXT</button>
                </div>
            </div>
        );
    }
}
export default MainContainer;