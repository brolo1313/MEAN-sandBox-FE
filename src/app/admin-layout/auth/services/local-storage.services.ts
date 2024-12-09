import { Injectable } from '@angular/core';
import { IAuthState } from '../../dashboard/models/market.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userSettingsStorageKey: string = 'auth';

  getUserSettings() {
    const userSettingsString = localStorage.getItem(this.userSettingsStorageKey);
    if (userSettingsString) {
      return { ...JSON.parse(userSettingsString).userSettings };
    }
    return false;
  }
  setUserSettings(userSettings: IAuthState) {
    localStorage.setItem(this.userSettingsStorageKey, JSON.stringify({ userSettings: userSettings }));
  }

}
