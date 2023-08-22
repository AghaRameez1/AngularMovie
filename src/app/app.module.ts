import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {HttpTokenInterceptor} from "./services/http.token.interceptor";
import {ErrorInterceptor} from "./services/error.interceptor";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { AddmovieComponent } from './movies/form/addmovie/addmovie.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component'
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HeaderComponent,
    MoviesComponent,
    AddmovieComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    NgbModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SweetAlert2Module.forRoot(),
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
    NgbModalModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
