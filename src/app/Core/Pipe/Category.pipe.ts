import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products';

@Pipe({
  name: 'Category'
})
export class FilterPipe implements PipeTransform {

  transform(products: Products[], searchTerm:string=''): Products[] {

    if(searchTerm.length>0){
      return products.filter((product)=>{
        return product.category.name.includes(searchTerm)
      })
    }else{
      return products
    }
  }

}
