import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: ` 
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
  `,
  styles: [`
  .spinner-border {
    color: var(--spinner-color); 
    width: 5em;
    height: 5em;
  }
`],
})
export class LoaderComponent { }
