import { Products } from 'src/app/Core/interface/products';
import { Cartproduct } from 'src/app/Core/interface/cartproduct';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Core/service/cart.service';
import { WhishlistService } from 'src/app/Core/service/whishlist.service';


@Component({
  selector: 'app-whislist',
  templateUrl: './whislist.component.html',
  styleUrls: ['./whislist.component.css']
})
export class WhislistComponent implements OnInit{
  cartItems:Products[]=[]
  updateTimeOut:any
  constructor(private WhishlistService:WhishlistService,private ToastrService:ToastrService,private _CartService:CartService){}
  ngOnInit(): void {
    this.WhishlistService.userwishlist().subscribe({
      next:(Response)=>{
        this.cartItems=Response.data
        this.WhishlistService.NumberOfWhishlist.next(Response.count)
        
      }
    })

  }
  RemoveFromwhishlist(id:string,i:number){
    this.cartItems.splice(i,1)
    this.WhishlistService.RemoveFromwhishlist(id).subscribe({
      next:(Resp)=>{     
        this.ToastrService.success(Resp.message,'', {
          timeOut: 1000,
        },
        
        )
        this.WhishlistService.userwishlist().subscribe({
          next:(Response)=>{
            this.WhishlistService.NumberOfWhishlist.next(Response.count)
            
          }
        })
      },
      error:(err)=>{
      }
    })
  }
  Addtocart(id: string) {
    clearTimeout(this.updateTimeOut)
    this.updateTimeOut = setTimeout(() => {
      this._CartService.Addtocart(id).subscribe({
        next: (Response) => {
          this._CartService.NumberOfCartItem.next(Response.numOfCartItems)
          
          this.ToastrService.success(Response.message,'', {
            timeOut: 1000,
          });

          
        },
        error: (Error) => {
        }
      })
    }, 500)

  }

}
