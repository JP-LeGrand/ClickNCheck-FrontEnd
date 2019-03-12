import React from "react";
import "./MainContainerStyle.scss";

class CaptureCandidateDetails extends React.Component {
  render() {
    return (
      <div id="singleForm" className="bodyPage">
        <h1 className="Personal-Details">Personal Details</h1>
        <table class="rightTable">
          <thead />
          <tbody>
            <tr>
              <td>
                <label class="autocomplete">
                  <input
                    id="firstName"
                    data-bind="value: firstName"
                    placeholder="Full First Name"
                    className="Input-Text"
                  />
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
                    className="Input-Text"
                  />
                </label>
              </td>
            </tr>
            <tr inline>
              <td id="radioButtons">
                <label for="radio-1" className="radio-label">
                  <input
                    id="radio-1"
                    name="radio"
                    type="radio"
                    value="ID"
                    checked
                  />
                  ID
                </label>
                <label for="radio-2" class="radio-label">
                  <input
                    id="radio-2"
                    name="radio"
                    type="radio"
                    value="Passport"
                    checked
                  />
                  Passport
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label class="autocomplete">
                  <input
                    id="idnumber"
                    data-bind="value: idnumber"
                    placeholder="ID Number"
                    className="Input-Text"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label class="autocomplete">
                  <input
                    id="email"
                    data-bind="value: email"
                    placeholder="Email Address"
                  />
                </label>
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
              <td>
                <input
                  className="Rectangle-Copy-14"
                  type="submit"
                  class="btn btn-primary"
                  data-bind="click: add"
                  value="add candidate"
                />
                <input
                  className="Rectangle-Copy-14"
                  type="submit"
                  class="btn btn-primary"
                  data-bind="click: submit"
                  value="submit"
                />
              </td>
            </tr>{" "}
          </tbody>
        </table>
      </div>
    );
  }
}
export default CaptureCandidateDetails;
