import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CartInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token:any=localStorage.getItem('userToken')
    let  updateRequest=request.clone({
      headers:request.headers.set('token',token)
    })
    if(request.url.includes('signin') ||   request.url.includes('signup') || request.url.includes('forgotPasswords') || request.url.includes('verifyResetCode') || request.url.includes('resetPassword') ){
     
      return next.handle(request)
    }
    else{
      
      return next.handle(updateRequest );
    }
  }
}
