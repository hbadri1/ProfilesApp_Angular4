import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';



const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      //Later
    }
  }
]);



@NgModule({
  imports: [
    CommonModule,
    homeRouting
  ],
  declarations: [HomeComponent]
})


export class HomeModule { }
