export interface IUser {
    username: string,
    displayName: string,
    token: string
}

export interface IRegisterActualForm {
    email: string,
    password: string,
    confirmPassword: string,
    userName: string,
    displayName: string,
    bio: string

}

export interface IRegisterForm {
    email: string,
    password: string,
    confirmPassword: string,
    displayName: string,
}


export interface ILoginForm {
    email: string,
    password: string
}

export interface IForgotPasswordForm {
    email: string,
}


export interface IUpdatePasswordForm {
    email: string,
    token: string,
    password: string
    confirmPassword: string
}

export interface IToken {
    unique_name: string,
    nameid: string,
    email: string,
    role: string
}

export interface IUserDetail {
    email: string,
    displayName: string,
    username: string,
    imageUrl: string,
    memberRole: string,
    bio: string,
    dateJoined: string,
    lastLogin: string,
    reputationScore: number
}

export interface IUserRole {
    email: string,
    memberRole: string
}