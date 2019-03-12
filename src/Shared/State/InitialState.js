const InitialState = {
    homeState: {
        message: 'This is just a boilerplate'
    },
    consentState: {
        name: 'Candidate Name Here',
        organisation: 'Organisation Name here',
        checks: [ 'check-1', 'check-2', 'check-3', 'check-4', 'check-5' ]
    },
    loginState: {
        canLogin: null,
        email: null,
        password: null,
    },
    forgotPasswordState:{
        sending: null,
        sendEmail:null,
        sendPassword:null,
        idType: '',/*id or passport */
        sendVia:'',/*actual  */
        passportNumber: null,
        phoneEmail: null
    }
};

export default InitialState;