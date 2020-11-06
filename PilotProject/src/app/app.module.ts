import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule , Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrandListComponent } from './BrandManager/brand-list/brand-list.component';
import { ProductListComponent } from './ProductManager/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
// import { MatDialogModule } from '@angular/material/';

// import {PopupModule} from 'ng2-opd-popup';

//notifice
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//service 
import { BrandService } from './BrandManager/BrandService/BrandService.service';
import { ModalComponent } from './Dialog/modal/modal.component';
import { SortPipe } from './BrandManager/Pipe/sort.pipe';
import { SearchPipe } from './BrandManager/Pipe/search.pipe';
import { PopupDeleteComponent } from './Dialog/Dialog Delete/popup-delete/popup-delete.component';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './Login/login/login.component';
import { HomeComponent } from './Home/home/home.component';

const appRouter : Routes = [ 
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
    
  },
  {
    path : 'login',
    component : LoginComponent
    
  },
  {
    path : 'home',
    component : HomeComponent
    
  },
  {
    path : 'brand',
    component : BrandListComponent,
    canActivate : [AuthGuard]
    
  },
  
  {
    path : 'product',
    component : ProductListComponent,
    canActivate : [AuthGuard]
    
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrandListComponent,
    ProductListComponent,
    ModalComponent,
    SortPipe,
    SearchPipe,
    PopupDeleteComponent,
    LoginComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRouter),
    HttpClientModule,
    NgxPaginationModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot()
  ],
  providers: [
    BrandService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
