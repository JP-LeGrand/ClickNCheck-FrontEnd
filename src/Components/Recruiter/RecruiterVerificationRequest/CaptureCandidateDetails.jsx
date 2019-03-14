import React from "react";
import "./CaptureCandidateDetailStyle.scss";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";

class CaptureCandidateDetails extends React.Component {
  render() {
    return (
      <div id="singleForm" className="Rectangle-Copy">
        <div className="formBox">
          <div className="candidatesColumn">
            <h1 className="candidateHeader">Candidate(s)</h1>
            <div className="wrappingDiv">
              <div className="Rectangle">
                <p className="Candidate">Candidate 1</p>
              </div>
              <p className="Add-another-candid">+ Add another candidate</p>
            </div>
          </div>
          <div className="leftformBox">
            <h1 className="personalDetailsHeader">Personal Details</h1>
            <Input
              placeholder="Full First Name"
              className="Input"
              id="firstName"
              data-bind="value: firstName"
            />
            <Input
              placeholder="Maiden Surname"
              className="Input"
              id="maidenName"
              data-bind="value: maiden"
            />
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">ID or Passport</FormLabel>
                <RadioGroup
                  roboto-label="ID or Passport"
                  name="ID or Passport"
                  className="radios"
                  color="black"
                >
                  <FormControlLabel value="ID" control={<Radio />} label="ID" />
                  <FormControlLabel
                    value="Passport"
                    control={<Radio />}
                    label="Passport"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Input
              placeholder="ID Number"
              className="Input"
              id="IDNum"
              data-bind="value: IDNum"
            />
            <Input
              placeholder="Email address"
              className="email"
              id="email"
              data-bind="value: email"
            />
          </div>
          <div className="rightformBox">
            <Input
              placeholder="Surname"
              className="surname"
              id="surname"
              data-bind="value: surname"
            />
            <Input
              placeholder="Birthday  Day  /  Month  /  Year"
              className="DoB"
              id="DoB"
              data-bind="value: DoB"
            />
            <Input
              placeholder="Telephone Number"
              className="Telephone_Number"
              id="Telephone_Number"
              data-bind="value: Telephone_Numbers"
            />
          </div>
        </div>
        <div className="buttonsLayout">
          <div className="backLayout">
            <Button variant="contained" className="back">
              Back
            </Button>
            <p className="backText">Save and continue later</p>
          </div>
          <Button variant="contained" className="submit">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
export default CaptureCandidateDetails;
