import * as Types from './CandidateActionTypes';
import Axios from 'axios';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';

export const changeView = (view) => {
    return function (dispatch) {
        dispatch({
            type: Types.SWITCH_VIEW,
            payload: view            
        });
    };
};

export const updateArray = (body) => {
    return function (dispatch) {
        dispatch({
            type: Types.SUBMIT_CANDIDATE,
            payload: body
        });
    };
};

export const submitCandidate = (ver_check, candidate) => {
    return function () {
        Axios.post(BASE_URL + CREATE_CANDIDATE + ver_check, candidate)
        .then((response) => {
            window.location = '/VerificationConfirmed';
        })
     
    };
};

export const reviewBulk = (file) => {
    return function (dispatch) {
        dispatch ({
            type: Types.UPLOAD_FILE,
            payoload: file
        }); 
    };
};

export const getFileSize = (size) => {
    return function (dispatch) {
        dispatch ({
            type: Types.FILE_SIZE,
            payload: size
        });
    };
};

export const isTableValid = (idValid, emailValid) => {
    return function (dispatch) {
        dispatch ({
            type: Types.TABLE_VALID,
            payload: idValid && emailValid  
        });
    };
};