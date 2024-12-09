import { Component, OnInit, ViewChild, } from '@angular/core';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './header/admin-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { navigation } from './navigation/navigation';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgIf, NgFor, AdminHeaderComponent, AdminHeaderComponent, MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  navItems = navigation;

  public openSidebar: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile = true;
  public titleHeader: string = '';


  constructor(private observer: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const title = this.getTitleFromRoute(this.route.root);
      this.titleHeader = title;
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 768px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.openSidebar = false;
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }


  public showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  private getTitleFromRoute(route: ActivatedRoute): string {
    let currentRoute = route;
    let title = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const data = currentRoute.snapshot.data;
      if (data && data['title']) {
        title = data['title'];
      }
    }

    return title;
  }

}
