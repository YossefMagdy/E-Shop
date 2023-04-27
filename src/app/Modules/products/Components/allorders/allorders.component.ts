import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Cartproduct } from 'src/app/Core/interface/cartproduct';
import { ShippingAddress } from 'src/app/Core/interface/shipping-address';
import { CartService } from 'src/app/Core/service/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit  {
  cartItems:Cartproduct[]=[]
  shippingAddress!:ShippingAddress[]
  totalPrice!:number
  constructor(private CartService:CartService) {

   }

  ngOnInit(): void {
   
      this.CartService.GetAllOrders().subscribe({
        next:(Res)=>{
          this.cartItems=Res.data[0].cartItems
          this.shippingAddress=Res.shippingAddress    
          this.totalPrice=Res.data[0].totalOrderPrice
        }
      })

  }

}