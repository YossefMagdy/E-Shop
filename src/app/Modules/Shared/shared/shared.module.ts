import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CarouselModule,
    SweetAlert2Module,
    NgxPaginationModule,
    NgxSpinnerModule,
    RecaptchaModule,
    MatTooltipModule,
    

  ]
})
export class SharedModule { }
