import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products';

@Pipe({
  name: 'brand'
})
export class BrandPipe implements PipeTransform {

  transform(products: Products[], searchterm:string=''): Products[] {
    
   if(searchterm.length>0){
    return products.filter((product)=>{
      return product.brand.name.includes(searchterm)
    })
   }else{
    return products
   }
  }

}
