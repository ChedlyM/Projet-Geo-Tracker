import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private centroid: L.LatLngExpression = [35.96099, 9.68194];
  constructor() { }
  
  private initMap(): void {
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

    var tid = setTimeout(loopCoords, 2000)
    function loopCoords() {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
      });
      setTimeout(function () {
        navigator.geolocation.watchPosition(function (position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          console.log("Client : " + lat + "    " + long);
          
          var marker = L.marker([lat, long]).addTo(map);
        });
      }, 3000)
      tid = setTimeout(loopCoords, 2000)
      var i = 0;
    };
  }

  ngOnInit(): void {
    this.initMap();


  }

}
