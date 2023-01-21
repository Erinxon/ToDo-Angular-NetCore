export interface AuthModel {
    email: string;
    password: string;
}

export enum TypeUser {
    Registered = 1,
    Guest
}

export interface RegisterModel {
    firstName: string;
    lastName: string;
    typeUser: TypeUser;
    email: string;
    password: string;
}