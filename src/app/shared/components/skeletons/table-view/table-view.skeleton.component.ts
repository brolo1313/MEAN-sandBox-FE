import { NgFor } from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'table-view-skeleton',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table-view.skeleton.component.html',
  styleUrl: './table-view.skeleton.component.scss'
})
export class TableViewSkeletonComponent {
  emptyRows = Array.from({ length: 5 }, (_, i) => i);
}
