export interface User {
    sub: string;
    username: string;
    email: string;
    githubAccessToken: string;
    iat: number;
    exp: number;
}