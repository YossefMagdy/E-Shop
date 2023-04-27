import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../Components/product/product.component';
import { CartComponent } from '../Components/cart/cart.component';
import { WhislistComponent } from '../Components/whislist/whislist.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { AllordersComponent } from '../Components/allorders/allorders.component';
import { LoginGuard } from 'src/app/Core/Guard/login.guard';
import { OrdersGuard } from 'src/app/Core/Guard/orders.guard';

const routes: Routes = [
  {path:'',redirectTo:"products",pathMatch:'full'},
  {path:'products',canActivate:[LoginGuard],component:ProductComponent},
  {path:'Cart',canActivate:[LoginGuard],component:CartComponent},
  {path:'wishlist',canActivate:[LoginGuard],component:WhislistComponent},
  {path:'product/:id',canActivate:[LoginGuard],component:ProductDetailsComponent},
  {path:'allorders',canActivate:[LoginGuard,OrdersGuard],component:AllordersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
  
 }
