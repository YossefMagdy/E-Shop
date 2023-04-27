import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  NumberOfWhishlist=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { 
    this.userwishlist().subscribe({
      next:(Resp)=>{
        this.NumberOfWhishlist.next(Resp.count)

      }
    })
  }

  userwishlist():Observable<any>{
    return this._HttpClient.get(Enviroment.BaseUrl+'wishlist')
  }
  Addtowhishlist(productId:string):Observable<any>{
    return this._HttpClient.post(Enviroment.BaseUrl+'wishlist',{
      productId:productId
    })
  }
  RemoveFromwhishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(Enviroment.BaseUrl+'wishlist/'+productId)
  }
}
