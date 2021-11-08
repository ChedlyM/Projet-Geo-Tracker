import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role : any;
  id : any
  days : any
  lat : any
  long : any
  pos : any [] = []   
  title = 'GEOTRACKER';
  private centroid: L.LatLngExpression = [35.96099, 9.68194];
  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private http: HttpClient) { }
  private initMap(): void {
    var map = L.map('map', {
      center: this.centroid,
      zoom: 4
    });
    const tiles = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=57XMBquwc7haRCgQDYWX', {
      maxZoom: 24,
      minZoom: 7,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });

    tiles.addTo(map);
    this.http.get<any>("http://127.0.0.1:5000/lastuserpos/"+ this.id)
        .subscribe(
          (result) => {
            this.pos = result
            //console.log(this.pos[0].lat)
            var marker = L.marker([this.pos[0].lat, this.pos[0].long]).addTo(map);          
          },
          (error) => { }
        )
    //var marker = L.marker([this.lat, this.long]).addTo(map);
  }
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
        this.initMap();
    }
  }
  else this.router.navigate(['/'])
  }

  

}
