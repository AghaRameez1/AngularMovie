import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api-service.service";
import {AuthserviceService} from "../services/authservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Testing-app';
  usersign: boolean = false;
  email: any = window.localStorage.getItem('email')
  constructor(private apiService: ApiService, public authService: AuthserviceService, private _router: Router) {
    this.authService.isLoggedIn$?.subscribe(res =>{
      if(res == true){
        this.usersign = res
        this.authService.userName$.next(this.email)
      }else{
        this.usersign = res
      }
    });
  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
    this.usersign = false
  }

}
