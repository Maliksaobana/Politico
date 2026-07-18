// export const base_url = "https://politico-dmqc.onrender.com"

export const base_url = "http://localhost:3080"

export const url_endpoints = {
    user: {
        signIn: '/api/v1/auth/signin',
        signup: '/api/v1/auth/signup',
        getUser: '/api/v1/auth/profile',
        editUser: '/api/v1/auth/profile/edit',
        password: '/api/v1/auth/profile/forgetpassword'
    },
    party: {
        createParty: '/api/v1/party/createparty',
        getAllParty: '/api/v1/party/partylist',
        joinParty: '/api/v1/party/partylist/join/',
        editParty: '/api/v1/party/editparty/',
        deleteParty: '/api/v1/party/deleteparty/',
        getSpecificParty: '/api/v1/party/partylist/'
    },
    office: {
        getAllOffice: "/api/v1/office/officelist",
        createOffice: "/api/v1/office/createoffice",
        deleteOffice: "/api/v1/office/officelist/",
        editOffice: "/api/v1/office/officelist/edit/",
        getSpecificOffice: "/api/v1/office/officelist/"
    },
    register: {
        getAllRegistered: "/api/v1/office/register/",
        acceptCandidate: "/api/v1/office/register/", // registered candidate id param
        runForOffice: "/api/v1/office/register/" // id param
    },
    vote: {
        getAllCand: "/api/v1/vote",
        getCand: "/api/v1/vote/contestant/",
        castPersonalVote: "/api/v1/vote/" // add id param
    },
    petition: {
        makePetition: "/api/v1/petition/makepetition/", // post
        getAllPetition: "/api/v1/petition/",
        getPetition: "/api/v1/petition/petitiondetails/",
        analysePetition: "/api/v1/petition/" // patch
    },
    winner: {
        declareWinner : "/api/v1/winner/", // post
        getAllWinners: "/api/v1/winner"
    }
}