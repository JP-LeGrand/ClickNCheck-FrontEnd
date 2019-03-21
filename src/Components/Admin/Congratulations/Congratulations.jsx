import React, { Component } from 'react';
import check from '../../../Assets/green_check.svg';
import './congratulations.scss';
import AdminNavBar from '../AdminNavBar/adminNavBar';
class Congratulations extends Component {

    handleFormSubmit = () => {
       
        window.location='/Admin/AdminPage';
    }
    state = {  }
    render() { 
        return ( 
            <div>
                <AdminNavBar />
                <div className="congratulations">
                    <div className="Rectangle-Copy">
                        <div>
                            <img src={check} /><br></br>
                            <label className="Congratulation">Congratulations!</label> 
                            <br></br> 
                            <div className="You-have-successfully">
                                <p>You have successfully assigned job title
                                    <span className="text-style-1"> Call Centre Supervisor </span>to <span className="text-style-1">
                            Kyle Lourens</span> </p>
                            </div>                      
                        </div>
                        <br></br>
                        <button onClick={this.handleFormSubmit} className="Rectangle-Copy-14">Done</button>                     
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Congratulations;