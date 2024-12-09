import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { StoreMarketsService } from '../../services/stored-markets-list.services';
import { SearchInputComponent } from '../../../../shared/components/input-search/input-search.component';
import { SearchBoxPipe } from '../../../../shared/pipes/search-box.pipe';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AdminCreateOrEditFormComponent } from '../create-edit-form-modal-component/create-or-edit-form.component';
import { filter } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { TableViewSkeletonComponent } from 'src/app/shared/components/skeletons/table-view/table-view.skeleton.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard-list',
  standalone: true,
  imports: [CommonModule, NgFor, SearchInputComponent, SearchBoxPipe, TableViewSkeletonComponent, LoaderComponent, MatIconModule],
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {

  store = inject(StoreMarketsService);
  dialog = inject(MatDialog);
  userProfile = this.store.getPlans();
  localStorage = inject(LocalStorageService);

  @Output() createPlan = new EventEmitter();
  @Output() editPlan = new EventEmitter();
  @Output() deletePlan = new EventEmitter();
  @Output() getAllPlans = new EventEmitter();


  public byId = (item: any) => item?.id;
  public searchText!: string;

  ngOnInit() {
    this.getAllPlans.emit();
  }

  public addedPlan() {
    const dialogRef = this.dialog.open(AdminCreateOrEditFormComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        isCreate: true,
      },
    });

    dialogRef.afterClosed().pipe(
      filter((data: any) => !!data),
    ).subscribe(result => {
      this.createPlan.emit(result)
    });
  }

  public removePlan(planId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        isEdit: false,
        planId
      },
    });

    dialogRef.afterClosed().pipe(
      filter((data: any) => !!data),
    ).subscribe(result => {
      this.deletePlan.emit(result)
    });
  }


  public updatePlan(plan: any) {
    const dialogRef = this.dialog.open(AdminCreateOrEditFormComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        isEdit: true,
        plan: plan,
      },
    });

    dialogRef.afterClosed().pipe(
      filter((data: any) => !!data),
    ).subscribe(result => {
      this.editPlan.emit(result)
    });
  }

  public preView(plan: any) {
    this.dialog.open(AdminCreateOrEditFormComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        isPreview: true,
        plan: plan,
      },
    });
  }

}
