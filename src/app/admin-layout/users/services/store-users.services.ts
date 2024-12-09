import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreUsersService {

  public selectAllUsers = signal<any>([]);

  private dataIsLoadingAllUsers = signal<boolean>(false);

  setIsLoadingAllUsers(data: boolean) {
    this.dataIsLoadingAllUsers.set(data);
  }

  getIsLoadingAllUsers() {
    return this.dataIsLoadingAllUsers();
  }


  storedAllUsers(data: any) {
    this.selectAllUsers.set(data);
  }

  getUsers() {
    return this.selectAllUsers();
  }



}
