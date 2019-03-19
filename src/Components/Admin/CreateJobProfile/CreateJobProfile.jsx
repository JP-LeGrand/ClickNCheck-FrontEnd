import React from 'react';
import 'typeface-roboto';

class CreateJobProfile extends React.PureComponent {
    render() {
        return (
            <div className="CreateJobProfile">
                <li>Name of the table</li>
                <table>
                    <ul>
                        <li>row 1 col 1</li>
                        <li>row 2 col 1</li>
                    </ul>
                    <ul>
                        <li>row 2 col 1</li>
                        <li>row 2 col 2</li>
                    </ul>
                </table>

            </div>
        );
    }
}
export default CreateJobProfile; 