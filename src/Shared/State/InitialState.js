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
        password: '',
        confirmpassword:'',
        errorMessage: '',
        passwordsValid: false,
        passwordsMatch: false,
        loading:false
    },
    verificationChecksState: {
        jobProfileChecks: [],
        allChecks: [],
        displayChecks: true,
        reorderChecks: false
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
        idValid : true,
        emailValid : true,
        tableValid : true,
        numberValid: true
    },
    otpState: {
        digit1: undefined,
        digit2: undefined,
        digit3: undefined,
        digit4: undefined,
        digit5: undefined,
        loading: false,
        clicked: false,
        user_id: '',
        error:''
    },
};

export default InitialState;