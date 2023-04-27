import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Enviroment } from './../enviroment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  Category():Observable<any>{
    return  this._HttpClient.get(Enviroment.BaseUrl+'categories')
  }
  Products():Observable<any>{
    return  this._HttpClient.get(Enviroment.BaseUrl+'products')
  }

  brands():Observable<any>{
    return  this._HttpClient.get(Enviroment.BaseUrl+'brands')
  }
  productDetails(id:string|null):Observable<any>{
    return  this._HttpClient.get(Enviroment.BaseUrl+'products/'+id)
  }
}
