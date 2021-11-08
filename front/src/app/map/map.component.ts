import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 role : any;
 users: any;
  constructor(private _mapService: MapService, private router: Router, private _Activatedroute: ActivatedRoute) { }

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
      this._mapService.plotActivity(this.date, this.id); 

    }
  }
  else this.router.navigate(['/']);
  }

}
