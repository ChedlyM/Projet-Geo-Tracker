import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: any[] = []
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:5000/user")
        .subscribe(
          (result) => {
            this.users = result;
          },
          (error) => { }
        )
  }

}
