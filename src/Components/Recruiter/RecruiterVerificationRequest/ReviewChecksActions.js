import * as Types from './ReviewChecksActionTypes';
import { BASE_URL } from '../../../Shared/Constants';

export function fetchChecks(){
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
                            location: 'onRight',
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

export function toggleDisplay(toggle){
    return function (dispatch){
        dispatch({
            type: Types.TOGGLE_DISPLAY,
            payload: toggle
        });
    };
}