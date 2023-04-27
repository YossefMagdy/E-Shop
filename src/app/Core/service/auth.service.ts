import { UserData } from './../interface/user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName!:string
  UserSignIn=new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient,
    private _Router:Router  ) { 
      if(localStorage.getItem('userToken')!=null){
        this.decode()
      }

    }

  Register(userData:object):Observable<any>{
   return this._HttpClient.post(Enviroment.BaseUrlAuth+'signup',userData)
  }
  login(userData:object):Observable<any>{
   return this._HttpClient.post(Enviroment.BaseUrlAuth+'signin',userData)
  }
  ResetPassword(userData:object):Observable<any>{
   return this._HttpClient.post(Enviroment.BaseUrlAuth+'forgotPasswords',userData)
  }
  ResetCode(userData:object):Observable<any>{
   return this._HttpClient.post(Enviroment.BaseUrlAuth+'verifyResetCode',userData)
  }
  Changepassword(userData:object):Observable<any>{
   return this._HttpClient.put(Enviroment.BaseUrlAuth+'resetPassword',userData)
  }
  decode(){
    let encoded=JSON.stringify(localStorage.getItem('userToken'));
    let decoded:any=jwtDecode(encoded)
    this.userName=decoded.name
    this.UserSignIn.next(decoded)
  }
  

}
