export interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
}

export interface AuthSession {
    token: string;
    expiresAt?: string;
    user?: User;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    accessToken?: string;
    user?: User;
    expiresAt?: string;
    data?: {
        token?: string;
        accessToken?: string;
        user?: User;
        expiresAt?: string;
    };
} 