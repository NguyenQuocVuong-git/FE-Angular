import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(brandList: any[],name: String ): any {
    console.log(name);
    if(!name){
      return brandList;
    }else {
      if(name){
        brandList = brandList.filter( x => { 
          return x.brandName.toLowerCase().indexOf(name.toLowerCase()) != -1;
        });
      }
      return brandList;
    }
  }

}
