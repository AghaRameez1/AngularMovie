import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "./auth-page/auth-page.component";
import {AppComponent} from "./app.component";
import {MoviesComponent} from "./movies/movies.component";


const routes: Routes=[
  {
    path: 'signin',
    component: AuthPageComponent,
  },{
    path: 'movies',
    component: MoviesComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
