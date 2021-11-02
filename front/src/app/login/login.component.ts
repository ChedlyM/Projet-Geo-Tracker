import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  user: any = {};
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { 
    let loginFormControls = {
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
    this.loginForm = formBuilder.group(loginFormControls)
  }

  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }
  ngOnInit(): void {
  }

  loginCandidat(){
    

    this.http.post<any>("https://localhost:5000/user",this.user).subscribe(
      data => {
        
      },
      err => {
        this.router.navigate(['/'])
      }
    );
  }

}
