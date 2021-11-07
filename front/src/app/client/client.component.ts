import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private centroid: L.LatLngExpression = [35.96099, 9.68194];
  c : any = {}
  constructor(private http: HttpClient) { }
  
  private async initMap(): Promise<void> {
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
    /*var marker = L.marker([36.836893, 10.235563]).addTo(map);
    var marker2 = L.marker([36.899383, 10.190791]).addTo(map);*/
    var lat, long : any
    navigator.geolocation.watchPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var marker = L.marker([lat, long]).addTo(map);
    });
    this.addClient(lat,long)
    while(true){
      await new Promise(f => setTimeout(f, 5000));
      navigator.geolocation.watchPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        var marker = L.marker([lat, long]).addTo(map);
      });
      this.addClient(lat,long)
    }
  }

  addClient(lat:any, long:any){
    this.c.idUser =1;
    this.c.lat= lat;
    this.c.long= long;
    console.log(this.c)
    this.http.post("http://127.0.0.1:5000/gpxdata",this.c).subscribe(
      (data)=>{
        console.log("Ajouté avec succès");
      },
      (err)=>{
        console.log(err);
      }
    );
  }

ngOnInit(){
    this.initMap()


  }

}
