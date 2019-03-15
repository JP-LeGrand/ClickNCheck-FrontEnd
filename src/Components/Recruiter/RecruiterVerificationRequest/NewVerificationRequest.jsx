import React from 'react';
import './MainContainerStyle.scss';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { BASE_URL } from '../../../Shared/Constants';

class NewVerificationRequest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobProfiles: [],
            selectedProfile: ''
        };
        this.nextSteps = this.nextSteps.bind(this);
    }

    nextSteps(){
        if (this.state.selectedProfile == 'e.g Job profile here' || this.state.selectedProfile == ''){
            return;
        } else {
            this.state.jobProfiles.forEach((jp) => {
                if (jp.title == this.state.selectedProfile){
                    localStorage.setItem('jpID', jp.id);
                }
            });
            window.location = '/ReviewChecks';
        }

    }
selected = (e) =>{
    this.setState({ selectedProfile: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text });
}
render() {
    /**Run through the tasks array inside state and put each check on the left or right
     * side of the page depending on whether it came with the jobProfile or not
    */
    let titles = [], makeOptions = function(X) {
        return <option>{X}</option>;
    };
    for (let c = 0; c < this.state.jobProfiles.length; c++){
        titles.push(this.state.jobProfiles[c].title);
    }
    let optionStyles= 'border: solid 0.5px #e6e9ec';
    return (
        <div className="bodyPage">
            <NavBar />
            <div id="formContainer">
                <ul id="progress_bar">
                    <li className="active">Select verification checks</li>
                    <li>Candidate Details</li>
                    <li>Next Steps</li> 
                </ul>
                <h3>Job Profile</h3>
                <div id="dropDownDiv">
                    <select id ="profileName" onChange={(e) => this.selected(e)}>
                        <option style={{ optionStyles }} selected="selected">e.g Job profile here</option>
                        {titles.map(makeOptions)}
                    </select>
                </div>
            </div>
            <div id="buttonFooter">
                <button id="next" onClick={this.nextSteps}>NEXT</button>
            </div>
            <Footer />
        </div>
    );
}

componentDidMount(){
    let arr = [];
    fetch(BASE_URL+'JobProfiles/recruiterJobs' , {
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
    } )
        .then((response) => response.json())  
        .then(
            response => {
                response.forEach((check) =>{
                    arr.push({
                        id: check.id,
                        title: check.title
                    });
                });
                console.log(response);
                this.setState({ jobProfiles: arr });
            },
            (error) => {
                alert(error);
            });
}
}

export default NewVerificationRequest;