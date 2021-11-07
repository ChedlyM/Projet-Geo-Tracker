import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import {IActivity} from '../shared/activity.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 role : any;
  constructor(private _mapService: MapService, private _route: ActivatedRoute,private router: Router, private _Activatedroute: ActivatedRoute) { }

  activity: any;
  activityName: string;
  activityComments: string;
  activityDate: Date;
  activityDistance: number;
  gpx: any;
  id : any;
  date : any;


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
    this.activity = this._mapService.getActivity( +this._route.snapshot.params['id'])
    }
  }
  else this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    this._mapService.plotActivity(+this._route.snapshot.params['id']);
      this.activityName = this.activity.name;
      this.activityComments = this.activity.comments;
      this.activityDistance = this.activity.distance;
      this.activityDate = this.activity.date;
      this.gpx = this.activity.gpxData;
  }

}
