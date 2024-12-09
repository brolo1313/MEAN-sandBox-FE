import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { StoreMarketsService } from 'src/app/admin-layout/dashboard/services/stored-markets-list.services';
import { matchValidator } from '../../helpers/form-validators';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, LoaderComponent, RouterModule, MatIconModule, MatError],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public hide = true;

  public registerForm: UntypedFormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(8), matchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(8), matchValidator('password')]],

  });
  @Output() registerSubmit = new EventEmitter();

  get UserNameFC(): FormControl {
    return this.registerForm.get('username') as UntypedFormControl;
  }

  get EmailFC(): FormControl {
    return this.registerForm.get('email') as UntypedFormControl;
  }

  get passwordFC(): FormControl {
    return this.registerForm.get('password') as UntypedFormControl;
  }

  get passwordConfirmationFC(): FormControl {
    return this.registerForm.get('passwordConfirmation') as UntypedFormControl;
  }

  public store = inject(StoreMarketsService);

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) { }



  submit(registerForm: any) {
    const data = registerForm.value;
    this.authService.registration(data)
  }
}
