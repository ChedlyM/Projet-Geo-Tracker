import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 role : any;
 private centroid: L.LatLngExpression = [35.96099, 9.68194];
  constructor(private _mapService: MapService, private router: Router, private _Activatedroute: ActivatedRoute, private http: HttpClient) { }

  id : any;
  date : any;
  coord: any


  ngOnInit(): void {
    this.role = localStorage.getItem("role")
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.date = this._Activatedroute.snapshot.paramMap.get("date");
    console.log(this.id, this.date)
    if(this.role != null)
    {
    if (this.role == "Client") {
      this.router.navigate(['/Client'])
    }
    else 
    {
      var map = L.map('map', {
        center: this.centroid,
        zoom: 2
      });
      const tiles = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=57XMBquwc7haRCgQDYWX', {
        maxZoom: 34,
        minZoom: 7,
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      });
  
      tiles.addTo(map);
      this.http.get<any>("http://127.0.0.1:5000/gpxPoints/" + this.date + "/" + this.id)
        .subscribe(
          (result) => {
            result.forEach(element => { 
              //console.log(element.lat, element.long)
              var marker = L.marker([element.lat, element.long]).addTo(map);
                  
            });        
          },
          (error) => { }
        )
      
    }
  }
  else this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    //this._mapService.plotActivity(this.date, this.id);
  }

}
