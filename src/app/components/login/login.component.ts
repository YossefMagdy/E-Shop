import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/service/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider,SocialUser } from "@abacritt/angularx-social-login";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login:boolean=false
  Error:string=''
  Showpass:boolean=false
  ShowRepass:boolean=false
  Human:boolean=false

  constructor(
    private _fb:FormBuilder,
    private _AuthService:AuthService,
    private _Router:Router,
    private _SocialAuthService:SocialAuthService,
    private _NgxSpinnerService:NgxSpinnerService
  ){}
    FacebookLogin:boolean=false
  FacebookUser:any
  signInWithFacebook(): void {
    this._SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => {
       this.FacebookUser=user.response
       this.LoginForm.get('email')?.setValue(user.response.email)
       this.LoginForm.get('password')?.setValue('Y@123456')
        this._NgxSpinnerService.show()
      }
    ).then(
      ()=>{
        this._AuthService.login(this.LoginForm.value).subscribe({
          next:(Response)=>{
            if(Response.message=="success"){
              this.login=false
              localStorage.setItem('userToken',Response.token)
              this._AuthService.decode()
              this._Router.navigate(['/home'])
              this._NgxSpinnerService.hide()
            }
          },
          error:(error)=>{  
            this.login=false
            this.Error=error.error.message
          }
        })
      }
    )
    
  }

  LoginForm=this._fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9@-_$%#@!*.]{8,15}$/)]]
  })

  handleLogin(){
    if(this.LoginForm.valid){
      
      this.login=true
      this._AuthService.login(this.LoginForm.value).subscribe({
        next:(Response)=>{
          if(Response.message=="success"){
            this.login=false
            localStorage.setItem('userToken',Response.token)
            this._AuthService.decode()
            this._Router.navigate(['/home'])
          }
        },
        error:(error)=>{

          this.login=false
          this.Error=error.error.message
        }
      })
    }

  }
  toggleShow(){
    this.Showpass=!this.Showpass
  }
  resolved(captchaResponse: string) {
    if (captchaResponse.length > 0) {
      this.Human = true
    }
    else {
      this.Human = false
    }

  }

}
