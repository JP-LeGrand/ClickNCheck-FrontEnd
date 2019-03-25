import * as Types from './jobProfileActionTypes';
import axios from 'axios';

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
        const response = await axios.post('https://localhost:44347/api/Users/GetRecruiterNames', userIds);
        dispatch(getRecruitersSuccess(response.data));
    } catch (e) {
        dispatch(getRecruitersFailed(e));
    }
};