import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { LocalStorageService } from '../../auth/services/local-storage.services';
import { environment } from '../../../../environments/environment';
import { ToastService } from 'src/app/shared/services/toasts.service';
import { StoreUsersService, UserProfile } from './store-users.services';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreUsersService);

  constructor(
    private http: HttpClient,
  ) { }



  public getProfiles() {
    this.store.setIsLoadingAllUsers(true);
    return this.http.get<UserProfile[]>(`${environment.apiUrl}/all-profiles`).subscribe(
      (response: UserProfile[]) => {
        this.store.storedAllUsers(response)
        this.store.setIsLoadingAllUsers(false);
      },
      () => {
        this.store.setIsLoadingAllUsers(false);
      }
    )
  }
  
}
