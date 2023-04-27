import { WhishlistService } from './../../Core/service/whishlist.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/service/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { CartService } from 'src/app/Core/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  
  islogin:boolean=false
  ChangHeight:boolean=true
  CartNumber!:number
  WhishlistNum!:number
  UserName:string=''
  toggleLogin:string=''
  constructor(private _AuthService:AuthService,private _router:Router, private _social:SocialAuthService,private _CartService:CartService,private WhishlistService:WhishlistService){
    _CartService.NumberOfCartItem.subscribe({
      next:(Resp)=>{
        
        this.CartNumber=Resp
      }
    })
    WhishlistService.NumberOfWhishlist.subscribe({
      next:(Resp)=>{
        this.WhishlistNum=Resp
      }
    })
   
    this.UserName= this._AuthService.userName

    this._router.events.subscribe((Resp)=>{
      if(Resp instanceof NavigationEnd){
        this.toggleLogin=this._router.url.slice(1)
      }
    })
  }
  ngOnInit(): void {
    this._AuthService.UserSignIn.subscribe({
      next:()=>{
        if(this._AuthService.UserSignIn.getValue()!= null){
          this.islogin=true
        }
        else{
          this.islogin=false
        }
      }
    })
  }
  Change(){
    this.ChangHeight=false
  }

  signOut(): void {
    localStorage.removeItem('userToken')
    this._AuthService.UserSignIn.next(null)
    localStorage.removeItem('userDone')
    this._router.navigate(['/login'])
  }
}
