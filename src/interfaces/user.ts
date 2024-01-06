export interface IUser {
    id?: string;
    name: string;
    email: string;
    icon?: string;
    password?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}