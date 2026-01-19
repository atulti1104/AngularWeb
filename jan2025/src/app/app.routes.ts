import { Routes } from '@angular/router';
import { SearchComponent } from './page/search/search.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { CartComponent } from './page/cart/cart.component';
import { AddressComponent } from './page/address/address.component';
export const routes: Routes = [
  {
    path:'',
    redirectTo:'search',
    pathMatch:'full'
  },
  {
    path:'search'
    ,component:SearchComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },

{
  path:'cart',
  component:CartComponent
},
{
  path:'address',
  component:AddressComponent
},
{ path: 'payment', 
  loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
}   
];
  