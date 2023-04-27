import { CartService } from 'src/app/Core/service/cart.service';
import { ShippingAddress } from './../../Core/interface/shipping-address';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {
  id!:string
  Done:boolean=false
  login:boolean=false
constructor(private _FormBuilder:FormBuilder,private CartService:CartService,@Inject(MAT_DIALOG_DATA) public data: any,){
  this.id=data.Id
  this.Done=true
  localStorage.setItem('userDone','true')
}
  ShippingAddress=this._FormBuilder.group({
    details:['',[Validators.required,Validators.minLength(3)]],
    phone:['',[Validators.required,Validators.pattern(/^(011|012|015|010)[0-9]{8}$/)]],
    city:['',[Validators.required]],
})

HandlePayment(){
  if(this.ShippingAddress.valid){
    this.login=true
    this.CartService.Checkoutsession(this.ShippingAddress.value,this.id).subscribe({
      next:(Res)=>{
        this.login=false

        window.open(Res.session.url)
      },
      error:(err)=>{
        this.login=false

      }
    })
    
  }
}
}
