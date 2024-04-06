import { UserRole } from "../../dto/user/user-role";

// Class containing the login response
export class LoginResponse {
    token: string;
    expiresIn: number;
    role: UserRole;

    constructor(token: string, expiresIn: number, role: UserRole) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.role = role;
    }
}