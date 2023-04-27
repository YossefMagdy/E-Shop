import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlackLayoutComponent } from './Layout/black-layout/black-layout.component';
import { BlankWithoutFootingComponent } from './Layout/blank-without-footing/blank-without-footing.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { LoginGuard } from './Core/Guard/login.guard';
import { ChangePassGuard } from './Core/Guard/change-pass.guard';

const routes: Routes = [
  {path:'',component:BlackLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',canActivate:[LoginGuard],component:HomeComponent},
    {path:'Products',loadChildren:()=>import('./Modules/products/productsModule/products.module').then((Resp)=>Resp.ProductsModule)},
  ]},
  {path:'',component:BlankWithoutFootingComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'ForgetPassword',component:ForgetPasswordComponent},
    {path:'ChangePass',canActivate:[ChangePassGuard],component:ChangePassComponent},
  ]},
  {path:'**',component:NotFoundComponent}
  
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
