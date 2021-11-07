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
    

    this.http.post<any>("http://127.0.0.1:5000/user/login",this.user).subscribe(
      data => {
        this.user=data;
        console.log(this.user);
        if(this.user.role=="ADMIN")
        {
          this.router.navigate(['/Clients']);
          
        }
        else 
        {localStorage.setItem("id", this.user.id);
        this.router.navigate(['/Client'])}
        localStorage.setItem("role", this.user.role);
      },
      err => {
        this.router.navigate(['/'])
      }
    );
  }

}
