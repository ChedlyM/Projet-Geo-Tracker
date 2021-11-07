import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role : any;
  id : any
  days : any
  title = 'GEOTRACKER';
  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private http: HttpClient) { }

  generer_gpx(date:any){
    this.http.post("http://127.0.0.1:5000/gpxfile/" + date + "/" + this.id, null).subscribe(
      (data)=>{
        alert("Ajouté avec succès");
        this.router.navigate(['/Run/'+ date + '/' + this.id])
      },
      (err)=>{
        alert("Client existe deja");
        console.log(err);
      }
    );

  }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.role = localStorage.getItem("role")
    if (this.role != null)
    {
    if (this.role == "Client") {
      this.router.navigate(['/Client'])
    }
    else 
    {
    this.http.get<any>("http://127.0.0.1:5000/gpxuserdata/"+ this.id)
        .subscribe(
          (result) => {
            this.days = result;
            console.log(this.days);            
          },
          (error) => { }
        )
    }
  }
  else this.router.navigate(['/'])
  }

  

}
