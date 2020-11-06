import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(brandList : any[], sortBy : String , sortValue : number): any {
    if(sortBy === 'id'){
      brandList.sort((a,b) => {
        if(a.brandId > b.brandId) return sortValue;
        else if ( a.brandId < b.brandId) return -sortValue;
        else return 0;
      });
    }
    if(sortBy === 'brandName'){
      // brandList.sort((a,b) => {
      //   if(a.brandName > b.brandName) return sortValue;
      //   else if ( a.brandName < b.brandName) return -sortValue;
      //   else return 0;
      // });
      brandList = orderBy(brandList, ['brandName'], [ sortValue == 1 ? 'asc': 'desc']);
     
    }
    if(sortBy === 'amount'){
      brandList.sort((a,b) => {
        if(a.amount > b.amount) return sortValue;
        else if ( a.amount < b.amount) return -sortValue;
        else return 0;
      });
    }
    return brandList;
  }

}
