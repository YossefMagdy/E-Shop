import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(products: Products[], SearchItem: string=''): Products[] {
    
    if(SearchItem.length>0){
      return products.filter((product)=>{
        return product.ratingsAverage.toString().split('.').slice(0,1).includes(SearchItem)
      });
    }
    else{
      return products
    }
  }

}
