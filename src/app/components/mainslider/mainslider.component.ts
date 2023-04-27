import { Category } from './../../Core/interface/category';
import { ProductService } from './../../Core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-mainslider',
  templateUrl: './mainslider.component.html',
  styleUrls: ['./mainslider.component.css']
})
export class MainsliderComponent  implements OnInit{
CategoryProduct:Category[]=[]
  constructor(public _ProductService:ProductService){}

  ngOnInit(): void {
    this._ProductService.Category().subscribe({
      next:(Response)=>{
        this.CategoryProduct=Response.data
      },
      error:(error)=>
      {

      }
    })
  }

  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
