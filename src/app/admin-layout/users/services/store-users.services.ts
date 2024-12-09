import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  _id: string;
  bio: string;
  createdAt: string;
  links: {
    website: string;
    facebook: string;
    twitter: string;
    github: string;
  };
  name: string;
  posts: string[];
  profilePics: string;
  role: string;
  title: string;
  updatedAt: string;
  user: string;
  __v: number;
}


@Injectable({
  providedIn: 'root'
})
export class StoreUsersService {

  public selectAllUsers = signal<UserProfile[]>([]);

  private dataIsLoadingAllUsers = signal<boolean>(false);

  setIsLoadingAllUsers(data: boolean) {
    this.dataIsLoadingAllUsers.set(data);
  }

  getIsLoadingAllUsers() {
    return this.dataIsLoadingAllUsers();
  }


  storedAllUsers(data: UserProfile[]) {
    this.selectAllUsers.set(data);
  }

  getUsers() {
    return this.selectAllUsers();
  }



}
