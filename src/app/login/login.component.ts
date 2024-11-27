import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { errorAlert, successAlert } from '../utils/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',] // Corrected `styleUrls`
})
export class LoginComponent {
  loginForm: FormGroup;
  users: Array<{ email: string; password: string }> = []; // Define users as an array with a proper type
  data: any;
  error: string | undefined;
  profileData:any;
  constructor(
    private apiService: LoginServiceService,
    private fb: FormBuilder,
    public router:Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.fetch();
  }

  fetch() {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.users = response; 
       this.data=response;
        this.checkLogin(); 
      },
      error: (err) => {
        this.error = 'Failed to load data';
        console.error(err);
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  checkLogin() {
    if (this.email?.value && this.password?.value) {
      const user = this.users.find(
        (u) => u.email === this.email?.value && u.password === this.password?.value
      );
      this.profileData=user;
      
      console.log(user);
      
      if (user) {
        // alert('Login successful!');
        successAlert("SuccessFully Login",'Success!');
        this.router.navigateByUrl('/home');
        sessionStorage.setItem('TableData', JSON.stringify(this.users));
        sessionStorage.setItem('userData', JSON.stringify(this.profileData));
      } else {
       errorAlert("Email Or Password is Not Matched.")
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
