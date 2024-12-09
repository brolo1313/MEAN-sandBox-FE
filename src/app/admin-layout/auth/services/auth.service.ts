import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./local-storage.services";
import { ConfirmResetPasswordService } from "./confirm-reset-passwor.service";
import { environment } from "src/environments/environment";
import { ToastService } from "src/app/shared/services/toasts.service";
import { StoreMarketsService } from "../../dashboard/services/stored-markets-list.services";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

export interface USER_CREDENTIALS {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: SocialUser;
  loggedIn!: boolean;

  resetPassService = inject(ConfirmResetPasswordService);
  http = inject(HttpClient);
  router = inject(Router);
  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreMarketsService);

  constructor(private authSocialService: SocialAuthService) {
    this.checkGoogleLogin();
  }

  login(loginData: USER_CREDENTIALS) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.post(`${environment.apiUrl}/sign-in`, loginData).subscribe(
      (response) => {
        this.localStorageService.setUserSettings(response);
        this.router.navigate(['/admin/dashboard']);
        this.store.setDataIsLoadingMarketsProfilesList(false);
      },
      () => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );
  }

  signOut() {
    if (this.loggedIn) {
      this.authSocialService.signOut();
    }
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public registration(user: any) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.post(`${environment.apiUrl}/sign-up`, user).subscribe(
      (response) => {
        this.localStorageService.setUserSettings(response);
        this.store.setDataIsLoadingMarketsProfilesList(false);
        this.toastService.openSnackBar('Реєстрація успішна, можете увійти', 'successful', 'top');
        this.router.navigate(['/login']);
      },
      () => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );;
  }

  public forgotPwRequest(data: any) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.post(`${environment.apiUrl}/reset-password`, data).subscribe(
      (response: any) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
        this.toastService.openSnackBar(response.message, 'successful', 'top');
        this.router.navigate(['/login']);
      },
      () => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );
  }


  public googleLogin() {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public checkGoogleLogin() {
    this.authSocialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user) {
        this.store.setDataIsLoadingMarketsProfilesList(true);
        return this.http.post(`${environment.apiUrl}/auth/google/callback`, user).subscribe(
          (response) => {
            this.localStorageService.setUserSettings(response);
            this.router.navigate(['/admin/dashboard']);
            this.store.setDataIsLoadingMarketsProfilesList(false);
          },
          () => {
            this.store.setDataIsLoadingMarketsProfilesList(false);
          }
        )
      }
      return null;
    }
    );
  }
}