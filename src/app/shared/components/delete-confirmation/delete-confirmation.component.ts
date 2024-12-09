import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  standalone: true,
})
export class DeleteConfirmationComponent implements OnInit, OnDestroy {

  private unsubscribeAll$ = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { planId: string | number | undefined, text: string, title: string }, public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {
  }

  public ngOnInit(): void {
    this.dialogRef.keydownEvents()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(e => {
        if (e.code === 'Escape') {
          this.cancel();
        }
      });

    this.dialogRef.backdropClick()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(() => this.cancel());
  }

  public cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }

  public confirm(): void {
    this.dialogRef.close({
      result: true,
      id: this.data.planId,
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }
}
