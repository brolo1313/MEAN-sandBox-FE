import { Pipe, PipeTransform } from '@angular/core';
import { IPlan } from 'src/app/admin-layout/dashboard/models/market.models';

@Pipe({
  name: 'searchBox',
  standalone: true,
})
export class SearchBoxPipe implements PipeTransform {

  
    transform(items:[IPlan], marketName = '') {
        return marketName
          ? items.filter((request:IPlan) => request.title && request.title.toLowerCase().includes(marketName.toLowerCase()))
          : items;
      }
    
  
  }
