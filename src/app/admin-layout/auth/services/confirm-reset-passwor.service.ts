import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfirmResetPasswordService {

    private isConfirmed = signal<boolean>(false);
    private confirmationData = signal<[]>([]);

    setIsConfirmed(data: boolean) {
        this.isConfirmed.set(data);
    }

    getIsConfirmed() {
        return this.isConfirmed();
    }

    setConfirmationData(data: []) {
        this.confirmationData.set(data);
    }

    getConfirmationData() {
        return this.confirmationData();
    }
}
