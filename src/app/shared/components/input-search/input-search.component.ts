import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: ` 
     <div class="d-flex justify-content-center full-width mt-3 pos-relative">
        <img class="pos-absolute" src="assets/icons/shared-icons/search.svg" alt="">
        <input
          class="form-control"
          type="text"
          [attr.name]="attributeName"
          [(ngModel)]="searchText"
          (input)="onSearchTextChanged()"
          autocomplete="off"
          placeholder="Пошук"
          [disabled]="isDisabled"
        />
    </div>
  `,
  styles: [`
      input[name="search"] {
        border-radius: 20px;
        height: 45px;
        text-indent: 10px;
        border: 1px solid #f8b218;

        text-indent: 25px;
        }

        img {
          top: 50%;
          left: 20px;
          transform: translate(-50%, -50%); 
        }

        :host-context(.dashboard-view) input[name="search"] {
          border-radius: 10px;
}
    `],
})
export class SearchInputComponent {

  @Input() attributeName: string = '';
  @Input() searchText: string = '';
  @Input() isDisabled: boolean = false;

  @Output() searchTextChange = new EventEmitter<string>();


  onSearchTextChanged() {
    this.searchTextChange.emit(this.searchText);
  }
}
