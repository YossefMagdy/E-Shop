import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from '../Components/product/product.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { BrandPipe } from 'src/app/Core/Pipe/brand.pipe';
import { RatingPipe } from 'src/app/Core/Pipe/rating.pipe';
import { FilterPipe } from 'src/app/Core/Pipe/Category.pipe';
import { CartComponent } from '../Components/cart/cart.component';
import { WhislistComponent } from '../Components/whislist/whislist.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AllordersComponent } from '../Components/allorders/allorders.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ProductComponent,
    FilterPipe,
    BrandPipe,
    RatingPipe,
    CartComponent,
    WhislistComponent,
    ProductDetailsComponent,
    AllordersComponent
    
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    CarouselModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class ProductsModule { }
