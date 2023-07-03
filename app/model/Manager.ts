import {AppMetadata, ManagementClient, ObjectWithId, Permission, User, UserMetadata} from "auth0";

require("dotenv").config();

const managementClient = new ManagementClient({
    domain: `${process.env.ACCOUNT_DOMAIN}.auth0.com`,
    clientId: process.env.APPLICATION_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: "read:users read:roles read:logs",
    audience: `https://${process.env.ACCOUNT_DOMAIN}.auth0.com/api/v2/`,
    tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: 10
    }
});

export class Manager {
    private static managementClient: ManagementClient = managementClient;

    public static getAdmins(): Promise<User<AppMetadata, UserMetadata>[]> {
        return Manager.managementClient.getUsersInRole({id: "rol_Dv3jHudZTKSNnkAS"});
    }

    public static getUsers(): Promise<User<AppMetadata, UserMetadata>[]> {
        return Manager.managementClient.getUsers();
    }

    public static async getUserRoles(user: Record<string, any>): Promise<Permission[]> {
        return Manager.managementClient.getUserRoles(<ObjectWithId>{
            id: user.user_id
        });
    }

    public static async getUserScopes(user: Record<string, any>): Promise<Permission[]> {
        return Manager.managementClient.getUserPermissions(<ObjectWithId>{
            id: user.user_id
        });
    }

    public static async checkUserScopes(user: Record<string, any>, scopes: string[]): Promise<boolean> {
        const roles = await Manager.managementClient.getUserPermissions(<ObjectWithId>{
            id: user.sub
        });
        const rolesNames = roles.map((value: Permission, index: number, array: Permission[]) => value.permission_name);
        return scopes.every((value: string, index: number, array: string[]) => rolesNames.includes(value));
    }
}
