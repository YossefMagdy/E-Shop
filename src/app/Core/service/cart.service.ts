import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Enviroment } from '../enviroment';
import { ShippingAddress } from '../interface/shipping-address';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  NumberOfCartItem=new BehaviorSubject(0)
    constructor(private _httpclient:HttpClient) {
   this.UserCart().subscribe({
    next:(Response)=>{
      this.NumberOfCartItem.next(Response.numOfCartItems)
    }
   })
   }
  header:any={
    token:localStorage.getItem('userTokeb')
  }

  Addtocart(id:string):Observable<any>{
    return this._httpclient.post(Enviroment.BaseUrl+'cart',{
      productId:id
    })
  }
  UserCart():Observable<any>{
    return this._httpclient.get(Enviroment.BaseUrl+'cart')
  }

  RemoveItem(id:string):Observable<any>{
    return this._httpclient.delete(Enviroment.BaseUrl+'cart/'+id)
  }
  ClearCart():Observable<any>{
    return this._httpclient.delete(Enviroment.BaseUrl+'cart')
  }
  Updatecartproductquantity(id:string,Count:number):Observable<any>{
    return this._httpclient.put(Enviroment.BaseUrl+'cart/'+id,{
      count:Count
    })
  }
  Checkoutsession(shippingAddress:any,CartId:string):Observable<any>{
    return this._httpclient.post(Enviroment.BaseUrl+`orders/checkout-session/${CartId}?url=https://yossefmagdy.github.io/E-shop/Products`,{
      shippingAddress:shippingAddress
    })
  }

  GetAllOrders():Observable<any>{
    return this._httpclient.get(Enviroment.BaseUrl+'orders')
  }

}

