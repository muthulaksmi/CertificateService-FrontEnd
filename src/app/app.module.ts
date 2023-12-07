import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent, DialogComponent } from './signup/signup.component';
import { FortgotComponent } from './fortgot/fortgot.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewcertificateComponent } from './viewcertificate/viewcertificate.component';

const appRoutes:Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'forgot', component: FortgotComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'view', component: ViewcertificateComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FortgotComponent,
    HomeComponent,
    DialogComponent,
    ViewcertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  
   providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
