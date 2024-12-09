import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { ConfirmResetPasswordService } from '../../../services/confirm-reset-passwor.service';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { StoreMarketsService } from 'src/app/admin-layout/dashboard/services/stored-markets-list.services';


@Component({
  selector: 'app-admin-reset-password',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgxMaskDirective, MatIconModule, LoaderComponent],
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss'],
})
export class ResetPasswordComponent {
  @Output() resetPassEmitter = new EventEmitter();

  public store = inject(StoreMarketsService);
  resetPassService = inject(ConfirmResetPasswordService);

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  public hide: boolean = true;

  public resetForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required]],
    // code: [''],
  });

  get EmailFC(): UntypedFormControl {
    return this.resetForm.get('email') as UntypedFormControl;
  }

  public navigateBack() {
    this.router.navigate(['/login']);
  }
  public submit(resetForm: UntypedFormGroup) {
    const data = resetForm.value;
    this.resetPassEmitter.emit(data);
  }
}
