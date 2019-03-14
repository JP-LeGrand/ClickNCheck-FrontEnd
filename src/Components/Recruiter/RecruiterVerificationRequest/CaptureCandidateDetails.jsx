import React from "react";
import "./CaptureCandidateDetailStyle.scss";
import "./MainContainerStyle.scss";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MainContainer from "./MainContainer";
import Footer from "../../Shared/Footer/Footer";
import FooterPrevNext from "../../Shared/FooterPreviousNext/FooterPreviousNext";
import NavBar from "../NavBar/NavBar";
import "typeface-roboto";

class CaptureCandidateDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      div: false
    };
    this.changeDiv = this.changeDiv.bind(this);
  }

  changeDiv(event) {
    const indi = event.target.id;
    if (indi == "bulk") {
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
                  <label class="autocomplete">
                    <input id="firstName" placeholder="Full First Name" />
                  </label>
                </td>
                <td>
                  <label class="autocomplete">
                    <input id="surname" placeholder="Surname" />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="autocomplete">
                    <input
                      id="maidenName"
                      date-bind="value: maiden"
                      placeholder="Maiden Surname"
                    />
                  </label>
                </td>
              </tr>

              <div className="radios">
                <FormControl component="fieldset">
                  <FormLabel component="legend" />
                  <RadioGroup
                    roboto-label="ID or Passport"
                    name="ID or Passport"
                    className="radios"
                    color="black"
                  >
                    <FormControlLabel
                      value="ID"
                      control={<Radio />}
                      label="ID"
                    />
                    <FormControlLabel
                      value="Passport"
                      control={<Radio />}
                      label="Passport"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <tr>
                <td>
                  <label class="autocomplete">
                    <input
                      id="email"
                      data-bind="value: email"
                      placeholder="Email Address"
                    />
                  </label>
                </td>
                <td>
                  <label class="autocomplete">
                    <input
                      id="phone"
                      data-bind="value: phone"
                      placeholder="Telephone Number"
                    />
                  </label>
                </td>
              </tr>
              <tr />
              <tr>
                {/* <td>
                  <input
                    style="float: left; width: 49%; margin-right: 1px;"
                    type="submit"
                    class="btn btn-primary"
                  
                    value="add candidate"
                  />
                  <input
                    style="width: 49%; float:right; margin-left: 1px;"
                    type="submit"
                
                    data-bind="click: submit"
                    value="submit"
                  />
                </td> */}
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
                    <button className="indi" id="individual" onClick={event => this.changeDiv(event)}>INDIVIDUAL
                    </button>
                    <button className="bulk" id="bulk" onClick={event => this.changeDiv(event)}>BULK
                    </button>
                  </div>
                  <br className="Line" />

                  {!this.state.div ? this.individual() : <MainContainer />}
                </div>
              </div>
            </fieldset>
          </div>

          <div id="buttonFooter">
            <button id="prev">BACK</button>
            <button id="next">NEXT</button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default CaptureCandidateDetails;
