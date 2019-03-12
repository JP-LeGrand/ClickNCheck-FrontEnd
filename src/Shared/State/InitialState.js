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
        sendType:{
            username: null,
            password: null
        },
        idType: {
            id: null,
            passport: null
        },
        sendVia:{
            sms: null,
            email: null
        },
        cellPhone: null,
        email: null
    },
    changePasswordState:{
        password:null,
        passwordStrength:null
    }
};

export default InitialState;