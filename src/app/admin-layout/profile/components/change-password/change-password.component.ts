import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,

  Validators,
  ReactiveFormsModule,
  FormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/admin-layout/auth/helpers/form-validators';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';
import { ProfileService } from '../../services/profile.service';
import { IAuthState } from 'src/app/admin-layout/dashboard/models/market.models';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
})
export class ChangePasswordComponent {

  localStorageService = inject(LocalStorageService);
  profileService = inject(ProfileService);

  userSettings!: IAuthState;

  public form = this.fb.group({
    oldPassword: [null, Validators.required],
    newPassword: [null, [Validators.required,
                         Validators.minLength(8),
                         matchValidator('confirmPassword', true)]],
    confirmPassword: [null, [Validators.required,  matchValidator('newPassword')]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router
  ) {
    this.userSettings = this.localStorageService.getUserSettings();
  }


  get oldPasswordFC(): UntypedFormControl {
    return this.form.get('oldPassword') as UntypedFormControl;
  }
  get newPasswordFC(): UntypedFormControl{
    return this.form.get('newPassword') as UntypedFormControl;
  }
  get confirmPasswordFC():UntypedFormControl {
    return this.form.get('confirmPassword') as UntypedFormControl;
  }


  public onSubmit(form:UntypedFormGroup): void {
    const result = {
      id: this.userSettings.id,
      body: {...form.value}
    }

    this.profileService.changeProfilePassword(result);
  }
}
