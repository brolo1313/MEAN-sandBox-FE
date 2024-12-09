import { Component, Input, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../auth/services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../auth/services/local-storage.services';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { IAuthState } from '../dashboard/models/market.models';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule, NgIf, MatMenuModule, MatDividerModule, MatIconModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent  implements OnInit {

  @Input() title: string = '';

  authService = inject(AuthService)
  router = inject(Router);
  localStorage = inject(LocalStorageService);
  authSocialService = inject(SocialAuthService);

  userSettings!: IAuthState;

  ngOnInit(): void {
    this.userSettings = this.localStorage.getUserSettings();
  }

  public logOut() {
    this.authService.signOut();
  }

  public navigateToPassPage() {
    this.router.navigate(['/admin/profile-settings']);
  }
}
