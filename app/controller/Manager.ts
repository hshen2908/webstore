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

export class InsufficientScopeError extends Error {
    private scopes;

    public constructor(scopes) {
        super();
        this.scopes = scopes;
    }
}

export class Manager {
    private static managementClient: ManagementClient = managementClient;
    private static adminRoles: Record<string, string>[] = [{name: "Admin", id: "rol_Dv3jHudZTKSNnkAS"}];

    public static async getAdmins(): Promise<User<AppMetadata, UserMetadata>[]> {
        const admins: User<AppMetadata, UserMetadata>[] = [];
        const adminIterator = await Manager.getAdminsIterator();
        let admin;
        while (admin = adminIterator.next().value) {
            admins.push(admin);
        }
        return admins;
    }

    private static async getAdminsIterator(): Promise<IterableIterator<User<AppMetadata, UserMetadata>>> {
        const admins: Map<string, User<AppMetadata, UserMetadata>> = new Map<string, User<AppMetadata, UserMetadata>>();
        for (const role of Manager.adminRoles) {
            const rolePermissions = await Manager.managementClient.getPermissionsInRole({id: role.id});
            const adminsWithRole = await Manager.managementClient.getUsersInRole({id: role.id});
            adminsWithRole.forEach((adminWithRole) => {
                if (adminWithRole.user_id && admins.has(adminWithRole.user_id)) {
                    const adminToUpdate = admins.get(adminWithRole.user_id);
                    adminToUpdate["adminRoles"].push(role);
                    rolePermissions.forEach(scope => adminToUpdate["adminScopes"].add(scope));
                    admins.set(adminWithRole.user_id, adminToUpdate);
                } else {
                    adminWithRole["adminRoles"] = [role];
                    adminWithRole["adminScopes"] = new Set();
                    rolePermissions.forEach(scope => adminWithRole["adminScopes"].add(scope));
                    if (adminWithRole.user_id != null) {
                        admins.set(adminWithRole.user_id, adminWithRole);
                    }
                }
            });
        }
        return admins.values();
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
