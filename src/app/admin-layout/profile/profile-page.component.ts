import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { settings_navigation } from './utils/settings-navigation';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgIf, NgFor, MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit,OnDestroy{

  navSettingsItems = settings_navigation;


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isCollapsed = true;
  isMobile = true;

  public titleHeader: string = '';
  public openSidebar: boolean = false;
  public selectedItem: number = 0;

  private routerSubscription!: Subscription;

  constructor(private observer: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.router && this.navSettingsItems) {
      this.selectNavItemBasedOnUrl();
    }

    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (event instanceof NavigationEnd) {
          this.selectNavItemBasedOnUrl();
        }
      })
  }
  selectNavItemBasedOnUrl(): void {
    const currentUrl = this.router.url;
    const selectedIndex = this.navSettingsItems.findIndex(navItem => navItem.path === currentUrl);
    if (selectedIndex !== -1) {
      this.selectedItem = selectedIndex;
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
