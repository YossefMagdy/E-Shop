import { Cartproduct } from 'src/app/Core/interface/cartproduct';

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { CartService } from 'src/app/Core/service/cart.service';
import { ShippingAddressComponent } from 'src/app/components/shipping-address/shipping-address.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  UpdateTimeOut: any
  CartProduct: Cartproduct[] = []
  totalPrice!: number
  SHIPPING: number = 0
  percentage: number = 0
  FreeShipping: boolean = false
  CartId!:string
  constructor(private CartService: CartService, private toastr: ToastrService,private MatDialog:MatDialog) {

   }
  ngOnInit(): void {
    this.CartService.UserCart().subscribe({
      next: (Response) => {
        this.CartProduct = Response.data.products
        this.totalPrice = Response.data.totalCartPrice
        this.CartId=Response.data._id 
        if (this.totalPrice < 1500) {
          this.SHIPPING = 1500 - this.totalPrice

          this.FreeShipping = false
        } else {

          this.FreeShipping = true
        }
        if (this.SHIPPING <= 0) {
          this.percentage = 100
        }
        else {
          this.percentage = 100 - Math.trunc((this.SHIPPING / 1500) * 100)
        }
      }
    })
  }

  RemoveItem(id: string,i:number) {
    clearTimeout(this.UpdateTimeOut)
    
    this.CartProduct.splice(i,1)
    this.UpdateTimeOut = setTimeout(() => {
      this.CartService.RemoveItem(id).subscribe({
        next: (Response) => {
          this.CartProduct = Response.data.products
          this.totalPrice = Response.data.totalCartPrice
          this.CartService.NumberOfCartItem.next(Response.numOfCartItems)
          this.toastr.success(Response.status,'', {
            timeOut: 1000,
          });
          if (this.totalPrice < 1500) {
            this.SHIPPING = 1500 - this.totalPrice
            this.FreeShipping = false

          } else {

            this.FreeShipping = true
          }
          if (this.SHIPPING <= 0) {
            this.percentage = 100
          }
          else {
            this.percentage = 100 - Math.trunc((this.SHIPPING / 1500) * 100)
          }
        }
      })
    }, 500)
  }





  ClearCart() {
    this.CartService.ClearCart().subscribe({
      next: (Response) => {
        this.CartProduct = []
        this.FreeShipping = false
        this.SHIPPING = 1500
        this.percentage = 0
        this.CartService.NumberOfCartItem.next(0)
        this.toastr.success(Response.message,'', {
          timeOut: 1000,
        });
      }
    })
  }


  Updatecartproductquantity(id: string, count: number,i:number) {
    clearTimeout(this.UpdateTimeOut)
    this.UpdateTimeOut = setTimeout(() => {
if(count<=0){
  this.RemoveItem(id,i)
}else{
  this.CartService.Updatecartproductquantity(id, count).subscribe(
    {
      next: (Response) => {
        this.CartProduct = Response.data.products
        this.totalPrice = Response.data.totalCartPrice
        if (this.totalPrice < 1500) {
          this.SHIPPING = 1500 - this.totalPrice

          this.FreeShipping = false
        } else {

          this.FreeShipping = true
        }
        if (this.SHIPPING <= 0) {
          this.percentage = 100
        }
        else {
          this.percentage = 100 - Math.trunc((this.SHIPPING / 1500) * 100)
        }
      }
    }
  )
}
    }, 500)

  }
  openComponent(){
    if(this.CartProduct.length>0){
      this.MatDialog.open(ShippingAddressComponent,{
        data:{
          Id:this.CartId
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No item to Procced'
      });

    }
    
  }
}
