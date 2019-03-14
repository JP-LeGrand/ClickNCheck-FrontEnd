import React from "react";
import "./CandidateColumnStyle.scss";

class CandidateColumn extends React.Component {
  render() {
    return (
      <div className="main">
        <h1 className="candidateHeader">Candidate(s)</h1>
        <div className="wrappingDiv">
          <div className="Rectangle">
            <p className="Candidate">Candidate 1</p>
          </div>
          <p className="Add-another-candid">+ Add another candidate</p>
        </div>
      </div>
    );
  }
}
export default CandidateColumn;
