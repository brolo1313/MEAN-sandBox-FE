import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreMarketsService {

  public selectAllMarketsList = signal<any>([]);

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


  storedAllMarketsList(data: any) {
    this.selectAllMarketsList.set(data);
  }

  getPlans() {
    return this.selectAllMarketsList();
  }


  addedMarketProfile(product: any) {
    this.selectAllMarketsList.update(items => [...items, product])
  }

  deleteMarketProfile(profileId: any) {
    this.selectAllMarketsList.update(items => items.filter((vendor: any) => vendor.id !== profileId));
  }

  updateMarketProfile(updatedMarket: any) {
    this.selectAllMarketsList.update(items =>
      items.map((item: any) => item.id === updatedMarket.id ? updatedMarket : item)
    )
  }
}
