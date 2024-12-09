import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { LoginComponent } from '../../component/login.component';
import { AuthService, USER_CREDENTIALS } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';
import { ToastService } from 'src/app/shared/services/toasts.service';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-login-container',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
  ],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class AdminLoginContainerComponent {
  private route = inject(ActivatedRoute);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor(private authService: AuthService) {
    this.route?.queryParams?.subscribe(params => {
      const userDataParam = params['userData'];
      const error = params['error'];

      if (error) {
        const errorMessage = JSON?.parse(decodeURIComponent(error));
        this.toastService.openSnackBar(errorMessage.message, 'error', 'top');

        this.router.navigate([], {
          queryParams: {}
        });
      }

      if (userDataParam) {
        const userData = JSON?.parse(decodeURIComponent(userDataParam));
        this.localStorageService.setUserSettings(userData);
        this.router.navigate(['/admin/dashboard']);
      }

    
    });
  }
  public onLogin(loginData: USER_CREDENTIALS) {
    this.authService.login(loginData)
  }

  public onGoogleAuthEmitter() {
    this.authService.googleLogin();
  }
}
