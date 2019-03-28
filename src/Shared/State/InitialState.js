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
        password: '',
        email: '',
        loginStatus: '',
        fetchStatus: '',
        isPasswordVisible: false,
        inputType: 'password',
        isLoading: false,
        error: ''
    },
    forgotPasswordState:{
        loading: false,
        validMessenger: false,
        validIdentification: false,
        emailOrSMS: false,
        passportOrID: false,
        sendPassword: false,
        identitySelected: false,
        messengerSelected: false,
        identification: '',
        messenger: '',
        messageSent: false,
        error: ''
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
        tableValid : false
    },

};

export default InitialState;