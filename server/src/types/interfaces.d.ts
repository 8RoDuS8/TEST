import { Request } from "express";

export interface ClientData {
    id?: number;
    fullname: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    address: string;
}


export interface DBClientData {
    Id: number;
    UserId: number;
    FullName: string;
    DateOfBirth: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
}


export interface UserData {
    id: number;
    username: string;
    email: string;
    last_login: string;
    authenticated: boolean;
}

export interface AuthenticatedRequest extends Request {
    user: UserData;
}