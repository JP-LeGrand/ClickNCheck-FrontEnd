import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import ReactAI from 'react-appinsights';

class ReactSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.onSelectProfile({ selectedProfile: e.value });
    }
    render() {

        return <div id="selectElement">
            <Select
                options={this.props.jobProfiles}
                styles={this.props.customStyle}
                defaultValue={{ value: this.props.defaultProf, label: this.props.defaultProf }}
                onChange={this.handleChange}
            />
        </div>;
    }
}

export default ReactAI.withTracking(connect()(ReactSelect));