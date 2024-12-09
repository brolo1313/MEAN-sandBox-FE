export interface IPlan {
  id?: number | undefined | string | any,  // eslint-disable-line @typescript-eslint/no-explicit-any
  logoImage: string,
  title: string,
  details: string,
  coverImage: string,
  link: string,
  plan_manager?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthData {
  accessToken: string;
  email: string;
  expiresIn: number;
  id: string;
  roles: string;
  username?: string;
}

export interface AuthDataGoogle {
  email?: string;
  firstName: string;
  lastName: string;
  name: string;
  id: string;
  idToken: string;
  photoUrl: string;
  provider: string;
  expiresIn?: number;
  username?: string;
}

export interface SubMenu {
  link_name: string;
  path: string | null;
}

export interface NavigationItem {
  id: string;
  link_name: string;
  type?: 'item' | 'group';
  icon?: string;
  path?: string | null;
  sub_menu?: SubMenu[];
}

export type IAuthState = AuthData | AuthDataGoogle; 