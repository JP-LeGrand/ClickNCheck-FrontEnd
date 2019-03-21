import * as Types from './JobProfileTypes';
import { BASE_URL } from '../../../Shared/Constants';

export const fetchJobProfiles = () =>{
    return function(dispatch){
        let arr = [];
        let obj = {};
        fetch(BASE_URL+'JobProfiles/getAllJobProfiles' , {
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
                        obj = {
                            value: check.id,
                            label: check.title+' '+check.jobCode,
                            title: check.title,
                            jobCode: check.jobCode,
                        };
                        arr.push(obj);
                    });
                    dispatch({
                        type: Types.FETCH_JOB_PROFILES,
                        payload: arr
                    });
                },
                (error) => {
                    alert(error);
                });
    };
};

export const updateSelectedProfile = (jobProfile) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_SELECTED_PROFILE,
            payload: jobProfile
        });
    };
};

export const fetchAllChecks = () => {
    return function (dispatch){
         
        fetch(BASE_URL+'JobProfiles/getAllChecks' , {
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
                    dispatch({
                        type: Types.FETCH_ALL_CHECKS,
                        payload: response
                    });
                },
                (error) => {
                    alert(error);
                });
    };
};

export const updateDisplay = (currentDisplay) => {
    console.log('Change to: '+currentDisplay);
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_DISPLAY,
            payload: currentDisplay
        });
    };
};

export const updateChecks = (checks) => {
    console.log('Change to: '+checks);
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_SELECTED_CHECKS,
            payload: checks
        });
    };
};
