import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';


var apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [36.8120683, 10.1491581]
const defaultZoom: number = 9


@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  plotActivity(date: any, id:any){

    var map = L.map('map').setView(defaultCoords, defaultZoom);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
    }).addTo(map);

    var gpxLayer = omnivore.gpx("assets/"+ date + "_" + id + ".gpx").addTo(map);
  }
  

  constructor() { }
  
  
}
