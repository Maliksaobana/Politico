export const base_url = "http://localhost:3080"

export const url_endpoints = {
    user: {
        signIn: '/api/v1/auth/signin',
        signup: '/api/v1/auth/signup',
        getUser: '/api/v1/auth/profile',
        editUser: '/api/v1/auth/profile/edit',
        password: '/api/v1/auth/profile/forgetpassword'
    },
    userDashBoard: {
        getDetails: '/api/v1/user/dashboard'
    },
    party: {
        createParty: '/api/v1/party/createparty',
        getAllParty: '/api/v1/party/partylist'
    }
}