import { ProductService } from './../../Core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from 'src/app/Core/interface/brand';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.css']
})
export class BrandSliderComponent implements OnInit {
  Brands: Brand[] = []
  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.brands().subscribe({
      next: (Response) => {
        this.Brands = Response.data
      }
    })
  }

  customOptions: OwlOptions = {
    center: true,
    items: 3,
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true, 
    slideTransition: 'linear',
    autoplayTimeout: 100,
    autoplaySpeed: 6000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      500: {
        items: 5
      },
      740: {
        items: 6
      },
      940: {
        items: 7
      }
    },
  }

}
