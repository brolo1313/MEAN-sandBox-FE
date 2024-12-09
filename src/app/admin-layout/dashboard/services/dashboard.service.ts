import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StoreMarketsService } from './stored-markets-list.services';
import { LocalStorageService } from '../../auth/services/local-storage.services';
import { environment } from '../../../../environments/environment';
import { ToastService } from 'src/app/shared/services/toasts.service';
import { IPlan } from '../models/market.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreMarketsService);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }



  public getPlans() {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.get<IPlan[]>(`${environment.apiUrl}/plans`).subscribe(
      (response: IPlan[]) => {
        this.store.storedAllMarketsList(response)
        this.store.setDataIsLoadingMarketsProfilesList(false);
      },
      () => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    )
  }

  public createPlan(body: IPlan) {
    this.store.setIsLoadingAfterCrudOperation(true);
    return this.http.post(`${environment.apiUrl}/plan`, {
      ...body
    }).subscribe(
      (response:any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const {_id, ...otherData} = response;
        const result = {
          ...otherData,
          id:_id
        }
        this.store.addedMarketProfile(result);
        this.store.setIsLoadingAfterCrudOperation(false);
        this.toastService.openSnackBar('Створення успішне', 'successful', 'top');
      },
      () => {
        this.store.setIsLoadingAfterCrudOperation(false);
      }
    )
  }


  public deletePlan(data: {currentUser: string , id: string}) {
    this.store.setIsLoadingAfterCrudOperation(true);
    return this.http.delete(`${environment.apiUrl}/plans/${data.id}`, {
      params: {
        authorId: data.currentUser
      }
    }).subscribe(
      () => {
        this.store.deleteMarketProfile(data.id);
        this.store.setIsLoadingAfterCrudOperation(false);
        this.toastService.openSnackBar('Видалення успішне', 'successful-delete', 'top');
      },
      () => {
        this.store.setIsLoadingAfterCrudOperation(false);
      }
    );
  }

  public editPlan(data: {body: IPlan, id: string}) {
    this.store.setIsLoadingAfterCrudOperation(true);
    return this.http.put<IPlan>(`${environment.apiUrl}/plan/${data.id}`, data.body, {
    }).subscribe(
      (updatedPlan: IPlan) => {
        this.store.updateMarketProfile(updatedPlan);
        this.store.setIsLoadingAfterCrudOperation(false);
        this.toastService.openSnackBar('Редагування успішне', 'successful-edit', 'top');
      },
      () => {
        this.store.setIsLoadingAfterCrudOperation(false);
      }
    );

  }
}
