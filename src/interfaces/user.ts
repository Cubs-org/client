export interface IUser {
    id?: string;
    name: string;
    email: string;
    icon?: string;
    password?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IUserAccount extends IAccount, IUser {}

export interface IUserGoogle {
    email: string;
    name: string;
    picture: string;
}

export interface IGoogleUserResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
};

export interface IUserContext {
    user: IUserAccount;
    setUser: (
        newValues: {
            id?: string,
            name?: string,
            email?: string,
            icon?: string,
            createdAt?: Date | string,
            updatedAt?: Date | string,
            accountType?: string,
            status?: string,
            planType?: string,
            paymentType?: string,
        }
    ) => void;
}