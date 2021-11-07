import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var $ : any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: any[] = []
  myuser:any={};
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:5000/user")
        .subscribe(
          (result) => {
            this.users = result;
            console.log(this.users);
            
          },
          (error) => { }
        )
  }
  

  //add admin
  addClient(){
    this.myuser.role ="Client";
    this.http.post("http://127.0.0.1:5000/user",this.myuser).subscribe(
      (data)=>{
        alert("Ajouté avec succès");
        return data;
      },
      (err)=>{
        alert("Client existe deja");
        console.log(err);
      }
    );
    window.location.reload()
  }

  openModal(){
    $('#myModal').modal('show');
    }

}
