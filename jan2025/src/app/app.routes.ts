import { Routes } from '@angular/router';
import { SearchComponent } from './page/search/search.component';
import { BookingComponent } from './page/booking/booking.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
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
    path:'booking',
    component:BookingComponent
  }

    
];
