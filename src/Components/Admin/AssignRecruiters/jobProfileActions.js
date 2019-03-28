import * as Types from './jobProfileActionTypes';
import axios from 'axios';
import { BASE_URL, GET_RECRUITERS_NAMES } from '../../../Shared/Constants';
export const getRecruitersInitiated = () => {
    return {
        type: Types.JP_LOAD_RECRUITERS_INITIATED,
        jobProfileState: {
            loading: true,
            errorMessage: null
        }
    };
};

export const getRecruitersSuccess = (recruiters) => {
    return {
        type: Types.JP_LOAD_RECRUITERS_SUCCESS,
        jobProfileState: {
            loading: false,
            recruiterList: recruiters
        }
    };
};

export const getRecruitersFailed = (err) => {
    return {
        type: Types.JP_LOAD_RECRUITERS_FAIL,
        jobProfileState: {
            loading: false,
            errorMessage: err
        }
    };
};

export const getRecruiters = (userIds) => async (dispatch) => {
    dispatch(getRecruitersInitiated());

    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const response = await axios.post(BASE_URL + GET_RECRUITERS_NAMES, userIds,config);
        dispatch(getRecruitersSuccess(response.data));
    } catch (e) {
        dispatch(getRecruitersFailed(e));
    }
};