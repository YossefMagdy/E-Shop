import { AuthService } from 'src/app/Core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder } from '@angular/forms'
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider,SocialUser } from "@abacritt/angularx-social-login";
import { NgxSpinnerService } from "ngx-spinner";

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  login:boolean=false
  Error:string=''
  Showpass:boolean=false
  ShowRepass:boolean=false


  constructor(
    private _fb:FormBuilder,
    private _AuthService:AuthService,
    private _Router:Router,
    private _SocialAuthService:SocialAuthService,
    private _NgxSpinnerService:NgxSpinnerService
  ){}

  FacebookUser:any
  signInWithFacebook(): void {
    this._SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => {
       this.FacebookUser=user.response
       this.RegisterForm.get('name')?.setValue(user.response.name.split(' ').slice(0,1).join(''))
       this.RegisterForm.get('email')?.setValue(user.response.email)
       this.RegisterForm.get('password')?.setValue('Y@123456')
       this.RegisterForm.get('rePassword')?.setValue('Y@123456')
       this.RegisterForm.get('phone')?.setValue('01000000000')
        this._NgxSpinnerService.show()
      }
    ).then(()=>{
      console.log('eNTER')
      this._AuthService.Register(this.RegisterForm.value).subscribe({
        next:(Response)=>{
          console.log('eNTER')
          this.login=false
          this._NgxSpinnerService.hide()
          this._Router.navigate(['/login']) 
        },
        error:(error)=>{
          if(error.error.message.includes("Account Already Exists")){
            this._NgxSpinnerService.hide()
            this._Router.navigate(['/login']) 
          }
        }
      
      })
    })
    
  }

  RegisterForm=this._fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9@-_$%#@!*.]{8,15}$/)]],
    rePassword:['',[Validators.required,Validators.required,Validators.pattern(/^[a-zA-Z0-9@-_$%#@!*.]{8,15}$/)]],
    phone:[null,[Validators.required,Validators.pattern(/^(011|012|015|010)[0-9]{8}$/)]],
  },{Validators:this.passwordMatch})
  passwordMatch():any{
    let password=this.RegisterForm.get('password')
    let repassword=this.RegisterForm.get('rePassword')
    if(password?.value==repassword?.value){
      return ''
    }else{
      repassword?.setErrors({passwordMatc:'password and repassword dont match'})
      return {passwordMatc:'password and repassword dont match'}
    }
  }
  handleRegister(){
    if(this.RegisterForm.valid){
      this.login=true
      console.log(this.RegisterForm.value)
      this._AuthService.Register(this.RegisterForm.value).subscribe({
        next:(Response)=>{
          this.login=false
          console.log(Response)
          this._Router.navigate(['/login']) 
        },
        error:(error)=>{
          console.log(error)
          this.login=false
          this.Error=error.error.message
        }
      })
    }

  }
 
  toggleShow(){
    this.Showpass=!this.Showpass
  }
  toggleShowRe(){
    this.ShowRepass=!this.ShowRepass
  }
  


}