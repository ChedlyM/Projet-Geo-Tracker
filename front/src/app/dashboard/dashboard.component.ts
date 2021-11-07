import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role : any;
  title = 'GEOTRACKER';
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.role = localStorage.getItem("role")
    if(this.role != null)
    {
    if (this.role == "Client") {
      this.router.navigate(['/Client'])
    }
  }
  else this.router.navigate(['/']);
    
  }

}
