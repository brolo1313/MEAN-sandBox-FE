import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
import { ToastService } from "src/app/shared/services/toasts.service";
import { StoreMarketsService } from "../../dashboard/services/stored-markets-list.services";

export interface USER_CREDENTIALS {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user: any;

  http = inject(HttpClient);
  router = inject(Router);
  toastService = inject(ToastService);
  store = inject(StoreMarketsService);

  public changeProfilePassword(data: any) {
    return this.http.put(`${environment.apiUrl}/change-password?id=${data.id}`, data.body).subscribe(
      () => {
        this.toastService.openSnackBar('Пароль було змінено', 'successful', 'top');
        this.router.navigate(['/admin/profile-settings']);
      },
      (error) => {
        console.log('changeProfilePassword', error);
      }
    );
  }

}

