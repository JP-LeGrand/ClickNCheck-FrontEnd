import React from 'react';
import axios from 'axios';
import { BASE_URL, GET_ALL_SERVICES } from '../../../Shared/Constants';

class AllChecksTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allServices: []
        };
    }

    componentDidMount() {
        let arr = [];
        fetch(BASE_URL + GET_ALL_SERVICES, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client 
        })
            .then((response) => response.json())
            .then(
                response => {
                    response.forEach((check) => {
                        arr.push({
                            id: check.id,
                            value: check.title,
                            label: check.title
                        });
                    });
                    this.setState({ jobProfiles: arr });
                },
                (error) => {
                    alert(error);
                });
    }

    render() {
        let checks = [];
        for (let c = 0; c < this.state.allServices.length; c++) {
            checks.push();
        }
        //Make the checks table
        //checks is an array rows
        return (
            <div>
                <form>
                    <table id="checksTable">
                        <tbody>
                            {checks}
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
export default AllChecksTable;