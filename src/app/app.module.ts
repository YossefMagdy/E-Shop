import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlackLayoutComponent } from './Layout/black-layout/black-layout.component';
import { BlankWithoutFootingComponent } from './Layout/blank-without-footing/blank-without-footing.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from
  '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { MainsliderComponent } from './components/mainslider/mainslider.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { BrandSliderComponent } from './components/brand-slider/brand-slider.component';
import { CartInterceptor } from './Core/interceptor/cart.interceptor';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { SpinnerInterceptor } from './Core/interceptor/spinner.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComparsionComponent } from './components/comparsion/comparsion.component';
import { SharedModule } from './Modules/Shared/shared/shared.module';


 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NotFoundComponent,
    BlackLayoutComponent,
    BlankWithoutFootingComponent,
    ForgetPasswordComponent,
    ChangePassComponent,
    MainsliderComponent,
    ProductSliderComponent,
    BrandSliderComponent,
    ShippingAddressComponent,
    ComparsionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecaptchaModule,
    SocialLoginModule,
    SharedModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:SpinnerInterceptor,
    multi:true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CartInterceptor,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('764667181910987')
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
