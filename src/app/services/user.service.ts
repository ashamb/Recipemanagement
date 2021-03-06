import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

// domain = 'https://wildseve-node.appspot.com/';
domain = 'http://192.168.0.128/';
authToken;
user;
options;

  constructor(private http: HttpClient) { }

login(userName) {
  //console.log(userName);
  //console.log( this.http.get(this.domain + 'api/UserRole/ValidateUser?userName=', userName));
  return this.http.get(this.domain + 'api/UserTbls/ValidateUser?userName='+ userName)
  
}

loginpass(passWord,userId){  
  return this.http.get(this.domain + '/api/UserTbls/ValidatePassword?passWord=' + passWord + '&userId=' + userId);
}

// Function to logout
logout() {
  // this.authToken = null; // Set token to null
  // this.user = null; // Set user to null
  localStorage.clear(); // Clear local storage
}

}


