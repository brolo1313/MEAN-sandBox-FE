export interface IPlan {
    id?: string | number,
    logoImage: string,
    title: string,
    details: string,
    coverImage: string,
    link: string,
}

export interface AuthData {
    accessToken: string;
    email: string;
    expiresIn: number;
    id: string;
    roles: string;
    username: string;
  }
  
  export interface AuthDataGoogle {
    email: string;
    firstName: string;
    lastName: string;   
    name: string;         
    id: string;         
    idToken: string;      
    photoUrl: string;   
    provider: string;   
    expiresIn?: number;  
  }

  export type IAuthState = AuthData | AuthDataGoogle; 