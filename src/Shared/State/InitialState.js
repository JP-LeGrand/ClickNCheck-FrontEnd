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
    }
};

export default InitialState;