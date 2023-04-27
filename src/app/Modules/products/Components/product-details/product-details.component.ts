
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { document } from 'ngx-bootstrap/utils';
import { Products } from 'src/app/Core/interface/products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Core/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  updateTimeOut!:any
  selecteditem!:number
  ImagePath:any
  productid!:string|null
  productDetails!:Products
  constructor(private _Router:Router, private _ActivatedRoute:ActivatedRoute,private _ProductService:ProductService,private _CartService:CartService,private toastr:ToastrService){
    this._ActivatedRoute.paramMap.subscribe({
      next:(Res)=>{
        this.productid=Res.get('id')
      }
    })
  
    
  }

  ngOnInit(): void {
    this._ProductService.productDetails(this.productid).subscribe({
      next:(Response)=>{
        this.productDetails=Response.data
    
      },
      error:(error)=>{
      }
    })
    
  }
  Getsrc(x:Event,i:any){
    const target = x.target as HTMLButtonElement;
    const attributeValue = target.getAttribute('src');
    this.ImagePath=attributeValue;
    let MainImage=document.getElementById('MainImage')
    MainImage.setAttribute('src',this.ImagePath)
    this.selecteditem=i

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:10,
    navSpeed: 700,
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],

    responsive: {
      0: {
        items: 4
      },

    },
    nav: true
  }

  Addtocart(id: string) {
    clearTimeout(this.updateTimeOut)
    this.updateTimeOut = setTimeout(() => {
      this._CartService.Addtocart(id).subscribe({
        next: (Response) => {
          this._CartService.NumberOfCartItem.next(Response.numOfCartItems)
          this.toastr.success(Response.message,'', {
            timeOut: 1000,
          });
        },
        error: (Error) => {
        }
      })
    }, 500)

  }

}
