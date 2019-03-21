import * as Types from './ReviewChecksActionTypes';
import { BASE_URL } from '../../../Shared/Constants';

export const fetchChecks = () =>{
    return function(dispatch){
        let arr = [];
        fetch(BASE_URL + 'JobProfiles/jobChecks/'+localStorage.getItem('jpID') , {
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
                            category: check.category,
                            categoryID: check.checkCategoryID,
                            id: check.id
                        });
                    });
                    dispatch({
                        type: Types.FETCH_CHECKS,
                        payload: arr
                    });
                },
                (error) => {
                    alert(error);
                });
    };
}

export const toggleDisplay = (toggle) => {
    return function (dispatch){
        dispatch({
            type: Types.TOGGLE_DISPLAY,
            payload: toggle
        });
    };
};

export const fetchAllChecks = () =>{
    return function(dispatch){
        let arr = [];
        let obj = {};
        let found = false;
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
                    response.forEach((check) =>{
                        obj = {
                            id: check.id,
                            checkTypeID: check.checkTypeID,
                            value: check.checkType,
                            checked: false
                        };
                        arr.forEach((dup) => {
                            if (dup.checkTypeID == obj.checkTypeID){
                                found = true;
                            }
                        });
                        if (found !== true){
                            arr.push(obj);
                        }
                    });
                    dispatch({
                        type: Types.FETCH_ALL_CHECKS,
                        payload: arr
                    });
                },
                (error) => {
                    alert(error);
                });
    };
};

export const addProfileCheck = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.ADD_JOB_PROFILE_CHECK,
            payload: data
        });
    };
};

export const removeProfileCheck = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.REMOVE_JOB_PROFILE_CHECK,
            payload: data
        });
    };
};

export const updateAllChecks = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_ALL_CHECKS,
            payload: data
        });
    };
};