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
        axios.get(BASE_URL + GET_ALL_SERVICES)
            .then((response) => {
                response.data.map((index, row) => {
                    console.log('row: ' + index.title);
                    arr.push({ title: index, id: index.id });
                    return arr;
                });
                console.log('arr' + JSON.stringify(arr));
                this.setState({ allServices: arr });
                console.log('ServState:' + this.state.allServices);
            });
    }

    render() {
        let checks = [];
        for (let c = 0; c < this.state.allServices.length; c++) {
            checks.push();
        }
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