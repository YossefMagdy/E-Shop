import { WhishlistService } from './../../Core/service/whishlist.service';
import { ProductService } from './../../Core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from 'src/app/Core/interface/products';
import { CartService } from 'src/app/Core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ComparsionComponent } from '../comparsion/comparsion.component';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit {
  products!: Products[]
  updateTimeOut: any
  constructor(private _ProductService: ProductService, private _CartService: CartService, private toastr: ToastrService,
    private WhishlistService: WhishlistService, private MatDialog: MatDialog) { }



  ngOnInit(): void {
    this._ProductService.Products().subscribe({
      next: (Response) => {
        this.products = Response.data.reverse()
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 20,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      500: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
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
  
  ToggleClass: boolean = false

  ToggleWishList(id: string, event: Event, i: number) {
    let target = event.target as HTMLButtonElement
    if (target.classList.contains('fa-solid')) {
      this.ToggleClass = true
    } else {
      this.ToggleClass = false
    }
    if (this.ToggleClass == false) {
      target.classList.remove('fa-regular')
      target.classList.add('fa-solid')
      this.ToggleClass = true
      this.addtowhishlist(id)
    } else {
      target.classList.remove('fa-solid')
      target.classList.add('fa-regular')
      this.ToggleClass = false
      this.RemoveFromwhishlist(id, i)
    }

  }
  addtowhishlist(id: string) {
    this.WhishlistService.Addtowhishlist(id).subscribe({
      next: (Resp) => {
        this.toastr.success(Resp.message, '', {
          timeOut: 1000,
        });
        this.WhishlistService.userwishlist().subscribe({
          next: (Response) => {
            this.WhishlistService.NumberOfWhishlist.next(Response.count)

          }
        })
      }
    })
  }
  RemoveFromwhishlist(id: string, i: number) {
    this.WhishlistService.RemoveFromwhishlist(id).subscribe({
      next: (Resp) => {
        this.toastr.success(Resp.message, '', {
          timeOut: 1000,
        },

        )
        this.WhishlistService.userwishlist().subscribe({
          next: (Response) => {
            this.WhishlistService.NumberOfWhishlist.next(Response.count)

          }
        })
      },
      error: (err) => {
      }
    })
  }
  Product1: any = 'undefined'
  Product2: any = 'undefined'
  AddtoComparison(i: number) {

    if (this.Product1 == 'undefined') {
      this.Product1 = i
    } else {
      this.Product2 = i
      this.MatDialog.open(ComparsionComponent, {
        data: {
          products: this.products,
          p1: this.Product1,
          p2: this.Product2,
        },
        width: '1400px',
      })
      this.Product1 = 'undefined'
      this.Product2 = 'undefined'
    }


  }
}
