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
    },
    changePasswordState:{
        password:null,
        passwordStrength:null,
        errorMessage:null
    },
    verificationChecksState: {
        jobProfileChecks: [],
        allChecks: [],
        displayChecks: true
    },
    jobProfileState: {
        jobProfiles: [],
        allChecks: [],
        selectedChecks: [],
        selectedProfile: '',
        nowDisplaying: '',
        code: ''
    },
    candidateState: {
        displayCandidate: true,
        candidateBody: [],
        fileState: true,
        fileSize : '',
        idValid : '',
        emailValid : '',
        tableValid : ''
    },
    otpState: {
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: '',
        digit5: '',
        loading: false,
        user_id: ''
    },
};

export default InitialState;