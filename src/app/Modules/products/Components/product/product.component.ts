import { Brand } from 'src/app/Core/interface/brand';
import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from 'src/app/Core/interface/products';
import { ProductService } from 'src/app/Core/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Core/service/cart.service';
import { WhishlistService } from 'src/app/Core/service/whishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  constructor(private _ProductService: ProductService, private _CartService: CartService, private toastr: ToastrService,private WhishlistService:WhishlistService) {
    if (window.innerWidth < 768) {
      this.SmallScreens = true
    } else {
      this.SmallScreens = false
    }
  }
  scrWidth: any;
  SmallScreens: boolean = false

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrWidth = window.innerWidth
    if (this.scrWidth < 1200 && this.scrWidth > 992) {
      this.Items = 6
    } else if ((this.scrWidth > 1200)) {
      this.Items = 8
    }
    if (this.scrWidth < 992) {
      this.Items = 4
    } else if (this.scrWidth < 1200 && this.scrWidth < 992) {
      this.Items = 6
    }
    if (this.scrWidth < 768) {
      this.SmallScreens = true
    } else {
      this.SmallScreens = false
    }
  }
  SearchByCategory!: any
  SearchBybrands!: any
  SearchByRating: any = ''
  Brand!: Brand[]
  products: Products[] = []
  p!: number
  Items: number = 8
  check: boolean = false
  updateTimeOut: any

  ngOnInit(): void {
    this._ProductService.brands().subscribe({
      next: (Response) => {
        this.Brand = Response.data
      }
    })
    this._ProductService.Products().subscribe({
      next: (Response) => {
        this.products =   Response.data

      }
    })
  }
  attributeValue:string='none'
  sortProductByPrice(event:Event){
    let target = event.target as HTMLButtonElement
    let attributeValue = target.value
    this.products.forEach((e)=>{
      if(attributeValue=='low'){

        this.products=this.products.sort((a, b) => Number(a.price) - Number(b.price))
      }else{
        this.products=this.products.sort((a, b) => Number(b.price) - Number(a.price))
      }
    })

 }
  GetCategory(event: Event) {
    let target = event.target as HTMLButtonElement
    let attributeValue = target.getAttribute('value')
    if (attributeValue == 'All') {
      this.SearchByCategory = ''
    } else {
      this.SearchByCategory = attributeValue
    }
    this.p = 1

  }
  Getbrand(event: Event) {
    let target = event.target as HTMLButtonElement
    let attributeValue = target.getAttribute('value')
    this.SearchBybrands = attributeValue
    this.p = 1

  }
  GetRate(event: Event) {
    let target = event.target as HTMLButtonElement
    let attributeValue = target.getAttribute('value')
    this.SearchByRating = attributeValue
    this.p = 1

  }
  change() {
    this.check = !this.check
    if (this.check == false) {
      this.Items = 8
      this.p = 1
    } else {
      this.Items = 4
      this.p = 1
    }
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
        this.toastr.success(Resp.message,'', {
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
        this.toastr.success(Resp.message,'', {
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
