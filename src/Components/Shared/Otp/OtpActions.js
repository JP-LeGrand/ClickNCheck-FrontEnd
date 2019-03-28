import * as Types from './OtpActionTypes';
import { BASE_URL, CHECK_OTP, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import { ZERO, ONE, TWO, THREE } from '../../../Shared/IntConstants';
import { toast } from 'mdbreact';

export const handleChangeDigit1 = (digit1) => {
    return function (dispatch) {
        dispatch({
            type: Types.CHANGE_DIGIT_1,
            payload: digit1
        });
    };
};
export const handleChangeDigit2 = (digit2) => {
    return function (dispatch) {
        dispatch({
            type: Types.CHANGE_DIGIT_2,
            payload: digit2
        });
    };
};
export const handleChangeDigit3 = (digit3) => {
    return function (dispatch) {
        dispatch({
            type: Types.CHANGE_DIGIT_3,
            payload: digit3
        });
    };
};
export const handleChangeDigit4 = (digit4) => {
    return function (dispatch) {
        dispatch({
            type: Types.CHANGE_DIGIT_4,
            payload: digit4
        });
    };
};
export const handleChangeDigit5 = (digit5) => {
    return function (dispatch) {
        dispatch({
            type: Types.CHANGE_DIGIT_5,
            payload: digit5
        });
    };
};
export const submitOtp = (user_id,otp) => {
    return function (dispatch) {
        dispatch({
            type: Types.SUBMIT_OTP,
            payload: true
        });
        let user_otp = [ user_id, otp ];
        fetch(BASE_URL + CHECK_OTP, {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(user_otp)
        })
            .then(response => response.json())
            .then(
                response => {
                    dispatch({
                        type: Types.SUBMIT_OTP,
                        payload: false
                    });
                    sessionStorage.setItem('token', response[ZERO]);
                    sessionStorage.setItem('user_name', response[TWO]);
                    sessionStorage.setItem('user_img', response[THREE]);
                    let id_pass_manager = localStorage.getItem('id_pass_manager');
                    
                    if (id_pass_manager === null) {
                        if (response[ONE] === 'recruiter') {
                            localStorage.clear();
                            window.location = '/NewVerificationRequest';
                        } else if (response[ONE] === 'admin') {
                            localStorage.clear();
                            window.location = '/admin/recuiterJopProfiles';
                        }
                    } else {
                        alert('other');
                    }
                },
                error => {
                    dispatch({
                        type: Types.SUBMIT_OTP,
                        payload: false
                    });
                    toast.error('Error. Please enter the correct credentials.', {
                        autoClose: 3000
                    });
                }
            );
    };
};
export const resendOtp = (userid) => {
    return function (dispatch) {
        dispatch({
            type: Types.SUBMIT_OTP,
            payload: true
        });
        fetch(BASE_URL + OTP_AUTHENTICATION, {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(userid),
        })
            .then((otp_response) => otp_response.json())
            .then(
                () => {
                    dispatch({
                        type: Types.SUBMIT_OTP,
                        payload: false
                    });
                    toast.success('New OTP has been sent!', {
                        autoClose: 3000
                    });
                },
                (error) => {
                    dispatch({
                        type: Types.SUBMIT_OTP,
                        payload: false
                    });
                    toast.error('An error occured. Please try again later', {
                        autoClose: 3000
                    });
                }
            );
    };
};
export const assignUserId = (user_id) => {
    return function (dispatch) {
        dispatch({
            type: Types.ASSIGN_USER,
            payload: user_id
        });
    };   
};