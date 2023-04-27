import { Products } from 'src/app/Core/interface/products';
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/Core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/Core/service/whishlist.service';

@Component({
  selector: 'app-comparsion',
  templateUrl: './comparsion.component.html',
  styleUrls: ['./comparsion.component.css']
})
export class ComparsionComponent {
  Products:any
  product1!:number
  product2!:number
  updateTimeOut:any
  
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _CartService:CartService,private ToastrService:ToastrService,private WhishlistService:WhishlistService){
  this.Products=data.products
  this.product1=data.p1
  this.product2=data.p2

}
Addtocart(id: string) {
  clearTimeout(this.updateTimeOut)
  this.updateTimeOut = setTimeout(() => {
    this._CartService.Addtocart(id).subscribe({
      next: (Response) => {
        this._CartService.NumberOfCartItem.next(Response.numOfCartItems)
        console.log(Response)
        this.ToastrService.success(Response.message,'', {
          timeOut: 1000,
        });
      },
      error: (Error) => {
        console.log(Error)
      }
    })
  }, 500)


}
ToggleClass:boolean=false
ToggleWishList(id:string,event:Event){
  let target = event.target as HTMLButtonElement
  if(target.classList.contains('fa-solid')){
    this.ToggleClass=true
    }else{
      this.ToggleClass=false
    }
  if(this.ToggleClass==false){
    target.classList.remove('fa-regular')
    target.classList.add('fa-solid')
    this.ToggleClass=true
    this.addtowhishlist(id)
  }else{
    target.classList.remove('fa-solid')
    target.classList.add('fa-regular')
    this.ToggleClass=false
    this.RemoveFromwhishlist(id)
  }
  
}
addtowhishlist(id:string){
  this.WhishlistService.Addtowhishlist(id).subscribe({
    next:(Resp)=>{
      this.ToastrService.success(Resp.message,'', {
        timeOut: 1000,
      });
      this.WhishlistService.userwishlist().subscribe({
        next:(Response)=>{
          this.WhishlistService.NumberOfWhishlist.next(Response.count)
          
        }
      })
    }
  })
}
RemoveFromwhishlist(id:string){
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
}
