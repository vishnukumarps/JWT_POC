import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  http: any;
  invalidLogin: boolean;
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:5000/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
  
  logOut() {
    localStorage.removeItem("jwt");
  }
}
