import { Injectable, signal } from '@angular/core';
import { IPlan } from '../models/market.models';

@Injectable({
  providedIn: 'root'
})
export class StoreMarketsService {

  public selectAllMarketsList = signal<IPlan[]>([]);

  private dataIsLoadingMarketsProfilesList = signal<boolean>(false);
  private isLoadingAfterCrudOperation = signal<boolean>(false);

  setDataIsLoadingMarketsProfilesList(data: boolean) {
    this.dataIsLoadingMarketsProfilesList.set(data);
  }

  getDataIsLoadingMarketsProfilesList() {
    return this.dataIsLoadingMarketsProfilesList();
  }

  setIsLoadingAfterCrudOperation(data: boolean) {
    this.isLoadingAfterCrudOperation.set(data);
  }

  getIsLoadingAfterCrudOperation() {
    return this.isLoadingAfterCrudOperation();
  }


  storedAllMarketsList(data: IPlan[]) {
    this.selectAllMarketsList.set(data);
  }

  getPlans() {
    return this.selectAllMarketsList();
  }


  addedMarketProfile(product: IPlan) {
    this.selectAllMarketsList.update(items => [...items, product])
  }

  deleteMarketProfile(profileId: string) {
    this.selectAllMarketsList.update(items => items.filter((vendor: IPlan) => vendor.id !== profileId));
  }

  updateMarketProfile(updatedMarket: IPlan) {
    this.selectAllMarketsList.update(items =>
      items.map((item: IPlan) => item.id === updatedMarket.id ? updatedMarket : item)
    )
  }
}
