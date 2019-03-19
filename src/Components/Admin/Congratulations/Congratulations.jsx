import React, { Component } from 'react';
import check from '../../../Assets/green_check.svg';
import './congratulations.scss';
class Congratulations extends Component {

    handleFormSubmit = () => {
       
        window.location='/Admin/AdminPage';
    }
    state = {  }
    render() { 
        return ( 
            <div className="congratulations">
                <div className="Rectangle-Copy">
                    <div>
                        <img src={check} /><br></br>
                        <label className="Congratulations">Congratulations!</label>
                        <br/>
                        <label className="Call-Centre-Supervis" >Call Centre Supervisor</label >
                        <p className="You-have-successfully">You have successfully assigned job title
                            <span className="text-style-1">Call Centre Supervisor </span>to <span className="text-style-1">
                            Kyle Lourens</span> </p>
                    </div>
                    <button onClick={this.handleFormSubmit} className="Rectangle-Copy-14">Done</button>                     
                </div>
            </div>
        );
    }
}
 
export default Congratulations;