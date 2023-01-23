export interface UserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    typeUser: number;
    exp: number;
    email: string;
    status: boolean;
    createDate: Date;
}

export interface AuthResponse {
    token: string;
}