import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { StoreMarketsService } from 'src/app/admin-layout/dashboard/services/stored-markets-list.services';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule, NgFor,
    ReactiveFormsModule, NgxMaskDirective,
    LoaderComponent, RouterModule,
    MatIconModule, MatError,
    GoogleSigninButtonModule,
    SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  @Output() loginEmitter = new EventEmitter();
  @Output() googleAuthEmitter = new EventEmitter();


  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);
  public store = inject(StoreMarketsService);

  public loginForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public hide = true;

  get EmailFC(): FormControl {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  public submit(loginForm: UntypedFormGroup) {
    const data = loginForm.value;
    this.loginEmitter.emit(data);
  }

  public singInWithGoogle() {
    this.googleAuthEmitter.emit();
  }

  public navigateToChosePage() {
    this.router.navigate(['/chose-market-page']);
  }

  public navigateToResetPage() {
    this.router.navigate(['/reset-password']);
  }
}
