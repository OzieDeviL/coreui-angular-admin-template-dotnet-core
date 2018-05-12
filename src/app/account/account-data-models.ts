

export class AccountRegistration {

    constructor (
        private email: string,
        private password: string,
        private confirmPassword: string) 
    {}
}

export class LoginRequest {
    constructor (
        private email: string, 
        private password: string) 
    {}
}

export class ForgotPasswordRequest {
    constructor ( private email: string) {}
}

export class ResetPasswordRequest {
    constructor ( 
        private email: string,
        private password: string,
        private confirmPassword: string) 
    {}
}
