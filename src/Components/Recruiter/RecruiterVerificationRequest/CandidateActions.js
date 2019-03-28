/* eslint-disable indent */
import * as Types from './CandidateActionTypes';
import Axios from 'axios';
import { BASE_URL, CREATE_CANDIDATE } from '../../../Shared/Constants';
import { toast } from 'mdbreact';

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
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' +sessionStorage.getItem('token')
            }
        };
       let candidateArray = {
            candidates : candidate
        };
        if (candidate.length !== 0){
           Axios.post(BASE_URL + CREATE_CANDIDATE + ver_check, candidateArray, config)
                .then((response) => {
                    window.location = '/VerificationConfirmed';
                });
        } 
        
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

export const isTableValid = (value) => {
    return function (dispatch) {
        dispatch ({
            type: Types.TABLE_VALID,
            payload: value
        });
    };
};

export const clearTable = (value) => {
    return function (dispatch) {
        dispatch ({
            type: Types.CLEAR_TABLE,
            payload: value
        });
    };
};

export const idValid = (idBool) => {
    return function (dispatch) {
        dispatch ({
            type: Types.ID_VALID,
            payload: idBool
        });
    };
};

export const emailValid = (emailBool) => {
    return function (dispatch) {
        dispatch ({
            type: Types.EMAIL_VALID,
            payload: emailBool
        });
      };
};

export const numberValid = (numberValid) => {
    return function (dispatch) {
        dispatch ({
            type: Types.NUMBER_VALID,
            payload: numberValid
        });
    };
};