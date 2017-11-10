import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent, SharedModule, ApiService, UserService, JwtService } from './shared';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';



const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    rootRouting,
    AuthModule,
    HomeModule
  ],
  providers: [
    ApiService,
    UserService,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
