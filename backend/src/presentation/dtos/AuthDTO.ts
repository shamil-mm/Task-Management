export interface RegisterUserDTO{
    name:string;
    email:string;
    password:string;
}
export interface LoginUserDTO{

    email:string;
    password:string;
}

export interface RegisterUserResponseDTO{
    name:string;
    email:string;
    message:string
}
export interface LoginUserResponseDTO{
    email:string;
    _id:string;
    accessToken:string;
    message:string;
}
export interface RefreshTokenDTO {
  refreshToken: string;
}