/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../Shared/Constants';

class ProfileChecks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checks: []
        };
    }

    render() {
        const listItems = this.state.checks.map((item) =>
            <li id="jobProfileChecks" style={{ listStyleImage: require('../../../Assets/'+item.category.toString().toLowerCase()+'.svg') }}>{ item.category}</li>
        );

        return (
            <div>
                <p className="Verification-checks">Verification checks required for {localStorage.getItem('jp')}</p>
                <ul>
                    { listItems }
                </ul>
                <a id="addRemoveChecks" onClick={this.props.addRemove}>+ Add or - Remove verification checks </a>
                <a id="reorderChecks" onClick={this.props.addRemove}> Re-order sequence of checks  </a>
            </div>
        );
    }

    componentDidMount(){
        let arr = [];
        if (this.state.checks.length == 0){
            fetch(BASE_URL+'JobProfiles/jobChecks/'+localStorage.getItem('jpID'), {
                method: 'GET',
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ sessionStorage.getItem('token')
                },
                redirect: 'manual', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client 
            })
                .then((response) => response.json())  
                .then(
                    response => {
                        response.forEach((check) =>{
                            arr.push({
                                vendors: [ check.name ],
                                category: check.category,
                                categoryID: check.checkCategoryID,
                                location: 'onLeft',
                                id: check.id,
                                bgColor: '#0091d1',
                                cssID: 'vendor2',
                                color: 'white'
                            });
                        });
                        this.setState({ checks: arr });
                    },
                    (error) => {
                        alert(error);
                    });
        }
    }
}

export default connect() (ProfileChecks);