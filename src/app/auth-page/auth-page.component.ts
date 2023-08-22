import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ApiService} from "../services/api-service.service";
import {AuthserviceService} from "../services/authservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  signUpform: FormGroup = new FormGroup({});
  confirmUser: FormGroup = new FormGroup({});
  signInForm: FormGroup = new FormGroup({});
  state: boolean = true;
  loading: boolean = false;



  usersigned: boolean = false;

  constructor(public fb: FormBuilder,private apiService: ApiService, private userService: AuthserviceService,private route:Router) {
    this.signUpform = this.buildSignUpForm();
    this.confirmUser = this.buildConfirmUserForm();
    this.signInForm = this.buildSignInForm();
    this.userService.isLoggedIn$?.subscribe(res=>{
      this.usersigned = res;
    });
  }

  ngOnInit(): void {

  }
  buildSignUpForm() {
    return this.fb.group({
      username: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]),
      // email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required])
    });
  }

  buildConfirmUserForm() {
    return this.fb.group({
      username_confirm: new FormControl('', [Validators.required]),
      confirmation_code: new FormControl('', [Validators.required])
    });
  }

  buildSignInForm() {
    return this.fb.group({
      username_signin: new FormControl('', [Validators.required]),
      password_signin: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.signUpform?.get('username');
  }

  get password() {
    return this.signUpform?.get('password');
  }

  get confirm_password() {
    return this.signUpform?.get('confirm_password');
  }

  get email() {
    return this.signUpform?.get('email');
  }

  get first_name() {
    return this.signUpform?.get('first_name');
  }

  get last_name() {
    return this.signUpform?.get('last_name');
  }

  get username_confirmation() {
    return this.confirmUser?.get('username_confirm');
  }

  get confirmation_code() {
    return this.confirmUser?.get('confirmation_code');
  }

  get username_signin() {
    return this.signInForm?.get('username_signin');
  }

  get password_signin() {
    return this.signInForm?.get('password_signin');
  }

  onSubmit() {
    // if (!this.signUpform.valid) {
    //   return
    // } else {
      let body = {
        username: this.signUpform.value.username,
        email: this.signUpform.value.email,
        password: this.signUpform.value.password,
        confirm_password: this.signUpform.value.confirm_password,
        first_name: this.signUpform.value.first_name,
        last_name: this.signUpform.value.last_name,
      }

      this.apiService.post('signup/', body).subscribe((res: any) => {
        if (res.status == "success") {
          Swal.fire('Success', 'User Created Successfully', 'success');
          // this.state = !this.state
          this.confirmUser.patchValue({
            username_confirm: body.username
          })
          this.signUpform.reset();
        } else {
          Swal.fire('Error', 'User Already Exists', 'error');
        }
      });

    // }
  }

  onSubmitConfirmUser() {
    if (!this.confirmUser.valid) {
      return
    } else {
      let body = {
        username: this.confirmUser.value.username_confirmation,
        confirmation_code: this.confirmUser.value.confirmation_code
      }
      this.apiService.post('verifyToken/', body).subscribe((res: any) => {
        if (res.status == 200) {
          Swal.fire('Success', res?.message, 'success');
          this.confirmUser.reset();
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      });
    }
  }

  onSubmitSignIn() {
    if (!this.signInForm.valid) {
      return
    } else {
      this.loading = true;
      let body = {
        login_username: this.signInForm.value.username_signin,
        login_password: this.signInForm.value.password_signin
      }
      this.apiService.post('login/', body).subscribe((res: any) => {
        this.loading = false;
        if (res.statusCode == 200) {
          Swal.fire('Success', res?.body, 'success');
          this.signInForm.reset();
          this.userService.userName$.next(res.message.email)
          this.userService.login(res.message)
          // this.usersigned = true
        } else {
          Swal.fire('Error', res?.message, 'error');
        }

      });
    }
  }
  verifyUser() {
    this.state = !this.state;
  }

}
