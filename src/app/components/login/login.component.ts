import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
// import { AuthGuard } from './../../guard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService,
    private router: Router,
  //  private authGuard: AuthGuard
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      passWord: this.form.get('password').value // Password input field
    };

    let username =  this.form.get('username').value;
    let passWord =  this.form.get('password').value;
    // Function to send login data to API
    this.authService.login(username).subscribe((data: any) => {
      // Check if response was a success or error
      if(data === -1){
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Username incorrect';
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      }
      else{
        // console.log(data);
      this.authService.loginpass(passWord,data).subscribe(res => {
       // console.log(res);
        if(res == -1){
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Password incorrect';
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      }
      else{
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
         this.message = "Login Successful"; // Set success message
          setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.router.navigate(['/users']); // Navigate to dashboard view
          }
        }, 200);
      }
      });
      
      }
      
      // if ((data.status === 200) ){
      //   this.messageClass = 'alert alert-success'; // Set bootstrap success class
      //   this.message = "Login Successful"; // Set success message
      //   // Function to store user's token in client local storage
    //    this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
    //     setTimeout(() => {
    //       if (this.previousUrl) {
    //         this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
    //       } else {
    //         this.router.navigate(['/dashboard']); // Navigate to dashboard view
    //       }
    //     }, 200);
    //   } else {
    //     this.messageClass = 'alert alert-danger'; // Set bootstrap error class
    //    // this.message = 'User does not exist. Please try again';
    //    this.message = data.response; // Set error message
    //     this.processing = false; // Enable submit button
    //     this.enableForm(); // Enable form for editting
    //   }
    });
  }
  
  ngOnInit() {
    // if (this.authGuard.redirectUrl) {
    //   this.messageClass = 'alert alert-danger'; // Set error message: need to login
    //   this.message = 'You must be logged in to view that page.'; // Set message
    //   this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
    //   this.authGuard.redirectUrl = undefined; // Erase previous URL
    // }
  }

}


