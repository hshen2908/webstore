require("dotenv").config();
const axios = require("axios").default;
import {AppMetadata, ManagementClient, User, UserMetadata} from "auth0";

// const getManagementAPIAccessTokenOptions = {
//     method: 'POST',
//     url: `${process.env.APPLICATION_ISSUER_BASE_URL}/oauth/token`,
//     headers: {'content-type': 'application/x-www-form-urlencoded'},
//     data: new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: process.env.APPLICATION_CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         audience: `${process.env.APPLICATION_ISSUER_BASE_URL}/api/v2/`
//     })
// };
//
// axios.request(getManagementAPIAccessTokenOptions).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

const managementClient = new ManagementClient({
    domain: `${process.env.ACCOUNT_DOMAIN}.auth0.com`,
    clientId: process.env.APPLICATION_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: "read:users read:logs",
    audience: `https://${process.env.ACCOUNT_DOMAIN}.auth0.com/api/v2/`,
    tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: 10
    }
});

export class Manager {
    private static managementClient: ManagementClient = managementClient;

    public static getUsers(): Promise<User<AppMetadata, UserMetadata>[]> {
        return Manager.managementClient.getUsers();
    }
}
